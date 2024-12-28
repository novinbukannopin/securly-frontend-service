/**
 * Request
 */
export interface AnalyticsResponse {
  Click: Click[];
  createdAt: string;
  deletedAt: null | string;
  expiredRedirectUrl: null | string;
  expiresAt: null | string;
  id: number;
  originalUrl: string;
  shortCode: string;
  TagLink: TagLink[];
  updatedAt: string;
  UTM: Utm;

  [property: string]: any;
}

export interface Click {
  country: string;
  countryCode: string;
  id: string;
  ip: string;
  loc: string;
  org: string;
  postal: string;
  region: string;
  timezone: string;
  userAgent: UserAgent;

  [property: string]: any;
}

export interface UserAgent {
  browser: null | string;
  browserVersion: null | string;
  cpuArch: null | string;
  deviceType: null;
  engine: null | string;
  os: null | string;
  osVersion: null | string;
  ua: string;

  [property: string]: any;
}

export interface TagLink {
  tag: Tag;

  [property: string]: any;
}

export interface Tag {
  name: string;

  [property: string]: any;
}

export interface Utm {
  campaign: null | string;
  content: null | string;
  createdAt: string;
  deletedAt: null;
  id: number;
  linkId: number;
  medium: null | string;
  source: null | string;
  term: null | string;
  updatedAt: string;

  [property: string]: any;
}
