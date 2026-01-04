
import React, { useState, useRef } from 'react';
import { CloseIcon, SparklesIcon } from './icons/Icons';
import { generateVideoDescription } from '../services/geminiService';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (video: { videoUrl: string, description: string }) => void;
}

export default function UploadModal({ onClose, onUpload }: UploadModalProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleGenerateDescription = async () => {
      setIsGenerating(true);
      try {
          const generatedDesc = await generateVideoDescription();
          setDescription(generatedDesc);
      } catch (error) {
          console.error("Failed to generate description:", error);
          alert("Could not generate a description at this time.");
      } finally {
          setIsGenerating(false);
      }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) {
      alert('Please select a video file.');
      return;
    }
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      onUpload({
        videoUrl: URL.createObjectURL(videoFile),
        description,
      });
      setIsUploading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-sm text-white shadow-lg relative animate-fade-in-up">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-lg font-bold">Upload Video</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <CloseIcon className="w-6 h-6" />
            </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div 
            className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-gray-500"
            onClick={() => fileInputRef.current?.click()}
            >
            <input
              type="file"
              accept="video/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            {videoFile ? (
                <p className="text-green-400">{videoFile.name}</p>
            ) : (
                <p>Click to select a video</p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <div className="relative">
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your video..."
                  rows={3}
                  className="w-full bg-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button 
                  type="button" 
                  onClick={handleGenerateDescription}
                  disabled={isGenerating}
                  className="absolute bottom-2 right-2 p-1.5 bg-purple-600 rounded-full hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  {isGenerating ? 
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  : <SparklesIcon className="w-4 h-4" /> }
                </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isUploading || !videoFile}
            className="w-full bg-blue-500 font-bold py-3 rounded-lg mt-6 hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>
    </div>
  );
}
