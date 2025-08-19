import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, RotateCcw, Share, Zap } from 'lucide-react';
import { encodeRulesToUrl, generateRandomRules } from '../utils/encoder';
import type { RuleSet } from '../types';

interface RuleBuilderProps {
  ruleSet: RuleSet;
  onRuleSetChange: (ruleSet: RuleSet) => void;
  onSave: (name: string) => void;
  onClear: () => void;
}

const RuleBuilder: React.FC<RuleBuilderProps> = ({
  ruleSet,
  onRuleSetChange,
  onSave,
  onClear
}) => {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveNameInput, setSaveNameInput] = useState('');

  const addSubstitution = () => {
    const key = `rule_${Date.now()}`;
    onRuleSetChange({
      ...ruleSet,
      substitutions: { ...ruleSet.substitutions, [key]: '' }
    });
  };

  const updateSubstitution = (oldKey: string, newKey: string, value: string) => {
    const newSubstitutions = { ...ruleSet.substitutions };
    delete newSubstitutions[oldKey];
    if (newKey.trim()) {
      newSubstitutions[newKey.toLowerCase()] = value;
    }
    onRuleSetChange({ ...ruleSet, substitutions: newSubstitutions });
  };

  const removeSubstitution = (key: string) => {
    const newSubstitutions = { ...ruleSet.substitutions };
    delete newSubstitutions[key];
    onRuleSetChange({ ...ruleSet, substitutions: newSubstitutions });
  };

  const handleSave = () => {
    if (saveNameInput.trim()) {
      onSave(saveNameInput.trim());
      setSaveNameInput('');
      setSaveDialogOpen(false);
    }
  };

  const handleShare = () => {
    const shareUrl = encodeRulesToUrl(ruleSet);
    navigator.clipboard.writeText(shareUrl);
  alert('Share link copied to clipboard!');
  };

  const handleRandomize = () => {
    onRuleSetChange(generateRandomRules());
  };

  const substitutionEntries = Object.entries(ruleSet.substitutions);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#1A1F2C] rounded-lg p-6 border border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold uppercase tracking-wide">Rule Builder</h2>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRandomize}
            className="px-3 py-2 bg-[#EAB308] text-black rounded-md text-sm font-medium flex items-center space-x-1 hover:bg-yellow-400 transition-colors"
          >
            <Zap className="w-4 h-4" />
            <span>Random</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="px-3 py-2 bg-[#3B82F6] text-white rounded-md text-sm font-medium flex items-center space-x-1 hover:bg-blue-600 transition-colors"
          >
            <Share className="w-4 h-4" />
            <span>Share</span>
          </motion.button>
        </div>
      </div>

      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#3B82F6]">Word Substitutions</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addSubstitution}
            className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Rule</span>
          </motion.button>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          <AnimatePresence>
            {substitutionEntries.map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex space-x-2"
              >
                {key.startsWith('rule_') ? (
                  <input
                    type="text"
                    placeholder="Original word"
                    defaultValue=""
                    onBlur={(e) => {
                      if (e.target.value.trim()) {
                        updateSubstitution(key, e.target.value, value);
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-[#0F1115] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-[#3B82F6] focus:outline-none"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="Original word"
                    value={key}
                    onChange={(e) => updateSubstitution(key, e.target.value, value)}
                    className="flex-1 px-3 py-2 bg-[#0F1115] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-[#3B82F6] focus:outline-none"
                  />
                )}
                <span className="text-[#EAB308] self-center">→</span>
                <input
                  type="text"
                  placeholder="Replacement"
                  value={value}
                  onChange={(e) => updateSubstitution(key, key.startsWith('rule_') ? '' : key, e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#0F1115] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-[#3B82F6] focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeSubstitution(key)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#3B82F6] mb-4">Prefix & Suffix</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Prefix</label>
            <input
              type="text"
              placeholder="e.g., zy-"
              value={ruleSet.prefix}
              onChange={(e) => onRuleSetChange({ ...ruleSet, prefix: e.target.value })}
              className="w-full px-3 py-2 bg-[#0F1115] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-[#3B82F6] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Suffix</label>
            <input
              type="text"
              placeholder="e.g., -ix"
              value={ruleSet.suffix}
              onChange={(e) => onRuleSetChange({ ...ruleSet, suffix: e.target.value })}
              className="w-full px-3 py-2 bg-[#0F1115] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-[#3B82F6] focus:outline-none"
            />
          </div>
        </div>
      </div>

      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#3B82F6] mb-4">Grammar Tweaks</h3>
        <select
          value={ruleSet.grammar}
          onChange={(e) => onRuleSetChange({ ...ruleSet, grammar: e.target.value as any })}
          className="w-full px-3 py-2 bg-[#0F1115] border border-gray-600 rounded-md text-white focus:border-[#3B82F6] focus:outline-none"
        >
          <option value="none">None</option>
          <option value="reverse">Reverse word order</option>
          <option value="double-vowels">Double vowels</option>
        </select>
      </div>

      
      <div className="flex space-x-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSaveDialogOpen(true)}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-[#3B82F6] text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Rules</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClear}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md font-medium hover:bg-gray-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Clear</span>
        </motion.button>
      </div>

      
      <AnimatePresence>
        {saveDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSaveDialogOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1A1F2C] rounded-lg p-6 border border-gray-700 w-full max-w-md mx-4"
            >
              <h3 className="text-lg font-bold mb-4">Save Rule Set</h3>
              <input
                type="text"
                placeholder="Enter a name for your rule set"
                value={saveNameInput}
                onChange={(e) => setSaveNameInput(e.target.value)}
                className="w-full px-3 py-2 bg-[#0F1115] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-[#3B82F6] focus:outline-none mb-4"
                onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                autoFocus
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-[#3B82F6] text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setSaveDialogOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md font-medium hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RuleBuilder;