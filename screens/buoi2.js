import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from "react-native";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    Alert.alert(
      "Thông tin đăng nhập",
      `Username: ${username}\nPassword: ${password}`,
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: false }
    );
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ImageBackground
      source={require("../assets/background_pokemon.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/logo_pokemon.jpg")}
            style={{
              width: "100%",
              height: 170,
              resizeMode: "cover",
              borderRadius: 10,
              marginBottom: 20,
            }}
          />
        </View>

        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 300,
    height: 470,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
    justifyContent: "center",
    resizeMode: "contain",
  },
  input: {
    width: 250,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    width: 250,
    height: 40,
    backgroundColor: "#6699FFb",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginBottom: 20,
  },
});

export default LoginScreen;
