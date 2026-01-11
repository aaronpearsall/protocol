import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useState } from 'react';
import { Colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';

export default function TodayScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  // Mock workout data - replace with API call
  const workouts = {
    [selectedDate]: {
      name: 'Fran',
      description: '21-15-9\nThrusters (95/65)\nPull-ups',
      sections: [
        { name: 'Warm-up', type: 'warmup' },
        { name: 'Main Workout', type: 'main' },
      ],
    },
  };

  const workout = workouts[selectedDate];

  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: Colors.green,
      marked: true,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today</Text>
      </View>

      <ScrollView style={styles.content}>
        <Calendar
          current={selectedDate}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          theme={{
            backgroundColor: Colors.black,
            calendarBackground: Colors.black,
            textSectionTitleColor: Colors.white,
            selectedDayBackgroundColor: Colors.green,
            selectedDayTextColor: Colors.black,
            todayTextColor: Colors.green,
            dayTextColor: Colors.white,
            textDisabledColor: Colors.gray600,
            arrowColor: Colors.green,
            monthTextColor: Colors.white,
            textDayFontWeight: '500',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '600',
          }}
        />

        {workout ? (
          <View style={styles.workoutCard}>
            <Text style={styles.workoutName}>{workout.name}</Text>
            <Text style={styles.workoutDescription}>{workout.description}</Text>
            
            <View style={styles.sections}>
              {workout.sections.map((section, index) => (
                <View key={index} style={styles.section}>
                  <Text style={styles.sectionName}>{section.name}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.previewButton}
              onPress={() => router.push(`/workout/${selectedDate}`)}
            >
              <Text style={styles.previewButtonText}>Preview Workout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.startButton}
              onPress={() => router.push(`/workout/${selectedDate}?start=true`)}
            >
              <Text style={styles.startButtonText}>Start Workout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.noWorkout}>
            <Text style={styles.noWorkoutText}>No workout scheduled for this date</Text>
          </View>
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
  content: {
    flex: 1,
  },
  workoutCard: {
    margin: 20,
    padding: 20,
    backgroundColor: Colors.gray900,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray800,
  },
  workoutName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8,
  },
  workoutDescription: {
    fontSize: 16,
    color: Colors.gray300,
    marginBottom: 16,
    lineHeight: 24,
  },
  sections: {
    marginBottom: 20,
  },
  section: {
    padding: 12,
    backgroundColor: Colors.gray800,
    borderRadius: 8,
    marginBottom: 8,
  },
  sectionName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.green,
  },
  previewButton: {
    padding: 16,
    backgroundColor: Colors.gray800,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  previewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  startButton: {
    padding: 16,
    backgroundColor: Colors.green,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  noWorkout: {
    margin: 20,
    padding: 40,
    alignItems: 'center',
  },
  noWorkoutText: {
    fontSize: 16,
    color: Colors.gray500,
  },
});

