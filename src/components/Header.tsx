import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#1A1F2C] border-b border-gray-700"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Hammer className="text-[#3B82F6] w-8 h-8" />
          </motion.div>
          <div className="text-center">
            <h1 className="text-4xl font-bold uppercase tracking-wider">
              <span className="text-[#3B82F6]">Phrase</span>
              <span className="text-[#EAB308]">Forge</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1 flex items-center justify-center space-x-1">
              <Sparkles className="w-4 h-4" />
              <span>Forge your own secret language</span>
              <Sparkles className="w-4 h-4" />
            </p>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;