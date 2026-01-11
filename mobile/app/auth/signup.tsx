import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, signInWithGoogle, signInWithApple, signInWithFacebook } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, name);
      Alert.alert('Success', 'Account created! Please check your email to verify.');
      router.replace('/(tabs)/today');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      router.replace('/(tabs)/today');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign up with Google');
    }
  };

  const handleAppleSignUp = async () => {
    try {
      await signInWithApple();
      router.replace('/(tabs)/today');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign up with Apple');
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      await signInWithFacebook();
      router.replace('/(tabs)/today');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign up with Facebook');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Protocol</Text>
        <Text style={styles.subtitle}>Create Your Account</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor={Colors.gray500}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.gray500}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Colors.gray500}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleEmailSignUp}
          disabled={loading}
        >
          <Text style={styles.signUpButtonText}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignUp}>
          <Text style={styles.socialButtonText}>Sign up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignUp}>
          <Text style={styles.socialButtonText}>Sign up with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={handleFacebookSignUp}>
          <Text style={styles.socialButtonText}>Sign up with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.push('/auth/login')}
        >
          <Text style={styles.loginLinkText}>
            Already have an account? <Text style={styles.loginLinkBold}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.green,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.gray400,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: Colors.gray900,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: Colors.white,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.gray800,
  },
  signUpButton: {
    backgroundColor: Colors.green,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gray800,
  },
  dividerText: {
    marginHorizontal: 16,
    color: Colors.gray500,
    fontSize: 14,
  },
  socialButton: {
    backgroundColor: Colors.gray900,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.gray800,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
  },
  loginLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 14,
    color: Colors.gray400,
  },
  loginLinkBold: {
    color: Colors.green,
    fontWeight: 'bold',
  },
});

