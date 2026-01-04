
import React, { useState, useEffect, useMemo } from 'react';
import { Video, User, Ad, FeedItem, PromotionPackage } from './types';
import { INITIAL_VIDEOS, INITIAL_ADS, INITIAL_USER, PROMOTION_PACKAGES } from './constants';
import VideoPlayer from './components/VideoPlayer';
import InterstitialAd from './components/InterstitialAd';
import UserProfile from './components/UserProfile';
import UploadModal from './components/UploadModal';
import PromoteModal from './components/PromoteModal';
import { UserIcon, UploadIcon } from './components/icons/Icons';

const AD_FREQUENCY = 4; // Show an ad after every 3 videos

export default function App() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [showProfile, setShowProfile] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showPromote, setShowPromote] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>(INITIAL_VIDEOS);

  useEffect(() => {
    const newFeed: FeedItem[] = [];
    let adIndex = 0;
    videos.forEach((video, index) => {
      newFeed.push({ type: 'video', data: video });
      if ((index + 1) % AD_FREQUENCY === 0) {
        const ad = INITIAL_ADS[adIndex % INITIAL_ADS.length];
        if (ad.type === 'interstitial') {
          newFeed.push({ type: 'ad', data: ad });
          adIndex++;
        }
      }
    });
    setFeedItems(newFeed);
  }, [videos]);

  const bannerAd = useMemo(() => INITIAL_ADS.find(ad => ad.type === 'banner'), []);

  const handleLike = (videoId: number) => {
    setVideos(currentVideos =>
      currentVideos.map(video =>
        video.id === videoId
          ? { ...video, likes: video.likes + 1, isLiked: true }
          : video
      )
    );
     setUser(currentUser => ({
        ...currentUser,
        income: currentUser.income + 0.01, // Earn from likes
    }));
  };
  
  const handleView = (videoId: number) => {
    // This would typically be debounced in a real app
    setVideos(currentVideos =>
      currentVideos.map(video =>
        video.id === videoId ? { ...video, views: video.views + 1 } : video
      )
    );
    setUser(currentUser => ({
        ...currentUser,
        totalViews: currentUser.totalViews + 1,
        income: currentUser.income + 0.001, // Earn from views
    }));
  };


  const handleUpload = (newVideo: { videoUrl: string, description: string }) => {
    const newVideoData: Video = {
      id: Date.now(),
      src: newVideo.videoUrl,
      username: user.username,
      description: newVideo.description,
      likes: 0,
      views: 0,
      isLiked: false,
    };
    setVideos(currentVideos => [newVideoData, ...currentVideos]);
    setShowUpload(false);
  };

  const handlePromote = (pkg: PromotionPackage) => {
    if (user.balance >= pkg.price) {
      setUser(currentUser => ({
        ...currentUser,
        balance: currentUser.balance - pkg.price
      }));
       setVideos(currentVideos =>
        currentVideos.map(video =>
          video.id === showPromote?.id
            ? { ...video, views: video.views + pkg.views }
            : video
        )
      );
      setShowPromote(null);
      alert(`Promotion successful! Your video will get an estimated ${pkg.views.toLocaleString()} new views.`);
    } else {
      alert("Insufficient balance to purchase this promotion.");
    }
  };


  return (
    <div className="bg-black h-screen w-screen overflow-hidden text-white font-sans">
      <div className="relative h-full w-full max-w-md mx-auto snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
        {feedItems.map((item, index) => (
          <div key={`${item.type}-${item.data.id}-${index}`} className="snap-start h-screen w-full flex-shrink-0 relative">
            {item.type === 'video' ? (
              <VideoPlayer
                video={item.data as Video}
                onLike={handleLike}
                onView={handleView}
                onPromote={() => setShowPromote(item.data as Video)}
              />
            ) : (
              <InterstitialAd ad={item.data as Ad} />
            )}
          </div>
        ))}
      </div>
      
       {bannerAd && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-md px-2 z-20">
             <a href={bannerAd.ctaUrl} target="_blank" rel="noopener noreferrer" className="block w-full bg-gray-800 p-2 rounded-lg text-center text-sm shadow-lg hover:bg-gray-700 transition-colors">
                <p className="font-bold">{(bannerAd.data as {title: string}).title}</p>
                <p className="text-xs text-gray-400">{(bannerAd.data as {description: string}).description}</p>
            </a>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 w-full bg-black z-10">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          <button className="flex flex-col items-center text-gray-300 hover:text-white" onClick={() => alert('Home clicked!')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-xs">Home</span>
          </button>
           <button onClick={() => setShowUpload(true)} className="bg-white text-black rounded-full p-3 shadow-lg hover:scale-105 transition-transform">
            <UploadIcon className="h-6 w-6" />
          </button>
          <button className="flex flex-col items-center text-gray-300 hover:text-white" onClick={() => setShowProfile(true)}>
            <UserIcon className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>

      {showProfile && <UserProfile user={user} onClose={() => setShowProfile(false)} />}
      {showUpload && <UploadModal onClose={() => setShowUpload(false)} onUpload={handleUpload} />}
      {showPromote && (
        <PromoteModal
          video={showPromote}
          packages={PROMOTION_PACKAGES}
          userBalance={user.balance}
          onClose={() => setShowPromote(null)}
          onPromote={handlePromote}
        />
      )}
    </div>
  );
}
