import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      {/* Main content */}
      <View style={styles.container}>
        <Text style={styles.title}>Home Screen</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Detail")}
        >
          <Text style={styles.buttonText}>Go to Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "white",
    marginTop: 30,
  },
  menuButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6A5ACD",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 90,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
