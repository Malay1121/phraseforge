export interface RuleSet {
  substitutions: Record<string, string>;
  prefix: string;
  suffix: string;
  grammar: 'none' | 'reverse' | 'double-vowels';
}

export interface SavedRuleSet {
  name: string;
  rules: RuleSet;
}