import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Copy, ArrowRight, FileText } from 'lucide-react';
import { translateText } from '../utils/translator';
import type { RuleSet } from '../types';

interface TextTranslatorProps {
  ruleSet: RuleSet;
  inputText: string;
  onInputChange: (text: string) => void;
}

const TextTranslator: React.FC<TextTranslatorProps> = ({
  ruleSet,
  inputText,
  onInputChange
}) => {
  const translatedText = useMemo(() => {
    return translateText(inputText, ruleSet);
  }, [inputText, ruleSet]);

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    // Show toast notification
    alert('Translated text copied to clipboard!');
  };

  const sampleTexts = [
    "Hello, my friend! How are you doing today?",
    "The quick brown fox jumps over the lazy dog.",
    "Welcome to our secret meeting place.",
    "I love learning new languages and codes!"
  ];

  const loadSampleText = (text: string) => {
    onInputChange(text);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#1A1F2C] rounded-lg p-6 border border-gray-700 h-fit"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold uppercase tracking-wide">Translator</h2>
        <FileText className="text-[#3B82F6] w-6 h-6" />
      </div>

      {/* Sample Texts */}
      <div className="mb-4">
        <p className="text-sm text-gray-400 mb-2">Quick samples:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sampleTexts.map((text, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => loadSampleText(text)}
              className="text-left p-2 text-xs bg-[#0F1115] border border-gray-700 rounded text-gray-300 hover:border-[#3B82F6] hover:text-white transition-colors"
            >
              {text.length > 30 ? text.substring(0, 30) + '...' : text}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Input Text
        </label>
        <textarea
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Enter text to translate into your secret language..."
          className="w-full h-32 px-3 py-2 bg-[#0F1115] border border-gray-600 rounded-md text-white placeholder-gray-400 resize-none focus:border-[#3B82F6] focus:outline-none"
        />
        <div className="text-xs text-gray-400 mt-1">
          Characters: {inputText.length} | Words: {inputText.trim().split(/\s+/).filter(w => w).length}
        </div>
      </div>

      {/* Translation Arrow */}
      <div className="flex justify-center mb-6">
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="p-3 bg-[#3B82F6] rounded-full"
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </motion.div>
      </div>

      {/* Output Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">
            Translated Text
          </label>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            disabled={!translatedText}
            className="flex items-center space-x-1 px-3 py-1 bg-[#EAB308] text-black rounded-md text-sm font-medium hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Copy className="w-4 h-4" />
            <span>Copy</span>
          </motion.button>
        </div>
        <div className="min-h-32 px-3 py-2 bg-[#0F1115] border border-gray-600 rounded-md text-[#EAB308] font-mono">
          {translatedText || (
            <span className="text-gray-500 italic">
              Your translated text will appear here...
            </span>
          )}
        </div>
      </div>

      {/* Translation Stats */}
      {translatedText && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-gray-400 space-y-1"
        >
          <div>Rules applied: {Object.keys(ruleSet.substitutions).length} substitutions</div>
          <div>
            Transformations: 
            {ruleSet.prefix && <span className="ml-1 text-[#3B82F6]">prefix</span>}
            {ruleSet.suffix && <span className="ml-1 text-[#3B82F6]">suffix</span>}
            {ruleSet.grammar !== 'none' && <span className="ml-1 text-[#3B82F6]">{ruleSet.grammar}</span>}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TextTranslator;