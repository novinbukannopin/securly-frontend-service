interface TopLink {
  shortCode: string;
  clicks: number;
  originalUrl: string;
}

interface NeverClickedLink {
  shortCode: string;
  originalUrl: string;
  createdAt: string; // ISO date string
}

interface LinkSummary {
  total: number;
  active: number;
  expired: number;
  archived: number;
}

interface TagSummary {
  list: string[]; // Array of tag names
  usage: TagUsage[];
}

interface TagUsage {
  tagName: string;
  usageCount: number;
}

interface LinkTypeInsight {
  list: LinkTypeCount[];
}

interface LinkTypeCount {
  type: string; // Enum-like representation of LinkType
  _count: {
    type: number;
  };
}

export interface AnalyticsResponse {
  topLinks: Array<{
    shortCode: string;
    clicks: number;
    originalUrl: string;
  }>;
  neverClickedLinks: Array<{
    shortCode: string;
    originalUrl: string;
    createdAt: string;
  }>;
  links: {
    total: LinkMetric;
    active: LinkMetric;
    expired: LinkMetric;
    archived: LinkMetric;
  };
  tags: {
    list: string[];
    usage: Array<{
      tagName: string;
      usageCount: number;
    }>;
  };
  type: {
    list: Array<{
      _count: {
        type: number;
      };
      type: string;
    }>;
  };
}

interface LinkMetric {
  percentageChange: any;
  overall: number;
  thisWeek: number;
  lastWeek: number;
  percentageChange: {
    thisWeek: number;
  };
}

interface ClickInsight {
  data: {
    date: string;
    totalClicks: number;
  }[];
  totalClick: number;
}

interface InteractionInsight {
  location: Record<string, number>;
  region: Record<string, number>;
  country: Record<string, number>;
  browser: Record<string, number>;
  os: Record<string, number>;
  osVersion: Record<string, number>;
  cpuArch: Record<string, number>;
  deviceType: Record<string, number>;
}

export interface InsightsResponse {
  click: ClickInsight;
  interaction: InteractionInsight;
}
