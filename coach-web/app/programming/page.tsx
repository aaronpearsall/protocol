'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

// Mock workout library - replace with API call
const workoutLibrary = [
  { id: '1', name: 'Fran', description: '21-15-9 Thrusters and Pull-ups', type: 'main' },
  { id: '2', name: 'Murph', description: '1 mile run, 100 pull-ups, 200 push-ups, 300 squats, 1 mile run', type: 'main' },
  { id: '3', name: 'Cindy', description: '20 min AMRAP: 5 pull-ups, 10 push-ups, 15 squats', type: 'main' },
  { id: '4', name: 'Grace', description: '30 Clean and Jerks for time', type: 'main' },
  { id: '5', name: 'Diane', description: '21-15-9 Deadlifts and Handstand Push-ups', type: 'main' },
  { id: '6', name: 'Upper Body Warm-up', description: 'Arm circles, band work, shoulder mobility', type: 'warmup' },
  { id: '7', name: 'Lower Body Warm-up', description: 'Leg swings, hip mobility, air squats', type: 'warmup' },
  { id: '8', name: 'Bicep Curl Accessory', description: '3 sets of 12 bicep curls', type: 'accessory' },
  { id: '9', name: 'Tricep Extension Accessory', description: '3 sets of 10 tricep extensions', type: 'accessory' },
  { id: '10', name: 'Post-Workout Stretch', description: 'Full body stretching routine', type: 'cooldown' },
];

