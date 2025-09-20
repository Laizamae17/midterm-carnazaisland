import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";

const islands = [
  {
    id: "island1",
    name: "Eco Park",
    image: require("../assets/images/island1.jpg"),
  },
  {
    id: "island2",
    name: "Skull Cove",
    image: require("../assets/images/island2.jpg"),
  },
  {
    id: "island3",
    name: "Lamanok Island",
    image: require("../assets/images/island3.jpg"),
  },
  {
    id: "island4",
    name: "Silangga",
    image: require("../assets/images/island4.jpg"),
  },
  {
    id: "island5",
    name: "Kailina Beach",
    image: require("../assets/images/island5.jpg"),
  },
];

export default function IslandsScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Other Islands in Carnaza</Text>

      {islands.map((island) => (
        <View key={island.id} style={styles.card}>
          <Image source={island.image} style={styles.image} />
          <Text style={styles.name}>{island.name}</Text>

          {/* Explore Button */}
          <Pressable
            style={styles.exploreButton}
            onPress={() => router.push(`/explore?id=${island.id}`)}
          >
            <Text style={styles.exploreText}>Explore</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    marginBottom: 30,
    alignItems: "center",
  },
  image: {
    width: 320,
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#21cc8d",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  exploreButton: {
    backgroundColor: "#21cc8d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  exploreText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

//