
import React from 'react';
import { Video, PromotionPackage } from '../types';
import { CloseIcon, RocketIcon } from './icons/Icons';

interface PromoteModalProps {
  video: Video;
  packages: PromotionPackage[];
  userBalance: number;
  onClose: () => void;
  onPromote: (pkg: PromotionPackage) => void;
}

export default function PromoteModal({ video, packages, userBalance, onClose, onPromote }: PromoteModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-md text-white shadow-lg relative animate-fade-in-up">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-lg font-bold flex items-center"><RocketIcon className="w-5 h-5 mr-2 text-yellow-400"/>Promote Video</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <CloseIcon className="w-6 h-6" />
            </button>
        </div>

        <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
                <video src={video.src} className="w-16 h-20 object-cover rounded-lg bg-black" muted playsInline/>
                <div>
                    <p className="font-semibold">{video.description.substring(0, 30)}...</p>
                    <p className="text-sm text-gray-400">{video.username}</p>
                </div>
            </div>

            <p className="text-center text-gray-300 mb-4">Choose a package to get more views and reach a wider audience.</p>

            <div className="space-y-3">
                {packages.map(pkg => (
                    <button 
                        key={pkg.id} 
                        onClick={() => onPromote(pkg)}
                        disabled={userBalance < pkg.price}
                        className={`w-full p-4 rounded-lg flex justify-between items-center text-left transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed ${pkg.color}`}
                    >
                        <div>
                            <p className="text-lg font-bold">{pkg.name}</p>
                            <p className="text-sm opacity-90">Get ~{pkg.views.toLocaleString()} more views</p>
                        </div>
                        <p className="text-lg font-bold">Rp{pkg.price.toLocaleString()}</p>
                    </button>
                ))}
            </div>

             <div className="text-center text-sm text-gray-400 mt-6">
                Your current balance: <span className="font-semibold text-white">Rp{userBalance.toLocaleString()}</span>
            </div>
        </div>
      </div>
    </div>
  );
}