function ProgrammingCalendar() {
  const searchParams = useSearchParams();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showWorkoutSelector, setShowWorkoutSelector] = useState(false);
  const [workoutMode, setWorkoutMode] = useState<'select' | 'create'>('select');
  const [librarySearchQuery, setLibrarySearchQuery] = useState('');
  const [libraryFilterType, setLibraryFilterType] = useState<'all' | 'warmup' | 'main' | 'accessory' | 'cooldown'>('all');
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  // Mock scheduled workouts - replace with API call
  const scheduledWorkouts: Record<string, { name: string; id: string }> = {
    [format(new Date(), 'yyyy-MM-dd')]: { name: 'Fran', id: '1' },
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  useEffect(() => {
    // Check if we should select a workout from library
    const workoutId = searchParams?.get('select');
    if (workoutId && selectedDate) {
      const workout = workoutLibrary.find((w) => w.id === workoutId);
      if (workout) {
        // Schedule this workout to the selected date
        // This would be an API call in production
        console.log('Scheduling workout', workout.name, 'to', format(selectedDate, 'yyyy-MM-dd'));
        setShowWorkoutModal(false);
        setShowWorkoutSelector(false);
      }
    }
  }, [searchParams, selectedDate]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.create-dropdown-container')) {
        setShowCreateDropdown(false);
      }
      if (!target.closest('.month-picker-container')) {
        setShowMonthPicker(false);
      }
    };

    if (showCreateDropdown || showMonthPicker) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showCreateDropdown, showMonthPicker]);

  const handleDateClick = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    
    // Set the selected date
    setSelectedDate(date);
    setShowDatePicker(false); // Close date picker if open
    
    // Check if there's an existing workout
    if (scheduledWorkouts[dateKey]) {
      // Show existing workout modal
      setShowWorkoutModal(true);
      setShowWorkoutSelector(false);
    } else {
      // Show selector to choose or create
      setShowWorkoutSelector(true);
      setShowWorkoutModal(false);
    }
  };

  const handleSelectFromLibrary = (workoutId: string) => {
    const workout = workoutLibrary.find((w) => w.id === workoutId);
    if (workout && selectedDate) {
      // Schedule workout to selected date - API call in production
      console.log('Scheduling workout', workout.name, 'to', format(selectedDate, 'yyyy-MM-dd'));
      setShowWorkoutSelector(false);
      // Refresh to show the scheduled workout
      window.location.reload();
    }
  };

  const handleCreateNew = () => {
    if (selectedDate) {
      window.location.href = `/workouts/new?date=${format(selectedDate, 'yyyy-MM-dd')}`;
    }
  };

  const getWorkoutForDate = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return scheduledWorkouts[dateKey];
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <Header />
        
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Programming Calendar</h1>
              <p className="text-sm text-gray-400">Schedule and manage workouts by date</p>
            </div>
            <div className="relative create-dropdown-container">
              <button
                onClick={() => setShowCreateDropdown(!showCreateDropdown)}
                className="px-4 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-colors flex items-center gap-2"
              >
                <span>➕</span>
                <span>Create</span>
                <span>▼</span>
              </button>
              
              {showCreateDropdown && (
                <div className="absolute right-0 top-full mt-2 bg-gray-900 border border-gray-800 rounded-lg z-50 min-w-[200px] overflow-hidden">
                  <button
                    onClick={() => {
                      const today = new Date();
                      setSelectedDate(today);
                      setShowWorkoutSelector(true);
                      setShowWorkoutModal(false);
                      setShowCreateDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-800 text-white transition-colors"
                  >
                    Session
                  </button>
                  <button
                    onClick={() => {
                      // Handle rest day - you can implement this later
                      console.log('Create rest day');
                      setShowCreateDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-800 text-white transition-colors border-t border-gray-800"
                  >
                    Rest Day
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              {/* Calendar Header */}
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={handlePreviousMonth}
                  className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors"
                >
                  ←
                </button>
                <div className="relative month-picker-container">
                  <button
                    onClick={() => setShowMonthPicker(!showMonthPicker)}
                    className="text-lg font-bold text-white hover:text-green-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800/50"
                  >
                    {format(currentMonth, 'MMMM yyyy')}
                  </button>
                  
                  {showMonthPicker && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 border border-gray-800 rounded-lg p-4 z-50 min-w-[280px]">
                      <div className="mb-4">
                        <label className="block text-sm text-gray-400 mb-2">Select Month & Year</label>
                        <input
                          type="month"
                          value={format(currentMonth, 'yyyy-MM')}
                          onChange={(e) => {
                            const [year, month] = e.target.value.split('-');
                            setCurrentMonth(new Date(parseInt(year), parseInt(month) - 1, 1));
                            setShowMonthPicker(false);
                          }}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                        />
                      </div>
                      <button
                        onClick={() => setShowMonthPicker(false)}
                        className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleNextMonth}
                  className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors"
                >
                  →
                </button>
              </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-gray-400 py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month starts (Monday = 0) */}
            {Array.from({ length: (monthStart.getDay() + 6) % 7 }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Days of the month */}
            {daysInMonth.map((day) => {
              const workout = getWorkoutForDate(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isCurrentDay = isToday(day);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => {
                    console.log('Calendar date clicked:', format(day, 'yyyy-MM-dd'));
                    handleDateClick(day);
                  }}
                  className={`aspect-square border rounded-lg p-1 text-center transition-colors bg-gray-800/50 cursor-pointer ${
                    isSelected
                      ? 'border-green-500 bg-green-500/20'
                      : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800'
                  } ${isCurrentDay ? 'ring-1 ring-green-500' : ''} ${workout ? 'border-green-500/50' : ''}`}
                >
                  <div className={`text-xs font-semibold ${isCurrentDay ? 'text-green-500' : 'text-white'}`}>
                    {format(day, 'd')}
                  </div>
                  {workout && (
                    <div className="mt-0.5 text-[10px] text-green-500 font-medium truncate px-0.5">
                      {workout.name}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
            </div>
          </div>
        </main>

        {/* Workout Selector Modal - Choose from library or create new */}
        {showWorkoutSelector && selectedDate ? (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]" 
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowWorkoutSelector(false);
                setSelectedDate(null);
              }
            }}
          >
            <div 
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Schedule Workout for {format(selectedDate, 'MMMM d, yyyy')}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Select from library or create new</p>
                </div>
                <button
                  onClick={() => {
                    setShowWorkoutSelector(false);
                    setSelectedDate(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-4 mb-6 border-b border-gray-800">
                <button
                  onClick={() => setWorkoutMode('select')}
                  className={`pb-3 px-4 font-medium transition-colors ${
                    workoutMode === 'select'
                      ? 'text-green-500 border-b-2 border-green-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Select from Library
                </button>
                <button
                  onClick={() => setWorkoutMode('create')}
                  className={`pb-3 px-4 font-medium transition-colors ${
                    workoutMode === 'create'
                      ? 'text-green-500 border-b-2 border-green-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Create New
                </button>
              </div>

              {workoutMode === 'select' ? (
                <div>
                  <div className="mb-4">
                    <input
                      type="text"
                      value={librarySearchQuery}
                      onChange={(e) => setLibrarySearchQuery(e.target.value)}
                      placeholder="Search workouts..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                    />
                  </div>
                  {/* Filter buttons */}
                  <div className="mb-4 flex gap-2 flex-wrap">
                    <button
                      onClick={() => setLibraryFilterType('all')}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        libraryFilterType === 'all'
                          ? 'bg-green-500 text-black'
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setLibraryFilterType('warmup')}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        libraryFilterType === 'warmup'
                          ? 'bg-green-500 text-black'
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      Warm-ups
                    </button>
                    <button
                      onClick={() => setLibraryFilterType('main')}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        libraryFilterType === 'main'
                          ? 'bg-green-500 text-black'
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      Workouts
                    </button>
                    <button
                      onClick={() => setLibraryFilterType('accessory')}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        libraryFilterType === 'accessory'
                          ? 'bg-green-500 text-black'
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      Accessories
                    </button>
                    <button
                      onClick={() => setLibraryFilterType('cooldown')}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        libraryFilterType === 'cooldown'
                          ? 'bg-green-500 text-black'
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      Cool-downs
                    </button>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {workoutLibrary
                      .filter((workout) => {
                        const matchesSearch =
                          workout.name.toLowerCase().includes(librarySearchQuery.toLowerCase()) ||
                          workout.description.toLowerCase().includes(librarySearchQuery.toLowerCase());
                        const matchesFilter = libraryFilterType === 'all' || workout.type === libraryFilterType;
                        return matchesSearch && matchesFilter;
                      })
                      .length > 0 ? (
                      workoutLibrary
                        .filter((workout) => {
                          const matchesSearch =
                            workout.name.toLowerCase().includes(librarySearchQuery.toLowerCase()) ||
                            workout.description.toLowerCase().includes(librarySearchQuery.toLowerCase());
                          const matchesFilter = libraryFilterType === 'all' || workout.type === libraryFilterType;
                          return matchesSearch && matchesFilter;
                        })
                        .map((workout) => {
                          const typeColors = {
                            warmup: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                            main: 'bg-green-500/20 text-green-400 border-green-500/30',
                            accessory: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
                            cooldown: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
                          };

                          return (
                            <button
                              key={workout.id}
                              onClick={() => handleSelectFromLibrary(workout.id)}
                              className="w-full text-left bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-colors"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-white">{workout.name}</h4>
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${typeColors[workout.type as keyof typeof typeColors]}`}>
                                      {workout.type === 'main' ? 'Workout' : workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-400">{workout.description}</p>
                                </div>
                                <span className="text-green-500 ml-4">→</span>
                              </div>
                            </button>
                          );
                        })
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-400 mb-4">No workouts found</p>
                        <button
                          onClick={() => setWorkoutMode('create')}
                          className="text-sm text-green-500 hover:text-green-400"
                        >
                          Create a new workout instead →
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <Link
                      href="/workouts"
                      className="text-sm text-gray-400 hover:text-green-500"
                    >
                      View all workouts in library →
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-400 mb-6">
                    Create a new workout from scratch and schedule it to this date.
                  </p>
                  <button
                    onClick={handleCreateNew}
                    className="w-full px-4 py-3 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-colors"
                  >
                    Create New Workout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* Workout Details Modal - View/Edit existing scheduled workout */}
        {showWorkoutModal && selectedDate && getWorkoutForDate(selectedDate) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]" onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowWorkoutModal(false);
              setSelectedDate(null);
            }
          }}>
            <div 
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {format(selectedDate, 'MMMM d, yyyy')}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Workout: {getWorkoutForDate(selectedDate)?.name}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowWorkoutModal(false);
                    setSelectedDate(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/workouts/${getWorkoutForDate(selectedDate)?.id}/edit`}
                  className="block w-full px-4 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 text-center transition-colors"
                >
                  Edit Workout
                </Link>
                <button
                  onClick={() => {
                    // Remove workout logic - API call in production
                    console.log('Removing workout from', format(selectedDate, 'yyyy-MM-dd'));
                    setShowWorkoutModal(false);
                    setSelectedDate(null);
                  }}
                  className="block w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Remove from Calendar
                </button>
                <button
                  onClick={() => {
                    setShowWorkoutModal(false);
                    setShowWorkoutSelector(true);
                  }}
                  className="block w-full px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                >
                  Change Workout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProgrammingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">Loading...</div>}>
      <ProgrammingCalendar />
    </Suspense>
  );
}

