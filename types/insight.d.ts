// interfaces/adminAnalytics.ts

export interface AnalyticsDashboardResponse {
  status: string;
  data: AnalyticsDashboardData;
}

export interface AnalyticsDashboardData {
  totalLinks: number;
  totalClicks: number;
  mostClickedLinks: TopUrl[];
  userStatistics: UserStats;
}

export interface TopUrl {
  id: number;
  originalUrl: string;
  shortCode: string;
  clickCount: number;
}

export interface BrowserStat {
  browser: string;
  count: number;
}

export interface UserStats {
  totalUsers: number;
  verifiedUsers: number;
  unverifiedUsers: number;
}
