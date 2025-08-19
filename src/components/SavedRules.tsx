import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Play, Trash2 } from 'lucide-react';
import type { RuleSet } from '../types';

interface SavedRulesProps {
  savedRuleSets: Array<{name: string, rules: RuleSet}>;
  onLoad: (rules: RuleSet) => void;
  onDelete: (index: number) => void;
}

const SavedRules: React.FC<SavedRulesProps> = ({
  savedRuleSets,
  onLoad,
  onDelete
}) => {
  if (savedRuleSets.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#1A1F2C] rounded-lg p-6 border border-gray-700"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Folder className="text-[#3B82F6] w-5 h-5" />
          <h2 className="text-lg font-bold uppercase tracking-wide">Saved Rules</h2>
        </div>
        <div className="text-center py-8 text-gray-400">
          <Folder className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No saved rule sets yet.</p>
          <p className="text-sm">Create some rules and save them to get started!</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#1A1F2C] rounded-lg p-6 border border-gray-700"
    >
      <div className="flex items-center space-x-3 mb-4">
        <Folder className="text-[#3B82F6] w-5 h-5" />
        <h2 className="text-lg font-bold uppercase tracking-wide">Saved Rules</h2>
        <span className="text-xs bg-[#3B82F6] text-white px-2 py-1 rounded-full">
          {savedRuleSets.length}
        </span>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {savedRuleSets.map((ruleSet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="bg-[#0F1115] rounded-lg p-4 border border-gray-700 hover:border-[#3B82F6] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{ruleSet.name}</h3>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>{Object.keys(ruleSet.rules.substitutions).length} substitutions</div>
                    <div className="flex space-x-2">
                      {ruleSet.rules.prefix && (
                        <span className="bg-blue-900/30 text-blue-300 px-2 py-0.5 rounded text-xs">
                          prefix: {ruleSet.rules.prefix}
                        </span>
                      )}
                      {ruleSet.rules.suffix && (
                        <span className="bg-yellow-900/30 text-yellow-300 px-2 py-0.5 rounded text-xs">
                          suffix: {ruleSet.rules.suffix}
                        </span>
                      )}
                      {ruleSet.rules.grammar !== 'none' && (
                        <span className="bg-purple-900/30 text-purple-300 px-2 py-0.5 rounded text-xs">
                          {ruleSet.rules.grammar}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onLoad(ruleSet.rules)}
                    className="p-2 bg-[#3B82F6] text-white rounded-md hover:bg-blue-600 transition-colors"
                    title="Load rule set"
                  >
                    <Play className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDelete(index)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md transition-colors"
                    title="Delete rule set"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SavedRules;