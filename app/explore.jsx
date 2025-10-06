import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const exploreData = {
  island1: {
    name: "Eco Park",
    description: "Carnaza Eco Park is a private resort located on Carnaza Island in Daanbantayan, Cebu, known for its pristine white sand beaches and clear waters, offering activities like swimming, snorkeling, and camping. Access involves taking a bus to Tapilon Port in Daanbantayan, followed by a 2-3 hour boat ride to the island. The park has an entrance fee, and visitors can also find accommodations like air-conditioned rooms, non-air-conditioned rooms, and tent spaces.  ",
    image: require("../assets/images/island1.jpg"),
  },
  island2: {
    name: "Lamanok",
    description: "Lamanok is a small islet or a group of islets near Carnaza Island in northern Cebu, Philippines, often visited together with Carnaza during island-hopping tours. While Carnaza is known for its beaches and activities like exploring the Eco-Park, Lamanok is recognized for its unique rock formations, providing additional picturesque scenery for visitors to explore and photograph.",
    image: require("../assets/images/island2.jpg"),
  },
  island3: {
    name: "Skull Cove",
    description: "Skull Cove in Carnaza Island, Daanbantayan, Cebu is a tourist spot within Carnaza Eco-Park, known for the historical presence of human remains, possibly from the Second World War or ancient times. Visitors can see the cave containing the skulls, enjoy the clear, emerald-green waters of the cove, visit the nearby helipad, and go swimming or snorkeling. ",
    image: require("../assets/images/island3.jpg"),
  },
  island4: {
    name: "Silangga",
    description: "Island Four has stunning cliffs and ocean views.",
    image: require("../assets/images/island4.jpg"),
  },
  island5: {
    name: "Kailina Beach",
    description: "A peaceful island perfect for swimming and snorkeling.",
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
