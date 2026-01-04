
import React, { useRef, useEffect } from 'react';
import { Ad } from '../types';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface InterstitialAdProps {
  ad: Ad;
}

export default function InterstitialAd({ ad }: InterstitialAdProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const entry = useIntersectionObserver(videoRef, { threshold: 0.5 });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isVisible) {
      videoRef.current?.play().catch(() => {});
    } else {
      videoRef.current?.pause();
    }
  }, [isVisible]);

  return (
    <div className="relative h-full w-full bg-gray-900 flex items-center justify-center">
      {ad.data.videoSrc && (
        <video
          ref={videoRef}
          src={ad.data.videoSrc}
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-6">
        <div>
          <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded">Sponsored</span>
        </div>
        <div className="text-white">
          <h2 className="text-2xl font-bold">{ad.data.title}</h2>
          <p className="text-md mt-2">{ad.data.description}</p>
          <a
            href={ad.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-blue-500 text-white font-bold py-3 px-8 rounded-lg text-center hover:bg-blue-600 transition-colors"
          >
            {ad.ctaText}
          </a>
        </div>
      </div>
    </div>
  );
}
