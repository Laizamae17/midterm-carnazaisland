import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router"; // 👈 This runs when screen is focused

export default function Inbox() {
  const [inboxMessages, setInboxMessages] = useState([]);

  // 🔄 Automatically load messages whenever this screen is opened or focused
  useFocusEffect(
    useCallback(() => {
      loadInbox();
    }, [])
  );

  const loadInbox = async () => {
    try {
      const saved = await AsyncStorage.getItem("inbox");
      if (saved) {
        let parsed = JSON.parse(saved);

        // Normalize messages (assign id if missing)
        let changed = false;
        parsed = parsed.map((m) => {
          if (!m.id) {
            changed = true;
            return {
              ...m,
              id: Date.now().toString() + Math.random().toString(36).slice(2),
            };
          }
          return m;
        });

        setInboxMessages(parsed);

        if (changed) {
          await AsyncStorage.setItem("inbox", JSON.stringify(parsed));
        }
      } else {
        setInboxMessages([]);
      }
    } catch (error) {
      console.error("❌ Failed loading inbox:", error);
    }
  };

  // 🗑️ Confirm then delete
  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Message",
      "Are you sure you want to delete this message?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteMessage(id) },
      ]
    );
  };

  const deleteMessage = async (id) => {
    try {
      const updated = inboxMessages.filter((m) => m.id !== id);
      setInboxMessages(updated);
      await AsyncStorage.setItem("inbox", JSON.stringify(updated));
      Alert.alert("Deleted", "Message removed successfully 💬");
    } catch (error) {
      console.error("❌ Failed deleting message:", error);
      Alert.alert("Error", "Failed to delete message.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📥 Inbox</Text>

      {inboxMessages.length === 0 ? (
        <Text style={styles.empty}>No messages yet 💌</Text>
      ) : (
        <ScrollView style={{ width: "100%" }}>
          {inboxMessages.map((msg) => (
            <View key={msg.id} style={styles.card}>
              <View style={styles.messageHeader}>
                <Text style={styles.message}>{msg.text}</Text>
                <TouchableOpacity onPress={() => confirmDelete(msg.id)}>
                  <Text style={styles.deleteText}>🗑️</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.date}>{msg.date}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 20,
  },
  empty: {
    fontSize: 16,
    color: "#555",
    marginTop: 50,
  },
  card: {
    backgroundColor: "#f0f9ff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#d0e7ff",
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  deleteText: {
    fontSize: 18,
    color: "red",
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginTop: 6,
  },
});
