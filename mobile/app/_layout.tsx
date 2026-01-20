import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Protocol App</Text>
      <Text style={styles.subtext}>If you see this, React Native Web is working!</Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 20,
  },
  subtext: {
    fontSize: 18,
    color: Colors.green,
  },
});
