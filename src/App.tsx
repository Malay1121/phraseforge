import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import RuleBuilder from './components/RuleBuilder';
import TextTranslator from './components/TextTranslator';
import SavedRules from './components/SavedRules';
import Footer from './components/Footer';
import { decodeRulesFromUrl } from './utils/encoder';
import type { RuleSet } from './types';

const initialRuleSet: RuleSet = {
  substitutions: {},
  prefix: '',
  suffix: '',
  grammar: 'none'
};

function App() {
  const [currentRuleSet, setCurrentRuleSet] = useState<RuleSet>(initialRuleSet);
  const [inputText, setInputText] = useState('');
  const [savedRuleSets, setSavedRuleSets] = useState<Array<{name: string, rules: RuleSet}>>([]);

  useEffect(() => {
    // Load saved rule sets from localStorage
    const saved = localStorage.getItem('phraseforge-rulesets');
    if (saved) {
      setSavedRuleSets(JSON.parse(saved));
    }

    // Check for shared rules in URL
    const urlRules = decodeRulesFromUrl();
    if (urlRules) {
      setCurrentRuleSet(urlRules);
    }
  }, []);

  const saveRuleSet = (name: string) => {
    const newRuleSet = { name, rules: currentRuleSet };
    const updated = [...savedRuleSets, newRuleSet];
    setSavedRuleSets(updated);
    localStorage.setItem('phraseforge-rulesets', JSON.stringify(updated));
  };

  const loadRuleSet = (rules: RuleSet) => {
    setCurrentRuleSet(rules);
  };

  const deleteRuleSet = (index: number) => {
    const updated = savedRuleSets.filter((_, i) => i !== index);
    setSavedRuleSets(updated);
    localStorage.setItem('phraseforge-rulesets', JSON.stringify(updated));
  };

  const clearRules = () => {
    setCurrentRuleSet(initialRuleSet);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F1F5F9] font-['Inter',sans-serif]">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Rule Builder */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <RuleBuilder 
              ruleSet={currentRuleSet}
              onRuleSetChange={setCurrentRuleSet}
              onSave={saveRuleSet}
              onClear={clearRules}
            />
            <SavedRules
              savedRuleSets={savedRuleSets}
              onLoad={loadRuleSet}
              onDelete={deleteRuleSet}
            />
          </motion.div>

          {/* Right Panel - Translator */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TextTranslator
              ruleSet={currentRuleSet}
              inputText={inputText}
              onInputChange={setInputText}
            />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;