import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bài tập về nhà môn phát triển đa nền tảng
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("buoi1")}
      >
        <Text style={styles.text}>Bài tập buổi 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("buoi2")}
      >
        <Text style={styles.text}>Bài tập buổi 2</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.text}>Bài tập buổi 3</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("DrawerHome")}
      >
        <Text style={styles.text}>Bài tập buổi 4</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#6699FF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
});

export default HomeScreen;
