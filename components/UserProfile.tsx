
import React from 'react';
import { User } from '../types';
import { CloseIcon } from './icons/Icons';

interface UserProfileProps {
  user: User;
  onClose: () => void;
}

const StatCard = ({ label, value, isCurrency = false }: { label: string; value: number; isCurrency?: boolean }) => {
    const formatValue = isCurrency ? `Rp${value.toLocaleString()}` : value.toLocaleString();
    return (
        <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-2xl font-bold">{formatValue}</p>
        </div>
    );
};

export default function UserProfile({ user, onClose }: UserProfileProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-sm text-white shadow-lg relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <CloseIcon className="w-6 h-6" />
        </button>

        <div className="p-6">
            <div className="flex flex-col items-center">
                <img src={`https://i.pravatar.cc/150?u=${user.username}`} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-gray-600"/>
                <h2 className="text-2xl font-bold mt-4">{user.username}</h2>
                <p className="text-gray-400">Creator Account</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
                 <StatCard label="Balance" value={user.balance} isCurrency />
                 <StatCard label="Total Income" value={user.income} isCurrency />
                 <StatCard label="Total Views" value={user.totalViews} />
                 <StatCard label="Followers" value={Math.round(user.totalViews / 10)} />
            </div>

            <p className="text-xs text-center text-gray-500 mt-6">
                New accounts have limited views. To reach a wider audience and get on the For You Page, promote your videos.
            </p>
        </div>
      </div>
    </div>
  );
}
