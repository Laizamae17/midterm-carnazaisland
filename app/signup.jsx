import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link, useRouter } from "expo-router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert("⚠️ Error", "Please fill in all fields");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("🎉 Success", "Welcome to Carnaza Island Info!");
      router.replace("/login"); // go to home after signup
    } catch (error) {
      Alert.alert("Signup Failed", error.message);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.ibb.co/8mCTtC2/ka-elena.jpg", // Tropical background
      }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.logo}>🏝 Carnaza Island Info</Text>
        <Text style={styles.caption}>
          Begin your island adventure, {"\n"}sign up and explore paradise.
        </Text>

        <View style={styles.formCard}>
          <Text style={styles.title}>Create Your Account</Text>
          <Text style={styles.subtitle}>
            Already have an account?{" "}
            <Link href="/login" style={styles.loginLink}>
              Log In
            </Link>
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
            <Text style={styles.signupText}>🌴 Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)", // dark overlay for readability
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  caption: {
    color: "#eee",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  formCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0d6155",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  loginLink: { color: "#21cc8d", fontWeight: "bold" },
  input: {
    backgroundColor: "#F1F5F9",
    color: "#000",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  signupBtn: {
    backgroundColor: "#21cc8d",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  signupText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
//