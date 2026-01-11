'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import Link from 'next/link';

export default function CoachDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <Header />
        
        <main className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-1">Dashboard Overview</h1>
            <p className="text-sm text-gray-400">Welcome back! Here's what's happening with Protocol.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Workouts"
              value="42"
              icon="💪"
              trend={{ value: '+12%', isPositive: true }}
              gradient="purple"
            />
            <StatCard
              title="Active Subscribers"
              value="1,234"
              icon="👥"
              trend={{ value: '+8%', isPositive: true }}
              gradient="blue"
            />
            <StatCard
              title="Exercise Library"
              value="156"
              icon="📚"
              trend={{ value: '+5', isPositive: true }}
              gradient="green"
            />
            <StatCard
              title="This Week's Completions"
              value="892"
              icon="✅"
              trend={{ value: '+23%', isPositive: true }}
              gradient="purple"
            />
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/workouts/new"
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                      <span className="text-xl">➕</span>
                    </div>
                    <h3 className="font-semibold text-white">Create Workout</h3>
                  </div>
                  <p className="text-sm text-gray-400">Add a new workout to the calendar</p>
                </Link>

                <Link
                  href="/exercises/new"
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                      <span className="text-xl">📚</span>
                    </div>
                    <h3 className="font-semibold text-white">Add Exercise</h3>
                  </div>
                  <p className="text-sm text-gray-400">Expand your exercise library</p>
                </Link>

                <Link
                  href="/programming"
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                      <span className="text-xl">📅</span>
                    </div>
                    <h3 className="font-semibold text-white">View Calendar</h3>
                  </div>
                  <p className="text-sm text-gray-400">Manage workout programming</p>
                </Link>

                <Link
                  href="/workouts"
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                      <span className="text-xl">💪</span>
                    </div>
                    <h3 className="font-semibold text-white">All Workouts</h3>
                  </div>
                  <p className="text-sm text-gray-400">Browse workout library</p>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
                <button className="text-gray-400 hover:text-white text-sm">View All</button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">💪</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium">New workout created</p>
                    <p className="text-xs text-gray-400">Fran - 2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">📚</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium">Exercise added</p>
                    <p className="text-xs text-gray-400">Barbell Back Squat - 5 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">👥</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium">12 new subscribers</p>
                    <p className="text-xs text-gray-400">Today</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">✅</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium">Workout completed</p>
                    <p className="text-xs text-gray-400">Murph - Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

