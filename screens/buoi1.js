import React, { useState } from "react";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Cat = ({ name }) => {
  const [isHungry, setIsHungry] = useState(true);

  return (
    <View style={styles.catContainer}>
      <Text style={styles.catText}>
        I am <Text style={styles.catName}>{name}</Text>, and I am{" "}
        <Text style={styles.catStatus}>{isHungry ? "hungry" : "full"}</Text>!
      </Text>
      <TouchableOpacity
        style={[styles.button, !isHungry && styles.buttonDisabled]}
        onPress={() => setIsHungry(false)}
        disabled={!isHungry}
      >
        <Text style={styles.buttonText}>
          {isHungry ? "Pour me some milk, please!" : "Thank you!"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Cafe = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐱 Bài tập về nhà buổi 1 môn phát triển đa nền tảng ☕</Text>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
      <Cat name="Viley" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "orange",
  },
  catContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
    alignItems: "center",
    width: "90%",
  },
  catText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  catName: {
    fontWeight: "bold",
    color: "#FF5733",
  },
  catStatus: {
    fontWeight: "bold",
    color: "#008000",
  },
});

export default Cafe;
