import type { RuleSet } from '../types';

export function encodeRulesToUrl(ruleSet: RuleSet): string {
  try {
    const encoded = btoa(JSON.stringify(ruleSet));
    return `${window.location.origin}${window.location.pathname}?rules=${encoded}`;
  } catch (error) {
    console.error('Error encoding rules:', error);
    return window.location.href;
  }
}

export function decodeRulesFromUrl(): RuleSet | null {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedRules = urlParams.get('rules');
    
    if (!encodedRules) return null;

    const decoded = JSON.parse(atob(encodedRules));
    
    // Validate the structure
    if (
      decoded &&
      typeof decoded === 'object' &&
      'substitutions' in decoded &&
      'prefix' in decoded &&
      'suffix' in decoded &&
      'grammar' in decoded
    ) {
      return decoded as RuleSet;
    }
    
    return null;
  } catch (error) {
    console.error('Error decoding rules from URL:', error);
    return null;
  }
}

export function generateRandomRules(): RuleSet {
  const randomWords = [
    'hello', 'world', 'friend', 'love', 'peace', 'happy', 'good', 'great',
    'beautiful', 'amazing', 'wonderful', 'fantastic', 'awesome', 'cool'
  ];

  const randomReplacements = [
    'zyx', 'qal', 'mek', 'vix', 'lor', 'naz', 'tek', 'rix',
    'phy', 'kol', 'jux', 'wem', 'dor', 'val', 'pek', 'sil'
  ];

  const prefixes = ['', 'zy-', 'ko-', 'mi-', 'xa-'];
  const suffixes = ['', '-ix', '-om', '-el', '-yx', '-ak'];
  const grammars: RuleSet['grammar'][] = ['none', 'reverse', 'double-vowels'];

  // Generate 5-8 random substitution rules
  const numRules = 5 + Math.floor(Math.random() * 4);
  const substitutions: Record<string, string> = {};

  for (let i = 0; i < numRules; i++) {
    const wordIndex = Math.floor(Math.random() * randomWords.length);
    const replIndex = Math.floor(Math.random() * randomReplacements.length);
    substitutions[randomWords[wordIndex]] = randomReplacements[replIndex];
  }

  return {
    substitutions,
    prefix: prefixes[Math.floor(Math.random() * prefixes.length)],
    suffix: suffixes[Math.floor(Math.random() * suffixes.length)],
    grammar: grammars[Math.floor(Math.random() * grammars.length)]
  };
}

export function exportRuleSet(ruleSet: RuleSet, name: string): void {
  const data = {
    name,
    rules: ruleSet,
    exported: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name.replace(/[^a-z0-9]/gi, '_')}_rules.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importRuleSet(file: File): Promise<{ name: string; rules: RuleSet } | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.name && data.rules && data.rules.substitutions) {
          resolve({ name: data.name, rules: data.rules });
        } else {
          resolve(null);
        }
      } catch (error) {
        console.error('Error importing rule set:', error);
        resolve(null);
      }
    };
    reader.readAsText(file);
  });
}