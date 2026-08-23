export type TabType = 'discover' | 'planner' | 'forecaster' | 'safety' | 'threats';

export interface UserState {
  sessionId: string;
  name: string;
  avatar: string;
}
