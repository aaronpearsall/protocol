import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Colors } from '@/constants/colors';
import { useState } from 'react';
import { format } from 'date-fns';

export default function LogbookScreen() {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  // Mock logbook data - replace with API call
  const logbookEntries = [
    {
      id: '1',
      exerciseName: 'Barbell Back Squat',
      date: new Date('2024-01-15'),
      weight: 225,
      reps: 5,
      sets: 3,
    },
    {
      id: '2',
      exerciseName: 'Barbell Back Squat',
      date: new Date('2024-01-10'),
      weight: 215,
      reps: 5,
      sets: 3,
    },
    {
      id: '3',
      exerciseName: 'Deadlift',
      date: new Date('2024-01-12'),
      weight: 315,
      reps: 3,
      sets: 5,
    },
  ];

  const exercises = Array.from(new Set(logbookEntries.map((e) => e.exerciseName)));

  const filteredEntries = selectedExercise
    ? logbookEntries.filter((e) => e.exerciseName === selectedExercise)
    : logbookEntries;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Logbook</Text>
      </View>

      <View style={styles.filters}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterChip, !selectedExercise && styles.filterChipActive]}
            onPress={() => setSelectedExercise(null)}
          >
            <Text
              style={[
                styles.filterChipText,
                !selectedExercise && styles.filterChipTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {exercises.map((exercise) => (
            <TouchableOpacity
              key={exercise}
              style={[
                styles.filterChip,
                selectedExercise === exercise && styles.filterChipActive,
              ]}
              onPress={() => setSelectedExercise(exercise)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedExercise === exercise && styles.filterChipTextActive,
                ]}
              >
                {exercise}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryExerciseName}>{item.exerciseName}</Text>
              <Text style={styles.entryDate}>{format(item.date, 'MMM d, yyyy')}</Text>
            </View>
            <View style={styles.entryDetails}>
              {item.weight && (
                <Text style={styles.entryDetail}>
                  Weight: {item.weight}lbs
                </Text>
              )}
              {item.reps && (
                <Text style={styles.entryDetail}>
                  Reps: {item.reps}
                </Text>
              )}
              {item.sets && (
                <Text style={styles.entryDetail}>
                  Sets: {item.sets}
                </Text>
              )}
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.black,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
  },
  filters: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray800,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.gray900,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.gray800,
  },
  filterChipActive: {
    backgroundColor: Colors.green,
    borderColor: Colors.green,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray300,
  },
  filterChipTextActive: {
    color: Colors.black,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 20,
  },
  entryCard: {
    backgroundColor: Colors.gray900,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.gray800,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  entryExerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    flex: 1,
  },
  entryDate: {
    fontSize: 14,
    color: Colors.gray400,
  },
  entryDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  entryDetail: {
    fontSize: 14,
    color: Colors.green,
  },
});

