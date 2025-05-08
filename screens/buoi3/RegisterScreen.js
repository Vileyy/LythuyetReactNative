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
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  // State for form fields and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    let newErrors = {};

    if (!email) {
      newErrors.email = "Vui lòng nhập email của bạn";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Validate password
    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);

    // If no errors, proceed with registration
    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Hiển thị thông báo và tắt loading
        setLoading(false);
        ToastAndroid.showWithGravityAndOffset(
          "Đăng ký thành công! Chuyển sang trang đăng nhập...",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          100
        );

        // Tự động chuyển sang màn hình Login sau 1.2 giây
        setTimeout(() => {
          navigation.navigate("Login");
        }, 1200);
      } catch (error) {
        setLoading(false);
        let errorMessage = "Đăng ký thất bại";
        if (error.code === "auth/email-already-in-use") {
          errorMessage = "Email này đã được sử dụng";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Email không hợp lệ";
        } else if (error.code === "auth/weak-password") {
          errorMessage = "Mật khẩu quá yếu";
        }
        Alert.alert("Lỗi", errorMessage);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/120" }}
          style={styles.logo}
        />
      </View>

      <View style={styles.formCard}>
        <Text style={styles.title}>Đăng ký</Text>

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
          disabled={loading}
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
          disabled={loading}
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

        <TextInput
          label="Xác nhận mật khẩu"
          mode="outlined"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          style={styles.input}
          activeOutlineColor={colors.primary}
          error={!!errors.confirmPassword}
          disabled={loading}
          right={
            <TextInput.Icon
              icon={showConfirmPassword ? "eye-off" : "eye"}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              color={colors.primary}
            />
          }
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Đăng ký</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>Đăng nhập ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
    marginBottom: 60,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
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
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
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
  button: {
    backgroundColor: "orange",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginTop: 15,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    opacity: 0.7,
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
    marginTop: 20,
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
  loginText: {
    color: "orange",
    fontSize: 14,
    fontWeight: "bold",
  },
});
