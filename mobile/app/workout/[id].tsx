import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Colors } from '@/constants/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import Clipboard from '@react-native-community/clipboard';

export default function WorkoutDetailScreen() {
  const { id, start } = useLocalSearchParams();
  const router = useRouter();
  const isActive = start === 'true';
  const [scores, setScores] = useState<Record<string, string>>({});

  // Mock workout data - replace with API call
  const workout = {
    name: 'Fran',
    description: '21-15-9\nThrusters (95/65)\nPull-ups',
    videoUrl: 'https://example.com/video',
    sections: [
      {
        id: '1',
        name: 'Warm-up',
        type: 'warmup',
        exercises: [
          {
            id: '1',
            name: 'Barbell Squat',
            reps: 10,
            sets: 3,
            weightMen: 135,
            weightWomen: 95,
            kpi: 'Weight × Reps',
            scalingOptions: [
              { name: 'Beginner', weight: 95 },
              { name: 'Intermediate', weight: 115 },
            ],
          },
        ],
      },
      {
        id: '2',
        name: 'Main Workout',
        type: 'main',
        exercises: [
          {
            id: '2',
            name: 'Thrusters',
            reps: 21,
            weightMen: 95,
            weightWomen: 65,
            kpi: 'Time',
            scalingOptions: [
              { name: 'Scaled', weight: 65 },
              { name: 'RX', weight: 95 },
            ],
          },
        ],
      },
    ],
  };

  const handleCopyWorkout = () => {
    const workoutText = `${workout.name}\n\n${workout.description}`;
    Clipboard.setString(workoutText);
    // Show toast notification
  };

  const handleViewHistory = (exerciseId: string) => {
    router.push(`/exercise-history/${exerciseId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCopyWorkout}>
          <Text style={styles.copyButton}>Copy</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.workoutHeader}>
          <Text style={styles.workoutName}>{workout.name}</Text>
          <Text style={styles.workoutDescription}>{workout.description}</Text>
        </View>

        {workout.sections.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionName}>{section.name}</Text>
            
            {section.exercises.map((exercise) => (
              <View key={exercise.id} style={styles.exerciseCard}>
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  {section.type !== 'warmup' && (
                    <TouchableOpacity
                      onPress={() => handleViewHistory(exercise.id)}
                      style={styles.historyButton}
                    >
                      <Text style={styles.historyButtonText}>History</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {(exercise.reps || exercise.sets) && (
                  <Text style={styles.exerciseDetails}>
                    {exercise.sets && `${exercise.sets} sets × `}
                    {exercise.reps && `${exercise.reps} reps`}
                  </Text>
                )}

                {(exercise.weightMen || exercise.weightWomen) && (
                  <Text style={styles.exerciseWeights}>
                    Men: {exercise.weightMen}lbs | Women: {exercise.weightWomen}lbs
                  </Text>
                )}

                {exercise.kpi && (
                  <Text style={styles.kpi}>KPI: {exercise.kpi}</Text>
                )}

                {exercise.scalingOptions && exercise.scalingOptions.length > 0 && (
                  <View style={styles.scalingOptions}>
                    <Text style={styles.scalingTitle}>Scaling Options:</Text>
                    {exercise.scalingOptions.map((option, index) => (
                      <Text key={index} style={styles.scalingOption}>
                        • {option.name}: {option.weight}lbs
                      </Text>
                    ))}
                  </View>
                )}

                {isActive && section.type !== 'warmup' && (
                  <View style={styles.scoreInput}>
                    <Text style={styles.scoreLabel}>Your Score:</Text>
                    <TextInput
                      style={styles.scoreInputField}
                      value={scores[exercise.id] || ''}
                      onChangeText={(text) => setScores({ ...scores, [exercise.id]: text })}
                      placeholder="Enter score"
                      placeholderTextColor={Colors.gray500}
                    />
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}

        {isActive && (
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Workout</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.black,
  },
  backButton: {
    fontSize: 16,
    color: Colors.green,
    fontWeight: '600',
  },
  copyButton: {
    fontSize: 16,
    color: Colors.green,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  workoutHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray800,
  },
  workoutName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8,
  },
  workoutDescription: {
    fontSize: 16,
    color: Colors.gray300,
    lineHeight: 24,
  },
  section: {
    padding: 20,
  },
  sectionName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.green,
    marginBottom: 16,
  },
  exerciseCard: {
    backgroundColor: Colors.gray900,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.gray800,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    flex: 1,
  },
  historyButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.gray800,
    borderRadius: 6,
  },
  historyButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.green,
  },
  exerciseDetails: {
    fontSize: 14,
    color: Colors.gray300,
    marginBottom: 4,
  },
  exerciseWeights: {
    fontSize: 14,
    color: Colors.green,
    marginBottom: 4,
  },
  kpi: {
    fontSize: 14,
    color: Colors.gray400,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  scalingOptions: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.gray800,
  },
  scalingTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.gray400,
    marginBottom: 4,
  },
  scalingOption: {
    fontSize: 14,
    color: Colors.gray300,
    marginBottom: 4,
  },
  scoreInput: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray800,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 8,
  },
  scoreInputField: {
    backgroundColor: Colors.gray800,
    borderRadius: 8,
    padding: 12,
    color: Colors.white,
    fontSize: 16,
  },
  saveButton: {
    margin: 20,
    padding: 16,
    backgroundColor: Colors.green,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
});

