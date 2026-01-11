'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface Exercise {
  id: string;
  name: string;
  category: string;
}

interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exerciseName: string;
  reps?: number;
  sets?: number;
  weightMen?: number;
  weightWomen?: number;
  duration?: number;
  distance?: number;
  calories?: number;
  kpi?: string;
  coachNotes?: string;
  order: number;
}

interface Section {
  id: string;
  name: string;
  type: 'warmup' | 'main' | 'cooldown' | 'accessory';
  workoutType?: 'for-quality' | 'for-time' | 'amrap' | 'emom' | 'chipper' | 'other';
  restInterval?: number; // in seconds, only for 'for-quality'
  exercises: WorkoutExercise[];
}

export default function NewWorkoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateFromUrl = searchParams.get('date');

  const [workoutName, setWorkoutName] = useState('');
  const [workoutDate, setWorkoutDate] = useState(dateFromUrl || '');
  const [description, setDescription] = useState('');
  const [coachNotes, setCoachNotes] = useState('');
  const [videoInputType, setVideoInputType] = useState<'upload' | 'link'>('upload');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [sections, setSections] = useState<Section[]>([
    { id: '1', name: 'Warm-up', type: 'warmup', exercises: [] },
  ]);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [availableExercises] = useState<Exercise[]>([
    { id: '1', name: 'Barbell Back Squat', category: 'strength' },
    { id: '2', name: 'Deadlift', category: 'strength' },
    { id: '3', name: 'Bench Press', category: 'strength' },
    { id: '4', name: 'Pull-ups', category: 'gymnastics' },
    { id: '5', name: 'Thrusters', category: 'strength' },
    { id: '6', name: 'Burpees', category: 'cardio' },
    { id: '7', name: 'Running', category: 'cardio' },
    { id: '8', name: 'Rowing', category: 'cardio' },
  ]);
  const [newExercise, setNewExercise] = useState<Partial<WorkoutExercise>>({
    exerciseId: '',
    reps: undefined,
    sets: undefined,
    weightMen: undefined,
    weightWomen: undefined,
    duration: undefined,
    distance: undefined,
    calories: undefined,
    kpi: '',
    coachNotes: '',
  });

  useEffect(() => {
    if (dateFromUrl) {
      setWorkoutDate(dateFromUrl);
    }
  }, [dateFromUrl]);

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        id: Date.now().toString(),
        name: 'New Section',
        type: 'main',
        workoutType: 'for-time',
        exercises: [],
      },
    ]);
  };

  const handleAddExercise = (sectionId: string) => {
    setSelectedSectionId(sectionId);
      setNewExercise({
        exerciseId: '',
        reps: undefined,
        sets: undefined,
        weightMen: undefined,
        weightWomen: undefined,
        duration: undefined,
        distance: undefined,
        calories: undefined,
        kpi: '',
        coachNotes: '',
      });
    setShowExerciseModal(true);
  };

  const handleSaveExercise = () => {
    if (!selectedSectionId || !newExercise.exerciseId) return;

    const selectedExercise = availableExercises.find((e) => e.id === newExercise.exerciseId);
    if (!selectedExercise) return;

    const exerciseToAdd: WorkoutExercise = {
      id: Date.now().toString(),
      exerciseId: newExercise.exerciseId,
      exerciseName: selectedExercise.name,
      reps: newExercise.reps,
      sets: newExercise.sets,
      weightMen: newExercise.weightMen,
      weightWomen: newExercise.weightWomen,
      duration: newExercise.duration,
      distance: newExercise.distance,
      calories: newExercise.calories,
      kpi: newExercise.kpi,
      coachNotes: newExercise.coachNotes,
      order: sections.find((s) => s.id === selectedSectionId)?.exercises.length || 0,
    };

    setSections(
      sections.map((section) =>
        section.id === selectedSectionId
          ? { ...section, exercises: [...section.exercises, exerciseToAdd] }
          : section
      )
    );

    setShowExerciseModal(false);
    setSelectedSectionId(null);
  };

  const handleRemoveExercise = (sectionId: string, exerciseId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              exercises: section.exercises.filter((e) => e.id !== exerciseId),
            }
          : section
      )
    );
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    // Determine workout type based on sections
    const hasMain = sections.some((s) => s.type === 'main');
    const hasWarmup = sections.some((s) => s.type === 'warmup');
    const hasAccessory = sections.some((s) => s.type === 'accessory');
    const hasCooldown = sections.some((s) => s.type === 'cooldown');
    
    // If only one section type, save as that type; otherwise save as 'main'
    let workoutType: 'warmup' | 'main' | 'accessory' | 'cooldown' = 'main';
    if (sections.length === 1) {
      workoutType = sections[0].type as 'warmup' | 'main' | 'accessory' | 'cooldown';
    } else if (hasMain) {
      workoutType = 'main';
    } else if (hasWarmup && !hasMain) {
      workoutType = 'warmup';
    } else if (hasAccessory && !hasMain && !hasWarmup) {
      workoutType = 'accessory';
    } else if (hasCooldown && !hasMain && !hasWarmup && !hasAccessory) {
      workoutType = 'cooldown';
    }

    // Save workout to library and optionally schedule to date
    const workoutData = {
      name: workoutName,
      date: workoutDate,
      description,
      coachNotes,
      videoUrl: videoInputType === 'link' ? videoUrl : null,
      videoFile: videoInputType === 'upload' ? videoFile : null,
      sections,
      type: workoutType,
      sectionTypes: sections.map((s) => s.type),
    };
    
    console.log('Saving workout to library...', workoutData);
    
    // In production: API call to save workout
    // If workoutDate is set, also schedule it to that date
    
    // Redirect based on where they came from
    if (workoutDate) {
      // If they came from calendar, go back to calendar
      router.push('/programming');
    } else {
      // Otherwise go to workout library
      router.push('/workouts');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Create New Workout</h2>
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
            <label className="block text-sm font-medium mb-2 text-gray-300">Workout Name</label>
            <input
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
              placeholder="e.g., Fran, Murph, etc."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <label className="block text-sm font-medium mb-2 text-gray-300">Date</label>
              <input
                type="date"
                value={workoutDate}
                onChange={(e) => setWorkoutDate(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-green-500"
              />
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
              placeholder="Workout description..."
            />
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <label className="block text-sm font-medium mb-2 text-gray-300">Coach Notes</label>
            <textarea
              value={coachNotes}
              onChange={(e) => setCoachNotes(e.target.value)}
              rows={4}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
              placeholder="Add coaching notes, tips, cues, or instructions for this workout..."
            />
            <p className="text-xs text-gray-500 mt-2">
              These notes will be visible to athletes
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <label className="block text-sm font-medium mb-2 text-gray-300">Workout Video</label>
            
            {/* Toggle between Upload and Link */}
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={() => {
                  setVideoInputType('upload');
                  setVideoUrl('');
                }}
                className={`px-4 py-2 rounded font-medium ${
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
                className={`px-4 py-2 rounded font-medium ${
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
                  onChange={handleVideoChange}
                  className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white mb-2"
                />
                {videoPreview && (
                  <div className="mt-2">
                    <video src={videoPreview} controls className="max-w-md rounded" />
                    <p className="text-sm text-gray-400 mt-2">
                      {videoFile?.name} ({(videoFile?.size || 0) / 1000000} MB)
                    </p>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Upload a video file explaining this workout
                </p>
              </>
            ) : (
              <>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white mb-2"
                  placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                />
                {videoUrl && (
                  <div className="mt-2">
                    <div className="bg-gray-800 border border-gray-700 rounded p-3">
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
                <p className="text-xs text-gray-500 mt-1">
                  Paste a link to a video (YouTube, Vimeo, or direct video URL)
                </p>
              </>
            )}
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-300">Sections</label>
              <button
                onClick={handleAddSection}
                className="px-4 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-colors"
              >
                + Add Section
              </button>
            </div>

            {sections.map((section) => (
              <div
                key={section.id}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-4"
              >
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Section Name</label>
                    <input
                      type="text"
                      value={section.name}
                      onChange={(e) => {
                        setSections(
                          sections.map((s) =>
                            s.id === section.id ? { ...s, name: e.target.value } : s
                          )
                        );
                      }}
                      className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Section Type</label>
                    <select
                      value={section.type}
                      onChange={(e) => {
                        setSections(
                          sections.map((s) =>
                            s.id === section.id
                              ? { ...s, type: e.target.value as 'warmup' | 'main' | 'cooldown' | 'accessory' }
                              : s
                          )
                        );
                      }}
                      className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
                    >
                      <option value="warmup">Warm-up</option>
                      <option value="main">Main</option>
                      <option value="accessory">Accessory</option>
                      <option value="cooldown">Cooldown</option>
                    </select>
                  </div>
                </div>

                {section.type === 'main' && (
                  <>
                    <div className="mb-4">
                      <label className="block text-xs text-gray-400 mb-1">Workout Type</label>
                      <select
                        value={section.workoutType || 'for-time'}
                        onChange={(e) => {
                          setSections(
                            sections.map((s) =>
                              s.id === section.id
                                ? {
                                    ...s,
                                    workoutType: e.target.value as
                                      | 'for-quality'
                                      | 'for-time'
                                      | 'amrap'
                                      | 'emom'
                                      | 'chipper'
                                      | 'other',
                                    // Clear rest interval if not for-quality
                                    restInterval: e.target.value === 'for-quality' ? s.restInterval : undefined,
                                  }
                                : s
                            )
                          );
                        }}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
                      >
                        <option value="for-quality">For Quality</option>
                        <option value="for-time">For Time</option>
                        <option value="amrap">AMRAP (As Many Rounds As Possible)</option>
                        <option value="emom">EMOM (Every Minute On the Minute)</option>
                        <option value="chipper">Chipper</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {section.workoutType === 'for-quality' && (
                      <div className="mb-4">
                        <label className="block text-xs text-gray-400 mb-1">
                          Rest Interval (seconds)
                        </label>
                        <input
                          type="number"
                          value={section.restInterval || ''}
                          onChange={(e) => {
                            setSections(
                              sections.map((s) =>
                                s.id === section.id
                                  ? {
                                      ...s,
                                      restInterval: parseInt(e.target.value) || undefined,
                                    }
                                  : s
                              )
                            );
                          }}
                          className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
                          placeholder="e.g., 90 (rest 90 seconds between sets)"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Rest time between sets/reps for this quality workout
                        </p>
                      </div>
                    )}
                  </>
                )}

                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Exercises ({section.exercises.length})</h4>
                  {section.exercises.length > 0 ? (
                    <div className="space-y-2">
                      {section.exercises.map((exercise) => (
                        <div
                          key={exercise.id}
                          className="bg-gray-900 border border-gray-700 rounded p-3 flex justify-between items-start"
                        >
                          <div className="flex-1">
                            <div className="font-semibold text-green-500">{exercise.exerciseName}</div>
                            <div className="text-xs text-gray-400 mt-1">
                              {exercise.sets && exercise.reps && (
                                <span>{exercise.sets} sets × {exercise.reps} reps</span>
                              )}
                              {exercise.weightMen && exercise.weightWomen && (
                                <span className="ml-2">
                                  Men: {exercise.weightMen}lbs | Women: {exercise.weightWomen}lbs
                                </span>
                              )}
                              {exercise.duration && <span className="ml-2">{exercise.duration}s</span>}
                              {exercise.distance && <span className="ml-2">{exercise.distance}m</span>}
                              {exercise.kpi && <span className="ml-2">KPI: {exercise.kpi}</span>}
                            </div>
                            {exercise.coachNotes && (
                              <div className="text-xs text-gray-500 mt-2 italic border-l-2 border-green-500 pl-2">
                                💡 {exercise.coachNotes}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => handleRemoveExercise(section.id, exercise.id)}
                            className="text-red-400 hover:text-red-300 ml-2"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No exercises added yet</p>
                  )}
                </div>

                <button
                  onClick={() => handleAddExercise(section.id)}
                  className="w-full px-4 py-2 bg-green-500 text-black font-semibold rounded hover:bg-green-400"
                >
                  + Add Exercise
                </button>
              </div>
            ))}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-colors"
            >
              Save Workout
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

      {/* Exercise Modal */}
      {showExerciseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add Exercise</h3>
              <button
                onClick={() => setShowExerciseModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Exercise</label>
                <select
                  value={newExercise.exerciseId}
                  onChange={(e) => setNewExercise({ ...newExercise, exerciseId: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                >
                  <option value="">Select an exercise</option>
                  {availableExercises.map((exercise) => (
                    <option key={exercise.id} value={exercise.id}>
                      {exercise.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Sets</label>
                  <input
                    type="number"
                    value={newExercise.sets || ''}
                    onChange={(e) =>
                      setNewExercise({ ...newExercise, sets: parseInt(e.target.value) || undefined })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                    placeholder="e.g., 3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Reps</label>
                  <input
                    type="number"
                    value={newExercise.reps || ''}
                    onChange={(e) =>
                      setNewExercise({ ...newExercise, reps: parseInt(e.target.value) || undefined })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                    placeholder="e.g., 10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Weight (Men) lbs</label>
                  <input
                    type="number"
                    value={newExercise.weightMen || ''}
                    onChange={(e) =>
                      setNewExercise({
                        ...newExercise,
                        weightMen: parseFloat(e.target.value) || undefined,
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                    placeholder="e.g., 95"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Weight (Women) lbs</label>
                  <input
                    type="number"
                    value={newExercise.weightWomen || ''}
                    onChange={(e) =>
                      setNewExercise({
                        ...newExercise,
                        weightWomen: parseFloat(e.target.value) || undefined,
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                    placeholder="e.g., 65"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (seconds)</label>
                  <input
                    type="number"
                    value={newExercise.duration || ''}
                    onChange={(e) =>
                      setNewExercise({
                        ...newExercise,
                        duration: parseInt(e.target.value) || undefined,
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                    placeholder="e.g., 60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Distance (meters)</label>
                  <input
                    type="number"
                    value={newExercise.distance || ''}
                    onChange={(e) =>
                      setNewExercise({
                        ...newExercise,
                        distance: parseFloat(e.target.value) || undefined,
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                    placeholder="e.g., 400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">KPI (Key Performance Indicator)</label>
                <input
                  type="text"
                  value={newExercise.kpi || ''}
                  onChange={(e) => setNewExercise({ ...newExercise, kpi: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                  placeholder="e.g., Time, Total Weight, Rounds"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Coach Notes</label>
                <textarea
                  value={newExercise.coachNotes || ''}
                  onChange={(e) => setNewExercise({ ...newExercise, coachNotes: e.target.value })}
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                  placeholder="Add coaching cues, tips, or notes for this exercise..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  These notes will be visible to athletes when they view this exercise
                </p>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSaveExercise}
                  disabled={!newExercise.exerciseId}
                  className="flex-1 px-4 py-2 bg-green-500 text-black font-semibold rounded hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Exercise
                </button>
                <button
                  onClick={() => setShowExerciseModal(false)}
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

