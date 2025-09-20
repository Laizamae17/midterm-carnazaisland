import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const exploreData = {
  island1: {
    name: "Eco Park",
    description: "This is the first beautiful island in Carnaza.",
    image: require("../assets/images/island1.jpg"),
  },
  island2: {
    name: "Skull Cove",
    description: "Island Two is known for its white sand beaches.",
    image: require("../assets/images/island2.jpg"),
  },
  island3: {
    name: "Lamanok Island",
    description: "A peaceful island perfect for swimming and snorkeling.",
    image: require("../assets/images/island3.jpg"),
  },
  island4: {
    name: "Silangga",
    description: "Island Four has stunning cliffs and ocean views.",
    image: require("../assets/images/island4.jpg"),
  },
  island5: {
    name: "Kailina Beach",
    description: "This remote island is a secret gem of Carnaza.",
    image: require("../assets/images/island5.jpg"),
  },
};

export default function ExploreScreen() {
  const { id } = useLocalSearchParams(); // get island id from button press
  const router = useRouter();

  const island = exploreData[id]; // pick the right island data

  if (!island) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Island not found!</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={island.image} style={styles.image} />
      <Text style={styles.name}>{island.name}</Text>
      <Text style={styles.description}>{island.description}</Text>

      {/* Back Button */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 340,
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
  },
  error: {
    fontSize: 20,
    color: "red",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#21cc8d",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
//