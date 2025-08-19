import type { RuleSet } from '../types';

export function translateText(text: string, ruleSet: RuleSet): string {
  if (!text.trim()) return '';

  // Split text into words while preserving spaces and punctuation
  const tokens = text.split(/(\s+|[^\w\s])/);
  
  let translatedTokens = tokens.map(token => {
    // Skip if it's whitespace or punctuation
    if (!/\w/.test(token)) {
      return token;
    }

    let translatedWord = token.toLowerCase();
    
    // Apply substitution rules
    for (const [original, replacement] of Object.entries(ruleSet.substitutions)) {
      if (original && replacement) {
        translatedWord = translatedWord.replace(new RegExp(original, 'gi'), replacement);
      }
    }

    // Apply prefix
    if (ruleSet.prefix && translatedWord !== token.toLowerCase()) {
      translatedWord = ruleSet.prefix + translatedWord;
    }

    // Apply suffix
    if (ruleSet.suffix && translatedWord !== token.toLowerCase()) {
      translatedWord = translatedWord + ruleSet.suffix;
    }

    // Apply grammar rules
    switch (ruleSet.grammar) {
      case 'double-vowels':
        translatedWord = translatedWord.replace(/[aeiou]/gi, match => match + match.toLowerCase());
        break;
      // Note: reverse word order is applied at the sentence level below
    }

    // Preserve original casing pattern
    if (token === token.toUpperCase() && token.length > 1) {
      translatedWord = translatedWord.toUpperCase();
    } else if (token[0] === token[0].toUpperCase()) {
      translatedWord = translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
    }

    return translatedWord;
  });

  let result = translatedTokens.join('');

  // Apply sentence-level grammar rules
  if (ruleSet.grammar === 'reverse') {
    // Reverse word order in each sentence
    result = result.split(/([.!?]+)/).map(sentence => {
      if (!/[.!?]/.test(sentence)) {
        const words = sentence.trim().split(/\s+/);
        return words.reverse().join(' ');
      }
      return sentence;
    }).join('');
  }

  return result;
}

export function countRuleApplications(text: string, ruleSet: RuleSet): number {
  if (!text.trim()) return 0;

  let count = 0;
  const words = text.toLowerCase().split(/\s+/);

  words.forEach(word => {
    // Clean word of punctuation for matching
    const cleanWord = word.replace(/[^\w]/g, '');
    
    // Check substitution rules
    for (const original of Object.keys(ruleSet.substitutions)) {
      if (original && cleanWord.includes(original.toLowerCase())) {
        count++;
      }
    }
  });

  return count;
}