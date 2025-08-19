import React from 'react';
import { motion } from 'framer-motion';
import { Code, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="bg-[#1A1F2C] border-t border-gray-700 py-6 mt-12"
    >
      <div className="container mx-auto px-4">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <Code className="w-4 h-4" />
            <span className="text-sm">
              Built with React + TypeScript + Framer Motion
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <span className="text-sm">Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.div>
            <span className="text-sm">for creative language exploration</span>
          </div>
          <div className="text-xs text-gray-500">
            Create • Translate • Share • Discover
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;