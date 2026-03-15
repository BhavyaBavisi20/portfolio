import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, ArrowUpRight } from 'lucide-react';
import StickySection from './StickySection';
import { ICON_MAP } from '../../config/icons';

const CertificatesSection = ({ achievements = [], certificates = [] }) => (
  <StickySection title="Credentials & Impact" label="[ 04 - Certs ]" id="certificates" className="py-24">
    <div className="space-y-16">
      <div>
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3"><Trophy className="text-yellow-500" /> Achievements & Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Trophy;
            return (
              <motion.div
                key={item._id || `${item.title}-${i}`}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-purple-500/30 hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-white/5 rounded-lg">
                    <Icon size={20} className="text-purple-400" />
                  </div>
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">{item.role}</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed mb-3">{item.description}</p>
                {item.highlight && <span className="text-xs font-bold text-purple-300 bg-purple-500/10 px-2 py-1 rounded">{item.highlight}</span>}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3"><Award className="text-blue-500" /> Certifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert._id || `${cert.name}-${i}`}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                  {cert.thumb ? (
                    <img src={cert.thumb} alt={cert.issuer} className="w-full h-full object-contain" />
                  ) : (
                    <Award size={20} className="text-gray-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{cert.name}</h4>
                  <p className="text-xs text-gray-500">{cert.issuer}</p>
                </div>
              </div>
              <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-gray-400 hover:text-white transition-colors">
                <ArrowUpRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </StickySection>
);

export default CertificatesSection;
