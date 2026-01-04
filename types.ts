
export interface Video {
  id: number;
  src: string;
  username: string;
  description: string;
  likes: number;
  views: number;
  isLiked?: boolean;
}

export interface User {
  username: string;
  balance: number;
  totalViews: number;
  income: number;
}

export interface Ad {
  id: number;
  type: 'interstitial' | 'banner';
  data: {
    videoSrc?: string;
    imageSrc?: string;
    title: string;
    description: string;
  };
  ctaText: string;
  ctaUrl: string;
}

export type FeedItem = {
  type: 'video' | 'ad';
  data: Video | Ad;
};

export interface PromotionPackage {
    id: string;
    name: string;
    price: number;
    views: number;
    color: string;
}
