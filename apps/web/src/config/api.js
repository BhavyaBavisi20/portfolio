const resolveApiBaseUrl = () => {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL;
  if (configuredBaseUrl) {
    return configuredBaseUrl;
  }

  if (typeof window !== "undefined") {
    const { protocol, hostname, origin } = window.location;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:5000";
    }

    // On hosted environments, default to same-origin API routes unless explicitly configured.
    if (protocol === "https:" || protocol === "http:") {
      return origin;
    }
  }

  return "http://localhost:5000";
};

export const API_BASE_URL = resolveApiBaseUrl();

const defaultWsUrl = API_BASE_URL.startsWith("https://")
  ? API_BASE_URL.replace("https://", "wss://")
  : API_BASE_URL.replace("http://", "ws://");

export const API_WS_URL =
  import.meta.env.VITE_WS_URL || `${defaultWsUrl}/ws/chat`;

export const API_ROUTES = {
  projects: `${API_BASE_URL}/api/projects`,
  skills: `${API_BASE_URL}/api/skills`,
  blogs: `${API_BASE_URL}/api/blogs`,
  achievements: `${API_BASE_URL}/api/achievements`,
  certificates: `${API_BASE_URL}/api/certificates`,
  contact: `${API_BASE_URL}/api/contact`,
  chat: `${API_BASE_URL}/api/chat`
};
