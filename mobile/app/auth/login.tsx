import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, signInWithGoogle, signInWithApple, signInWithFacebook } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      router.replace('/(tabs)/today');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.replace('/(tabs)/today');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign in with Google');
    }
  };

  const handleAppleLogin = async () => {
    try {
      await signInWithApple();
      router.replace('/(tabs)/today');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign in with Apple');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithFacebook();
      router.replace('/(tabs)/today');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign in with Facebook');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Protocol</Text>
        <Text style={styles.subtitle}>CrossFit Training</Text>
      </View>

      <View style={styles.form}>
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
          style={styles.loginButton}
          onPress={handleEmailLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={handleAppleLogin}>
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
          <Text style={styles.socialButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpLink}
          onPress={() => router.push('/auth/signup')}
        >
          <Text style={styles.signUpLinkText}>
            Don't have an account? <Text style={styles.signUpLinkBold}>Sign Up</Text>
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
  loginButton: {
    backgroundColor: Colors.green,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
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
  signUpLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  signUpLinkText: {
    fontSize: 14,
    color: Colors.gray400,
  },
  signUpLinkBold: {
    color: Colors.green,
    fontWeight: 'bold',
  },
});

