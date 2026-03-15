export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const API_ROUTES = {
  projects: `${API_BASE_URL}/api/projects`,
  skills: `${API_BASE_URL}/api/skills`,
  blogs: `${API_BASE_URL}/api/blogs`,
  achievements: `${API_BASE_URL}/api/achievements`,
  certificates: `${API_BASE_URL}/api/certificates`,
  contact: `${API_BASE_URL}/api/contact`,
  chat: `${API_BASE_URL}/api/chat`
};
