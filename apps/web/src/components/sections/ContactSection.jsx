import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Copy, Check, Linkedin, Github, Instagram,
  MessageCircle, ArrowUpRight
} from 'lucide-react';

const SOCIALS = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/bhavya-bavisi-61a592281', label: 'LinkedIn', color: 'hover:border-blue-500/50 hover:text-blue-400' },
  { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'hover:border-white/40 hover:text-white' },
  { icon: Instagram, href: 'https://www.instagram.com/bhavya_.020', label: 'Instagram', color: 'hover:border-pink-500/50 hover:text-pink-400' },
  { icon: MessageCircle, href: 'https://wa.me/', label: 'WhatsApp', color: 'hover:border-green-500/50 hover:text-green-400' },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('bhavyabavisi40@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      const subject = `Portfolio Contact from ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      window.location.href = `mailto:bhavyabavisi40@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="bg-[#050505] border-t border-white/5 relative overflow-hidden">

      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT — Headline + Info */}
          <div className="space-y-10">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-mono"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for new projects
            </motion.div>

            <div>
              <motion.h2
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30"
              >
                Let's Build<br />Something<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Great.</span>
              </motion.h2>
            </div>

            {/* Bio line */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 text-lg leading-relaxed max-w-md"
            >
              Whether it's a product idea, a freelance collaboration, or a full-time role — I'm all ears. Let's make something intelligent together.
            </motion.p>

            {/* Big clickable email */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopyEmail}
              className="group flex items-center gap-4 w-full text-left cursor-pointer"
            >
              <div className="flex-1 py-4 px-6 rounded-2xl border border-white/10 bg-white/3 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-300 flex items-center justify-between">
                <span className="text-white font-mono text-sm md:text-base truncate">
                  bhavyabavisi40@gmail.com
                </span>
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="ml-3 flex items-center gap-1.5 text-green-400 text-xs font-mono flex-shrink-0">
                      <Check size={14} /> Copied!
                    </motion.span>
                  ) : (
                    <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="ml-3 text-gray-500 group-hover:text-purple-400 transition-colors flex-shrink-0">
                      <Copy size={16} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>

            {/* Socials */}
            <div>
              <p className="text-[11px] font-mono text-gray-600 uppercase tracking-widest mb-4">Find me on</p>
              <div className="flex gap-3">
                {SOCIALS.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -4 }}
                    title={label}
                    className={`w-11 h-11 rounded-xl border border-white/10 bg-white/3 flex items-center justify-center text-gray-500 transition-all duration-300 ${color}`}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Form card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl p-8 md:p-10 border border-white/5 relative overflow-hidden"
          >
            {/* Subtle corner glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />

            <h3 className="text-lg font-bold text-white mb-1">Drop a Message</h3>
            <p className="text-sm text-gray-500 font-mono mb-8">I'll get back within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'name', label: 'Name', type: 'text' },
                  { name: 'email', label: 'Email', type: 'email' },
                ].map(({ name, label, type }) => (
                  <div key={name} className="group relative">
                    <label className="block text-[11px] font-mono text-gray-500 uppercase tracking-widest mb-2">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/10 py-2.5 text-white text-sm focus:outline-none focus:border-purple-400 transition-colors placeholder:text-gray-700"
                      placeholder={`Your ${label.toLowerCase()}...`}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-500 uppercase tracking-widest mb-2">Message</label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project or idea..."
                  className="w-full bg-transparent border-b border-white/10 py-2.5 text-white text-sm focus:outline-none focus:border-purple-400 transition-colors resize-none placeholder:text-gray-700"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSending || isSubmitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold text-sm tracking-wider flex items-center justify-center gap-3 hover:from-purple-500 hover:to-purple-400 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-[0_0_30px_rgba(139,92,246,0.3)]"
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <><Check size={18} /> Message Sent!</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
