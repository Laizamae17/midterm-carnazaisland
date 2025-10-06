import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Create = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!message.trim()) {
      Alert.alert("Empty message", "Please enter a message before sending.");
      return;
    }

    try {
      const existing = await AsyncStorage.getItem("inbox");
      const inbox = existing ? JSON.parse(existing) : [];

      const newMessage = {
        id: Date.now().toString() + Math.random().toString(36).slice(2), // stable unique id
        text: message.trim(),
        date: new Date().toLocaleString(),
      };

      const updatedInbox = [newMessage, ...inbox];
      await AsyncStorage.setItem("inbox", JSON.stringify(updatedInbox));

      setMessage("");
      Keyboard.dismiss();
      router.push("/inbox");
    } catch (error) {
      console.error("Failed saving message:", error);
      Alert.alert("Error", "Failed to save your message.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Message here for more info</Text>

      <TextInput
        style={styles.input}
        placeholder="What do you want to ask?"
        value={message}
        onChangeText={setMessage}
        placeholderTextColor="#888"
        multiline
      />

      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Add New Message</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 30,
    minHeight: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#21cc8d",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
//