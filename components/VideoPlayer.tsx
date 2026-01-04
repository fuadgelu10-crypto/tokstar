
import React, { useRef, useEffect, useState } from 'react';
import { Video } from '../types';
import { HeartIcon, CommentIcon, ShareIcon, PromoteIcon, MusicNoteIcon } from './icons/Icons';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface VideoPlayerProps {
  video: Video;
  onLike: (id: number) => void;
  onView: (id: number) => void;
  onPromote: (video: Video) => void;
}

export default function VideoPlayer({ video, onLike, onView, onPromote }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const entry = useIntersectionObserver(videoRef, { threshold: 0.5 });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isVisible) {
      videoRef.current?.play().then(() => {
        setIsPlaying(true);
        onView(video.id);
      }).catch(() => {
        setIsPlaying(false);
      });
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isVisible, video.id, onView]);

  const handleVideoClick = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative h-full w-full bg-black">
      <video
        ref={videoRef}
        src={video.src}
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
        onClick={handleVideoClick}
      />
      
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 pointer-events-none">
          <svg className="h-16 w-16 text-white opacity-70" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path></svg>
        </div>
      )}

      <div className="absolute bottom-20 left-4 text-white z-10">
        <h3 className="font-bold text-lg shadow-black [text-shadow:_0_1px_4px_rgb(0_0_0_/_50%)]">{video.username}</h3>
        <p className="text-sm shadow-black [text-shadow:_0_1px_4px_rgb(0_0_0_/_50%)]">{video.description}</p>
        <div className="flex items-center mt-2">
            <MusicNoteIcon className="w-5 h-5" />
            <p className="text-sm ml-2">Original Sound - {video.username}</p>
        </div>
      </div>

      <div className="absolute bottom-20 right-2 flex flex-col items-center space-y-4 z-10">
        <button onClick={() => onLike(video.id)} className="flex flex-col items-center">
          <HeartIcon className={`w-8 h-8 ${video.isLiked ? 'text-red-500' : 'text-white'}`} filled={video.isLiked} />
          <span className="text-xs font-semibold">{video.likes.toLocaleString()}</span>
        </button>
        <button className="flex flex-col items-center">
          <CommentIcon className="w-8 h-8" />
          <span className="text-xs font-semibold">{(video.views / 20).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
        </button>
        <button className="flex flex-col items-center">
          <ShareIcon className="w-8 h-8" />
          <span className="text-xs font-semibold">Share</span>
        </button>
         <button onClick={() => onPromote(video)} className="flex flex-col items-center mt-4 pt-2">
          <PromoteIcon className="w-8 h-8 text-yellow-400" />
          <span className="text-xs font-semibold text-yellow-400">Promote</span>
        </button>
      </div>
    </div>
  );
}
