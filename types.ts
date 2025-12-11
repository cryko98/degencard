export interface DegenAnalysis {
  score: number;
  rank: string;
  description: string;
  pros: string[];
  cons: string[];
  suggestedMemecoin: string;
  profilePicUrl?: string;
  sources?: { title: string; uri: string }[];
}

export enum Platform {
  TWITTER = 'twitter',
  INSTAGRAM = 'instagram'
}

export interface AnalysisState {
  status: 'idle' | 'scanning' | 'analyzing' | 'complete' | 'error';
  error?: string;
  data?: DegenAnalysis;
}