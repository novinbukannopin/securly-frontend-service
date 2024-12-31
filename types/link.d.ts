export interface ApiDeepLearningResponse {
  status: string;
  data: {
    url: string;
    prediction: 'blocked' | 'benign' | 'malicious';
    reason: string;
    score: number;
  };
}

export type ApiDeepLearningRequest = {
  url: string;
};

export type LinkType =
  | 'BENIGN'
  | 'MALICIOUS'
  | 'DEFACEMENT'
  | 'MALWARE'
  | 'PHISHING'
  | 'BLOCKED';

export interface CreateLinkInput {
  originalUrl?: string;
  shortCode?: string;
  comments?: string;
  type?: string;
  // todo fix this, fix mutation expiration when update
  expiresAt?: string;
  expiredRedirectUrl?: string;
  expiration?: {
    datetime?: string;
    url?: string;
  };
  qrcode?: string;
  tags?: string[];
  utm?: {
    source?: string; // Optional: UTM source
    medium?: string; // Optional: UTM medium
    campaign?: string; // Optional: UTM campaign
    term?: string; // Optional: UTM term
    content?: string; // Optional: UTM content
    expiresAt?: string; // Optional: UTM expiration datetime (ISO format)
  };
}

/**
 * Request
 */
export interface ResponseLinks {
  limit: number;
  links: Link[];
  page: number;
  total: number;
  totalPages: number;
  tags: string[];

  [property: string]: any;
}

export interface Link {
  comments: null | string;
  createdAt: string;
  deletedAt: null;
  expiredRedirectUrl: string;
  expiresAt: string;
  id: number;
  originalUrl: string;
  qrcode: string;
  shortCode: string;
  TagLink: TagLink[];
  type: string;
  updatedAt: string;
  userId: number;
  UTM: Utm;
  _count: {
    Click: number;
  };

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
  campaign: string;
  content: string;
  createdAt: string;
  deletedAt: null;
  id: number;
  linkId: number;
  medium: string;
  source: string;
  term: string;
  updatedAt: string;

  [property: string]: any;
}
