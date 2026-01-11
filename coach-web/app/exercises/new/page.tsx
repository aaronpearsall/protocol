'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function NewExercisePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('strength');
  const [coachNotes, setCoachNotes] = useState('');
  const [videoInputType, setVideoInputType] = useState<'upload' | 'link'>('upload');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    // Save exercise logic
    console.log('Saving exercise...', {
      name,
      description,
      category,
      coachNotes,
      videoFile,
      videoUrl: videoInputType === 'link' ? videoUrl : null,
    });
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Add New Exercise</h2>
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-white"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <label className="block text-sm font-medium mb-2 text-gray-300">Exercise Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                placeholder="e.g., Barbell Back Squat"
              />
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <label className="block text-sm font-medium mb-2 text-gray-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-green-500"
              >
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
                <option value="gymnastics">Gymnastics</option>
                <option value="olympic">Olympic</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                placeholder="Exercise description and instructions..."
              />
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <label className="block text-sm font-medium mb-2 text-gray-300">Coach Notes</label>
              <textarea
                value={coachNotes}
                onChange={(e) => setCoachNotes(e.target.value)}
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                placeholder="Tips, cues, and coaching notes..."
              />
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <label className="block text-sm font-medium mb-2 text-gray-300">Exercise Video</label>
              
              {/* Toggle between Upload and Link */}
              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setVideoInputType('upload');
                    setVideoUrl('');
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    videoInputType === 'upload'
                      ? 'bg-green-500 text-black'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  Upload Video
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVideoInputType('link');
                    setVideoFile(null);
                    setVideoPreview(null);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    videoInputType === 'link'
                      ? 'bg-green-500 text-black'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  Video Link
                </button>
              </div>

              {videoInputType === 'upload' ? (
                <>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white mb-2 focus:outline-none focus:border-green-500"
                  />
                  {videoPreview && (
                    <div className="mt-2">
                      <video src={videoPreview} controls className="max-w-md rounded-lg" />
                      <p className="text-sm text-gray-400 mt-2">
                        {videoFile?.name} ({(videoFile?.size || 0) / 1000000} MB)
                      </p>
                    </div>
                  )}
                  {videoFile && !videoPreview && (
                    <p className="mt-2 text-sm text-gray-400">Selected: {videoFile.name}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Upload a video file demonstrating this exercise
                  </p>
                </>
              ) : (
                <>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white mb-2 placeholder-gray-500 focus:outline-none focus:border-green-500"
                    placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                  />
                  {videoUrl && (
                    <div className="mt-2">
                      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                        <p className="text-sm text-gray-400 mb-2">Video URL:</p>
                        <a
                          href={videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:text-green-400 text-sm break-all"
                        >
                          {videoUrl}
                        </a>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Paste a link to a video (YouTube, Vimeo, or direct video URL)
                  </p>
                </>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-colors"
              >
                Save Exercise
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

