import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSendRequest = () => {
    // Reset messages
    setMessage(null);

    // Validate input
    if (!email) {
      setMessage("Vui lòng nhập email!");
      setIsError(true);
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Email không hợp lệ!");
      setIsError(true);
      return;
    }

    // Simulate API call
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setMessage(
        "Yêu cầu đặt lại mật khẩu đã được gửi! Vui lòng kiểm tra hộp thư của bạn."
      );
      setIsError(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/120" }}
            style={styles.logo}
          />
        </View>

        <View style={styles.formCard}>
          <Text style={styles.title}>Quên mật khẩu</Text>

          <Text style={styles.subtitle}>
            {isSent
              ? "Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn."
              : "Nhập email của bạn để nhận liên kết đặt lại mật khẩu."}
          </Text>

          {!isSent && (
            <>
              <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
                autoCapitalize="none"
                activeOutlineColor="#4CAF50"
                error={isError}
                disabled={isLoading}
                left={<TextInput.Icon icon="email" color="orange" />}
              />

              {message && (
                <Text
                  style={[
                    styles.message,
                    { color: isError ? "#FF3B30" : "#4CAF50" },
                  ]}
                >
                  {isError ? "⚠️ " : "✅ "}
                  {message}
                </Text>
              )}

              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleSendRequest}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? "Đang xử lý..." : "Gửi yêu cầu"}
                </Text>
              </TouchableOpacity>
            </>
          )}

          {isSent && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Quay lại đăng nhập</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.footerText}>Quay lại đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
    marginBottom: 40,
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
    lineHeight: 22,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  message: {
    fontSize: 14,
    marginBottom: 16,
    paddingHorizontal: 5,
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#A5D6A7", // Lighter green
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    color: "orange",
    fontSize: 16,
    fontWeight: "500",
  },
});
