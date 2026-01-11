'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { format } from 'date-fns';

// Mock workouts - replace with API call
const mockWorkouts = [
  { 
    id: '1', 
    name: 'Fran', 
    description: '21-15-9 Thrusters and Pull-ups', 
    date: new Date('2024-01-15'),
    sections: ['warmup', 'main'],
    type: 'main'
  },
  { 
    id: '2', 
    name: 'Murph', 
    description: '1 mile run, 100 pull-ups, 200 push-ups, 300 squats, 1 mile run', 
    date: new Date('2024-01-10'),
    sections: ['warmup', 'main', 'cooldown'],
    type: 'main'
  },
  { 
    id: '3', 
    name: 'Cindy', 
    description: '20 min AMRAP: 5 pull-ups, 10 push-ups, 15 squats', 
    date: new Date('2024-01-08'),
    sections: ['warmup', 'main'],
    type: 'main'
  },
  { 
    id: '4', 
    name: 'Upper Body Warm-up', 
    description: 'Arm circles, band pull-aparts, shoulder mobility', 
    date: new Date('2024-01-05'),
    sections: ['warmup'],
    type: 'warmup'
  },
  { 
    id: '5', 
    name: 'Bicep Curl Accessory', 
    description: '3 sets of 12 bicep curls', 
    date: new Date('2024-01-03'),
    sections: ['accessory'],
    type: 'accessory'
  },
  { 
    id: '6', 
    name: 'Post-Workout Stretch', 
    description: 'Full body stretching routine', 
    date: new Date('2024-01-01'),
    sections: ['cooldown'],
    type: 'cooldown'
  },
];

export default function WorkoutsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'warmup' | 'main' | 'accessory' | 'cooldown'>('all');

  const filteredWorkouts = mockWorkouts.filter((workout) => {
    const matchesSearch = 
      workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === 'all' || workout.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <Header />
        
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Workout Library</h1>
              <p className="text-sm text-gray-400">Manage and reuse your workout templates</p>
            </div>
            <Link
              href="/workouts/new"
              className="px-4 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-colors"
            >
              + Create New Workout
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex gap-4 items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search workouts..."
                className="flex-1 max-w-md bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
              />
            </div>
            
            {/* Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filterType === 'all'
                    ? 'bg-green-500 text-black'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('warmup')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filterType === 'warmup'
                    ? 'bg-green-500 text-black'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                Warm-ups
              </button>
              <button
                onClick={() => setFilterType('main')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filterType === 'main'
                    ? 'bg-green-500 text-black'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                Workouts
              </button>
              <button
                onClick={() => setFilterType('accessory')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filterType === 'accessory'
                    ? 'bg-green-500 text-black'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                Accessories
              </button>
              <button
                onClick={() => setFilterType('cooldown')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filterType === 'cooldown'
                    ? 'bg-green-500 text-black'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                Cool-downs
              </button>
            </div>
          </div>

          {/* Workouts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWorkouts.map((workout) => {
              const typeColors = {
                warmup: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                main: 'bg-green-500/20 text-green-400 border-green-500/30',
                accessory: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
                cooldown: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
              };

              return (
                <div
                  key={workout.id}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-white">{workout.name}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium border ${typeColors[workout.type as keyof typeof typeColors]}`}>
                          {workout.type === 'main' ? 'Workout' : workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/workouts/${workout.id}/edit`}
                      className="text-gray-400 hover:text-green-500 text-sm"
                    >
                      Edit
                    </Link>
                  </div>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{workout.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Created: {format(workout.date, 'MMM d, yyyy')}
                    </span>
                    <Link
                      href={`/programming?select=${workout.id}`}
                      className="text-xs text-green-500 hover:text-green-400"
                    >
                      Use in Calendar →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredWorkouts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No workouts found</p>
              <Link
                href="/workouts/new"
                className="inline-block px-4 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-colors"
              >
                Create Your First Workout
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

