import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export default function TodayScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Today Screen - Testing</Text>
      <Text style={styles.subtext}>If you see this, the app is working!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: Colors.green,
  },
});
