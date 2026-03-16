import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Send, Bot, User, Link2, RotateCcw } from 'lucide-react';
import { API_ROUTES, API_WS_URL } from '../../config/api';

const SUGGESTIONS = [
  'What projects has Bhavya built?',
  'What is Bhavya strongest at?',
  'Tell me about his career timeline.',
  'How can I contact Bhavya?',
];

const INITIAL_MESSAGE = {
  sender: 'bot',
  text:
    "I'm Bhavya's portfolio assistant. Ask about projects, skills, blogs, achievements, career timeline, or how to get in touch.",
  sources: [],
  intent: 'know_about_me_and_my_work',
  showContactForm: false,
};

const WS_RESPONSE_TIMEOUT_MS = 45000;

const toApiHistory = (messages) =>
  messages
    .filter((message) => message.sender === 'user' || message.sender === 'bot')
    .map((message) => ({
      role: message.sender === 'bot' ? 'assistant' : 'user',
      content: message.text,
    }));

const renderInlineMarkdown = (text) => {
  const parts = [];
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\((https?:\/\/[^)\s]+)\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(<strong key={`${token}-${match.index}`} className="font-semibold text-white">{token.slice(2, -2)}</strong>);
    } else {
      const labelMatch = token.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
      if (labelMatch) {
        parts.push(
          <a
            key={`${token}-${match.index}`}
            href={labelMatch[2]}
            target="_blank"
            rel="noreferrer"
            className="text-purple-300 underline decoration-purple-500/40 underline-offset-4 hover:text-purple-200"
          >
            {labelMatch[1]}
          </a>
        );
      } else {
        parts.push(token);
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

const renderMessageContent = (text) => {
  const blocks = String(text || '')
    .split('\n')
    .map((line) => line.trimEnd());

  return blocks.map((line, index) => {
    if (!line.trim()) {
      return <div key={`spacer-${index}`} className="h-2" />;
    }

    if (line.startsWith('- ')) {
      return (
        <div key={`line-${index}`} className="flex items-start gap-2">
          <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-purple-400 flex-shrink-0" />
          <span>{renderInlineMarkdown(line.slice(2))}</span>
        </div>
      );
    }

    return (
      <p key={`line-${index}`} className="leading-6">
        {renderInlineMarkdown(line)}
      </p>
    );
  });
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [socketStatus, setSocketStatus] = useState('connecting');
  const [contactLead, setContactLead] = useState({
    email: '',
    anyIdea: '',
    yourPortfolio: '',
  });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadStatus, setLeadStatus] = useState({ type: '', message: '' });
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const pendingRequestsRef = useRef(new Map());
  const manualCloseRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const clearPendingRequests = useCallback((errorMessage) => {
    pendingRequestsRef.current.forEach((entry) => {
      clearTimeout(entry.timeoutId);
      entry.reject(new Error(errorMessage));
    });
    pendingRequestsRef.current.clear();
  }, []);

  const connectSocket = useCallback(() => {
    const activeSocket = socketRef.current;
    if (
      activeSocket &&
      (activeSocket.readyState === WebSocket.OPEN || activeSocket.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    setSocketStatus('connecting');
    const socket = new WebSocket(API_WS_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      setSocketStatus('connected');
    };

    socket.onmessage = (event) => {
      let parsed = null;
      try {
        parsed = JSON.parse(event.data);
      } catch {
        return;
      }

      if (parsed?.type === 'chat.ready') {
        return;
      }

      const requestId = String(parsed?.id || '');
      if (!requestId) {
        return;
      }

      const pending = pendingRequestsRef.current.get(requestId);
      if (!pending) {
        return;
      }

      clearTimeout(pending.timeoutId);
      pendingRequestsRef.current.delete(requestId);

      if (parsed.type === 'chat.answer') {
        pending.resolve(parsed.payload || {});
        return;
      }

      if (parsed.type === 'chat.error') {
        pending.reject(new Error(parsed?.payload?.message || 'WebSocket request failed.'));
      }
    };

    socket.onclose = () => {
      socketRef.current = null;
      setSocketStatus('disconnected');
      clearPendingRequests('WebSocket connection closed.');

      if (!manualCloseRef.current) {
        reconnectTimeoutRef.current = setTimeout(() => {
          connectSocket();
        }, 1500);
      }
    };

    socket.onerror = () => {
      setSocketStatus('disconnected');
    };
  }, [clearPendingRequests]);

  useEffect(() => {
    manualCloseRef.current = false;
    connectSocket();

    return () => {
      manualCloseRef.current = true;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      clearPendingRequests('Chat widget closed.');
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [clearPendingRequests, connectSocket]);

  const sendChatOverWebSocket = useCallback((query, history) => {
    const socket = socketRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      return Promise.reject(new Error('WebSocket is not connected.'));
    }

    const requestId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        pendingRequestsRef.current.delete(requestId);
        reject(new Error('Chat request timed out.'));
      }, WS_RESPONSE_TIMEOUT_MS);

      pendingRequestsRef.current.set(requestId, { resolve, reject, timeoutId });

      socket.send(
        JSON.stringify({
          type: 'chat.ask',
          id: requestId,
          payload: {
            message: query,
            history,
          },
        })
      );
    });
  }, []);

  const handleSend = async (text) => {
    const rawMessage = text || inputText;
    const query = rawMessage.trim();
    if (!query || isTyping) return;

    const userMessage = { sender: 'user', text: query };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInputText('');
    setIsTyping(true);

    try {
      const history = toApiHistory(nextMessages);
      let data = null;

      try {
        data = await sendChatOverWebSocket(query, history);
      } catch {
        const response = await axios.post(API_ROUTES.chat, {
          message: query,
          history,
        });
        data = response?.data;
        connectSocket();
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: data?.answer || 'I could not generate a grounded answer just now.',
          sources: Array.isArray(data?.sources) ? data.sources : [],
          intent: data?.intent || 'know_about_me_and_my_work',
          showContactForm: Boolean(data?.showContactForm),
        },
      ]);
    } catch (error) {
      const apiErrors = error?.response?.data?.errors;
      const firstFieldError =
        Array.isArray(apiErrors) && apiErrors.length > 0 ? apiErrors[0]?.msg : '';

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text:
            firstFieldError ||
            error?.response?.data?.message ||
            'The assistant is unavailable right now. Please try again in a moment.',
          sources: [],
          intent: 'know_about_me_and_my_work',
          showContactForm: false,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInputText('');
    setIsTyping(false);
    setLeadStatus({ type: '', message: '' });
    setContactLead({
      email: '',
      anyIdea: '',
      yourPortfolio: '',
    });
  };

  const handleLeadChange = (event) => {
    const { name, value } = event.target;
    setContactLead((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeadSubmit = async (event) => {
    event.preventDefault();
    if (!contactLead.email.trim() || !contactLead.anyIdea.trim()) {
      setLeadStatus({
        type: 'error',
        message: 'Please share your email and your idea.'
      });
      return;
    }

    setIsSubmittingLead(true);
    setLeadStatus({ type: '', message: '' });

    try {
      await axios.post(API_ROUTES.contact, {
        name: 'Chat Visitor',
        email: contactLead.email.trim(),
        subject: 'Chat Assistant Inquiry',
        message: [
          `Idea / Need: ${contactLead.anyIdea.trim()}`,
          contactLead.yourPortfolio.trim()
            ? `Portfolio / Link: ${contactLead.yourPortfolio.trim()}`
            : ''
        ]
          .filter(Boolean)
          .join('\n')
      });

      setLeadStatus({
        type: 'success',
        message: 'Details sent successfully. Bhavya will receive them directly.'
      });
      setContactLead({
        email: '',
        anyIdea: '',
        yourPortfolio: '',
      });
    } catch (error) {
      const apiErrors = error?.response?.data?.errors;
      const firstFieldError =
        Array.isArray(apiErrors) && apiErrors.length > 0 ? apiErrors[0]?.msg : '';

      setLeadStatus({
        type: 'error',
        message:
          firstFieldError ||
          error?.response?.data?.message ||
          'Failed to send details. Please try again.'
      });
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)] cursor-pointer hover:bg-purple-500 transition-colors border border-purple-400/50"
      >
        <Terminal className="text-white w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-6 right-6 md:right-10 z-[100] w-[92vw] md:w-[420px] h-[560px] max-h-[82vh] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/50">
                  <Bot className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Bhavya.AI</h3>
                  <p className="text-[10px] text-gray-300 font-mono flex items-center gap-1">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        socketStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
                      }`}
                    ></span>
                    {socketStatus === 'connected' ? 'WebSocket Live' : 'WebSocket Reconnecting'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1.5 text-[10px] font-mono text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Chat
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-hide">
              {messages.map((msg, idx) => (
                <motion.div
                  key={`${msg.sender}-${idx}`}
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex gap-3 max-w-[92%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                    {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <div className="space-y-2">
                    <div className={`p-3 rounded-2xl break-words ${msg.sender === 'user' ? 'bg-blue-600/20 border border-blue-500/20 text-blue-100 rounded-tr-sm font-mono' : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-sm'}`}>
                      {msg.sender === 'user' ? (
                        <p className="leading-6">{msg.text}</p>
                      ) : (
                        <div className="space-y-1.5">{renderMessageContent(msg.text)}</div>
                      )}
                    </div>
                    {msg.sender === 'bot' && Array.isArray(msg.sources) && msg.sources.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.slice(0, 3).map((source, sourceIndex) => (
                          <span
                            key={`${source.title}-${sourceIndex}`}
                            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-gray-400"
                          >
                            {source.url ? (
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 hover:text-purple-300"
                              >
                                <Link2 size={10} />
                                {source.title}
                              </a>
                            ) : (
                              <>
                                <Link2 size={10} />
                                {source.title}
                              </>
                            )}
                          </span>
                        ))}
                      </div>
                    )}
                    {msg.sender === 'bot' && msg.showContactForm && (
                      <form
                        onSubmit={handleLeadSubmit}
                        className="rounded-2xl border border-purple-500/20 bg-white/5 p-3 space-y-3"
                      >
                        <div>
                          <label className="mb-1 block text-[10px] font-mono uppercase tracking-[0.18em] text-gray-500">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={contactLead.email}
                            onChange={handleLeadChange}
                            className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-purple-500/50"
                            placeholder="you@example.com"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] font-mono uppercase tracking-[0.18em] text-gray-500">
                            Any Idea
                          </label>
                          <textarea
                            name="anyIdea"
                            value={contactLead.anyIdea}
                            onChange={handleLeadChange}
                            rows={3}
                            className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none focus:border-purple-500/50"
                            placeholder="Tell Bhavya what you want to build or discuss..."
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] font-mono uppercase tracking-[0.18em] text-gray-500">
                            Your Portfolio
                          </label>
                          <input
                            type="url"
                            name="yourPortfolio"
                            value={contactLead.yourPortfolio}
                            onChange={handleLeadChange}
                            className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-purple-500/50"
                            placeholder="https://your-portfolio.com"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmittingLead}
                          className="w-full rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-500 disabled:opacity-60"
                        >
                          {isSubmittingLead ? 'Submitting...' : 'Submit Details'}
                        </button>
                        {leadStatus.message && (
                          <p
                            className={`text-xs ${leadStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}
                          >
                            {leadStatus.message}
                          </p>
                        )}
                      </form>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 max-w-[80%] mr-auto">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex-shrink-0 flex items-center justify-center text-purple-400">
                    <Bot size={12} />
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex gap-1 items-center rounded-tl-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {!isTyping && messages[messages.length - 1]?.sender === 'bot' && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="text-[10px] font-mono px-3 py-1.5 rounded-full border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 transition-colors cursor-pointer"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div className="p-4 border-t border-white/10 bg-black/50">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(event) => setInputText(event.target.value)}
                  placeholder="Ask about Bhavya's work..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-600 font-mono"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-500 transition-colors cursor-pointer"
                >
                  <Send size={16} className="-ml-1 mt-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
