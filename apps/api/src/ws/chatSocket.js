import { WebSocket, WebSocketServer } from "ws";
import { answerPortfolioQuestion } from "../services/chatService.js";

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_ITEMS = 12;
const MAX_REQUESTS_PER_WINDOW = 25;
const WINDOW_MS = 5 * 60 * 1000;
const SOCKET_PATH = "/ws/chat";

const isValidHistory = (history) => {
  if (!Array.isArray(history) || history.length > MAX_HISTORY_ITEMS) {
    return false;
  }

  return history.every((entry) => {
    if (!entry || typeof entry !== "object") {
      return false;
    }

    const isValidRole = entry.role === "user" || entry.role === "assistant";
    const isValidContent =
      typeof entry.content === "string" && entry.content.trim().length > 0;

    return isValidRole && isValidContent;
  });
};

const safeSend = (socket, payload) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(payload));
  }
};

const parsePayload = (rawData) => {
  try {
    return JSON.parse(String(rawData || ""));
  } catch {
    return null;
  }
};

const isRateLimited = (state, now) => {
  state.requestTimestamps = state.requestTimestamps.filter(
    (timestamp) => now - timestamp < WINDOW_MS
  );

  if (state.requestTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  state.requestTimestamps.push(now);
  return false;
};

export const attachChatSocket = ({ server }) => {
  const wsServer = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    const host = request.headers.host || "localhost";
    const requestUrl = new URL(request.url || "", `http://${host}`);

    if (requestUrl.pathname !== SOCKET_PATH) {
      socket.destroy();
      return;
    }

    wsServer.handleUpgrade(request, socket, head, (ws) => {
      wsServer.emit("connection", ws, request);
    });
  });

  wsServer.on("connection", (socket) => {
    const state = { requestTimestamps: [] };

    safeSend(socket, {
      type: "chat.ready",
      payload: { status: "ok" }
    });

    socket.on("message", async (rawData) => {
      const parsed = parsePayload(rawData);
      const type = parsed?.type;
      const requestId = String(parsed?.id || "");
      const payload = parsed?.payload || {};

      if (type !== "chat.ask" || !requestId) {
        safeSend(socket, {
          type: "chat.error",
          id: requestId || null,
          payload: { message: "Invalid WebSocket request format." }
        });
        return;
      }

      const now = Date.now();
      if (isRateLimited(state, now)) {
        safeSend(socket, {
          type: "chat.error",
          id: requestId,
          payload: {
            message: "Too many chat requests. Please try again later."
          }
        });
        return;
      }

      const message = String(payload.message || "").trim();
      const history = payload.history;

      if (!message || message.length > MAX_MESSAGE_LENGTH) {
        safeSend(socket, {
          type: "chat.error",
          id: requestId,
          payload: {
            message: "Message must be between 1 and 1000 characters."
          }
        });
        return;
      }

      if (history !== undefined && !isValidHistory(history)) {
        safeSend(socket, {
          type: "chat.error",
          id: requestId,
          payload: {
            message: "History must be an array with up to 12 entries."
          }
        });
        return;
      }

      try {
        const result = await answerPortfolioQuestion({
          question: message,
          history: Array.isArray(history) ? history : []
        });

        safeSend(socket, {
          type: "chat.answer",
          id: requestId,
          payload: result
        });
      } catch (error) {
        console.error("WebSocket chat failure:", error);
        safeSend(socket, {
          type: "chat.error",
          id: requestId,
          payload: {
            message:
              "The assistant is unavailable right now. Please try again in a moment."
          }
        });
      }
    });
  });

  return wsServer;
};
