import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

/*
  NEED TO ADD: registration, forgot pass, and navigation to home screen
*/
export default function LoginScreen() { //base login info/functions for testing 
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleLogin = () => {
  if (email === 'test@email.com' && password === '123456') {
    Alert.alert('Login Successful', 'You are logged in');
  } else {
    Alert.alert('Login failed', 'Invalid Email or Password');
  }
};

//UI
  return (
    <View style={styles.container}>
      {/* need logo */}
      <Text style={styles.appTitle}>ImmerseED</Text>
      <Text style={styles.subtitle}>
        Explore biology cells in augmented reality - a new dimension of learning.
        </Text>
      <Text style={styles.title}>Welcome Back</Text>

      <Text style={styles.subtitle}>
        Login to your account
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.signupText}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#0b0a3d",
  },

  appTitle: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  title: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#749bdb",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },

  loginButton: {
    height: 50,
    backgroundColor: "#579fbb",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  signupText: {
    textAlign: "center",
    color: "#749bdb",
    marginTop: 20,
    fontSize: 15,
  },
});