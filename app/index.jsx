import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("⚠️ Please enter email and password");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Welcome to Carnaza Island Info!");
      router.replace("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.ibb.co/vYFdnVd/la-manok.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.logo}>🏝 Carnaza Island Info</Text>
        <Text style={styles.caption}>
          Discover paradise, {"\n"}your island adventure begins here.
        </Text>

        <View style={styles.card}>
          <Text style={styles.title}>Log In</Text>
          <Text style={styles.subtitle}>Welcome back, traveler 🌊</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
            textContentType="password"
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>🌴 Log In</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Don’t have an account?{" "}
            <Link href="/signup" style={styles.signupLink}>
              Sign Up
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  logo: {
    fontSize: 36,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
    marginBottom: 6,
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  caption: {
    color: "#eee",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0d6155",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f7f9fa",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#333",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#21cc8d",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#21cc8d",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  footerText: {
    textAlign: "center",
    color: "#444",
    fontSize: 15,
  },
  signupLink: {
    color: "#21cc8d",
    fontWeight: "700",
  },
});

export default Login;
//