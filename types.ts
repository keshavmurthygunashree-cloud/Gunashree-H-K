
export interface AnalysisResult {
  summary: string;
  keySkills: string[];
  missingSkills: string[];
  improvementSuggestions: string[];
  improvementRoadmap: string[];
}

export interface UserInput {
  resumeText: string;
  jobRole: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
