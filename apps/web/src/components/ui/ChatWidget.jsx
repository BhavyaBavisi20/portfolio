import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Send, Bot, User } from 'lucide-react';

const RESPONSES = {
  "default": "I'm Bhavya's portfolio assistant! You can ask me about his tech stack, experience with RAG, or how to contact him.",
  "tech stack": "Bhavya specializes in GenAI (Llama, GPT-4), RAG pipelines (Pinecone, LangChain), and Modern Frontend (React, Next.js, Framer Motion, Tailwind). He's also strong in Python and Computer Vision.",
  "rag experience": "He built 'DocTalk AI', a production-grade GenAI assistant using LangChain and Vector DBs. His retrieval pipelines reduced hallucination significantly, grounded in medical documents.",
  "rates": "Bhavya is currently open to full-time roles and high-impact freelance projects. Please reach out via the Contact section to discuss specific rates!",
  "contact": "You can reach Bhavya at bhavyabavisi40@gmail.com, or drop a message in the Contact section at the bottom of the page.",
  "hello": "Hello! Welcome to Bhavya's interactive portfolio. How can I help you explore?",
  "who are you": "I am a lightweight AI assistant built by Bhavya to answer questions about his professional background."
};

const SUGGESTIONS = [
  "Tech Stack?", "RAG Experience?", "Rates?", "Contact?"
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: RESPONSES["default"] }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const query = (text || inputText).trim().toLowerCase();
    if (!query) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: text || inputText }]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      let botReply = RESPONSES["default"];
      
      // Simple intent matching
      for (const [key, value] of Object.entries(RESPONSES)) {
        if (query.includes(key)) {
          botReply = value;
          break;
        }
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second realistic delay
  };

  return (
    <>
      {/* Floating Button */}
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

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-6 right-6 md:right-10 z-[100] w-[90vw] md:w-[380px] h-[500px] max-h-[80vh] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/50">
                  <Bot className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Bhavya.AI</h3>
                  <p className="text-[10px] text-green-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm font-mono scrollbar-hide">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                    {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <div className={`p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600/20 border border-blue-500/20 text-blue-100 rounded-tr-sm' : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-sm'}`}>
                    {msg.text}
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

            {/* Suggestions */}
            {!isTyping && messages[messages.length - 1]?.sender === 'bot' && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((sug) => (
                  <button 
                    key={sug}
                    onClick={() => handleSend(sug)}
                    className="text-[10px] font-mono px-3 py-1.5 rounded-full border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 transition-colors cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/50">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask Bhavya.AI..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-600 font-mono"
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim()}
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
