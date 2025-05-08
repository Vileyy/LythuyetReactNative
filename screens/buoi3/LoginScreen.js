import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowinformation = () => {
    if (email && password) {
      Alert.alert(
        "Thông tin đăng nhập",
        `Email: ${email}\nPassword: ${password}`,
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Lỗi",
        "Vui lòng nhập Email và password",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handleLogin = async () => {
    let newErrors = {};

    if (!email) {
      newErrors.email = "Vui lòng nhập email của bạn";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Hiển thị thông báo Toast và tắt loading
        setLoading(false);
        ToastAndroid.showWithGravityAndOffset(
          "Đăng nhập thành công!",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          100
        );

        setTimeout(() => {
          navigation.navigate("TodoApp");
        }, 800);
      } catch (error) {
        setLoading(false);
        let errorMessage = "Đăng nhập thất bại";
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          errorMessage = "Email hoặc mật khẩu không đúng";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Email không hợp lệ";
        }
        Alert.alert("Lỗi", errorMessage);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/Fire.jpg")} style={styles.logo} />
        <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
          {" "}
          Welcome back my app !
        </Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.title}>Đăng nhập</Text>

        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
          activeOutlineColor={colors.primary}
          error={!!errors.email}
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          label="Mật khẩu"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.input}
          activeOutlineColor={colors.primary}
          error={!!errors.password}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
              color={colors.primary}
            />
          }
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Đăng nhập</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>Tạo tài khoản mới</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: "#f5f5f5",
    marginTop: 90,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
    color: "#333",
  },
  input: {
    marginBottom: 5,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "orange",
    fontSize: 14,
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  footerText: {
    color: "black",
    fontSize: 15,
  },
  registerText: {
    color: "orange",
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    opacity: 0.7,
  },
});

export default LoginScreen;
