export interface User {
  name: string;
  age: number;
  email: string;
  isAnonymous?: boolean;
}

export interface EmotionalAnalysis {
  date: string;
  happiness: number;
  sadness: number;
  anxiety: number;
  overwhelm: number;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface Quote {
  text: string;
  author: string;
}