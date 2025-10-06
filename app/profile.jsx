import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const user = auth.currentUser;
  const [photo, setPhoto] = useState(
    user?.photoURL || "https://cdn-icons-png.flaticon.com/512/847/847969.png"
  );

  // --- Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Logged out", "You have been signed out.");
      router.replace("/login");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  // --- Choose image from gallery
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission denied", "Please allow gallery access to upload a photo.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setPhoto(selectedImage);
      updateFirebasePhoto(selectedImage);
    }
  };

  // --- Update photo in Firebase
  const updateFirebasePhoto = async (photoURL) => {
    try {
      await updateProfile(auth.currentUser, { photoURL });
      Alert.alert("Profile updated", "Your profile photo has been changed!");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  // --- Inbox button handler
  const handleInbox = () => {
    router.push("/inbox");
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No user logged in</Text>
        <Button title="Go to Login" onPress={() => router.push("/login")} />
        <Button title="Back to Home" onPress={() => router.push("/home")} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: photo }} style={styles.profileImage} />
      </TouchableOpacity>
      <Text style={styles.changeText}>Tap photo to change</Text>

      <Text style={styles.title}>Profile</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      <Text style={styles.info}>UID: {user.uid}</Text>

      <View style={{ height: 20 }} />
      <Button title="Logout" onPress={logout} />
      <View style={{ height: 10 }} />
      <Button title="Back to Home" onPress={() => router.push("/home")} />
      <View style={{ height: 10 }} />
      <Button title="Inbox" onPress={handleInbox} color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  changeText: {
    color: "#007AFF",
    fontSize: 14,
    marginTop: 6,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  info: {
    fontSize: 16,
    marginBottom: 6,
  },
});
