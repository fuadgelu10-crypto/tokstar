
import { Video, Ad, User, PromotionPackage } from './types';

export const INITIAL_VIDEOS: Video[] = [
  {
    id: 1,
    src: 'https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-floral-summery-dress-walking-in-a-meadow-42940-large.mp4',
    username: '@naturelover',
    description: 'Walking through a summer meadow 🌸 #summer #nature #flowers',
    likes: 12345,
    views: 150000,
  },
  {
    id: 2,
    src: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-shore-of-a-beach-at-dusk-4403-large.mp4',
    username: '@beachvibes',
    description: 'Sunset at the beach is my therapy. #beach #sunset #ocean',
    likes: 25678,
    views: 300000,
  },
  {
    id: 3,
    src: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-on-the-street-42941-large.mp4',
    username: '@streetdancer',
    description: 'Just feeling the music in the city! 🕺 #dance #citylife #hiphop',
    likes: 58123,
    views: 800000,
  },
    {
    id: 4,
    src: 'https://assets.mixkit.co/videos/preview/mixkit-girl-doing-a-cartwheel-on-the-beach-4244-large.mp4',
    username: '@gymnasticgirl',
    description: 'Cartwheels on the beach! So much fun! #gymnastics #beachday #fun',
    likes: 9876,
    views: 95000,
  },
  {
    id: 5,
    src: 'https://assets.mixkit.co/videos/preview/mixkit-surfer-riding-a-wave-at-sunset-4320-large.mp4',
    username: '@surferpro',
    description: 'Catching the last wave of the day. #surfing #sunset #waves',
    likes: 34567,
    views: 450000,
  },
  {
    id: 6,
    src: 'https://assets.mixkit.co/videos/preview/mixkit-people-on-a-rocky-beach-watching-the-waves-4250-large.mp4',
    username: '@coastline_explorer',
    description: 'The power of the ocean is incredible. #ocean #waves #coast',
    likes: 19876,
    views: 220000,
  },
];

export const INITIAL_ADS: Ad[] = [
  {
    id: 101,
    type: 'interstitial',
    data: {
      videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-marketing-video-of-a-girl-with-a-practical-bag-39491-large.mp4',
      title: 'Get the new Wanderer Bag!',
      description: 'Your perfect companion for every adventure. 50% off now!',
    },
    ctaText: 'Shop Now',
    ctaUrl: '#',
  },
  {
    id: 102,
    type: 'banner',
    data: {
      title: 'Streamify Music',
      description: 'Listen to unlimited music, ad-free. Try for free.',
    },
    ctaText: 'Try Free',
    ctaUrl: '#',
  },
];

export const INITIAL_USER: User = {
  username: '@yourusername',
  balance: 25000,
  totalViews: 1250000,
  income: 1500,
};

export const PROMOTION_PACKAGES: PromotionPackage[] = [
    { id: 'basic', name: 'Basic', price: 10000, views: 1000, color: 'bg-blue-500' },
    { id: 'pro', name: 'Pro', price: 50000, views: 7000, color: 'bg-purple-500' },
    { id: 'viral', name: 'Viral', price: 100000, views: 20000, color: 'bg-red-500' },
]
