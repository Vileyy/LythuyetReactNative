import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebaseConfig";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editText, setEditText] = useState("");
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Lấy thông tin người dùng hiện tại
  const user = auth.currentUser;

  const handleAddTodo = () => {
    if (todoText.trim() === "") return;

    const newTodo = {
      id: Date.now().toString(),
      text: todoText,
      completed: false,
      createdAt: new Date(),
    };

    setTodos([newTodo, ...todos]);
    setTodoText("");
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa công việc này?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => {
          setTodos(todos.filter((todo) => todo.id !== id));
        },
      },
    ]);
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setEditText(todo.text);
    setIsModalVisible(true);
  };

  const handleUpdateTodo = () => {
    if (editText.trim() === "") return;

    setTodos(
      todos.map((todo) =>
        todo.id === editingTodo.id ? { ...todo, text: editText } : todo
      )
    );
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Đăng xuất",
        onPress: async () => {
          try {
            await auth.signOut();
            navigation.navigate("Login");
          } catch (error) {
            Alert.alert("Lỗi", "Không thể đăng xuất. Vui lòng thử lại!");
          }
        },
      },
    ]);
  };

  const renderTodoItem = ({ item }) => {
    return (
      <Animated.View
        style={[
          styles.todoItem,
          item.completed && styles.completedTodo,
          { opacity: fadeAnim },
        ]}
      >
        <TouchableOpacity
          style={styles.todoCheckbox}
          onPress={() => handleToggleTodo(item.id)}
        >
          <MaterialIcons
            name={item.completed ? "check-circle" : "radio-button-unchecked"}
            size={24}
            color={item.completed ? "#4CAF50" : "#757575"}
          />
        </TouchableOpacity>

        <Text
          style={[styles.todoText, item.completed && styles.completedTodoText]}
          numberOfLines={1}
        >
          {item.text}
        </Text>

        <View style={styles.todoActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEditTodo(item)}
          >
            <MaterialIcons name="edit" size={22} color="#2196F3" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeleteTodo(item.id)}
          >
            <MaterialIcons name="delete" size={22} color="#F44336" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#4285F4" />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Danh sách công việc</Text>
          {user && <Text style={styles.userEmail}>{user.email}</Text>}
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{todos.length}</Text>
          <Text style={styles.summaryLabel}>Tổng cộng</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {todos.filter((todo) => !todo.completed).length}
          </Text>
          <Text style={styles.summaryLabel}>Đang làm</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {todos.filter((todo) => todo.completed).length}
          </Text>
          <Text style={styles.summaryLabel}>Đã xong</Text>
        </View>
      </View>

      <View style={styles.content}>
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item.id}
          style={styles.todoList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons
                name="clipboard-text-outline"
                size={70}
                color="#E0E0E0"
              />
              <Text style={styles.emptyText}>
                Chưa có công việc nào. Hãy thêm công việc mới!
              </Text>
            </View>
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Thêm công việc mới..."
          value={todoText}
          onChangeText={setTodoText}
          onSubmitEditing={handleAddTodo}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[
            styles.addButton,
            !todoText.trim() && styles.addButtonDisabled,
          ]}
          onPress={handleAddTodo}
          disabled={!todoText.trim()}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Sửa công việc</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editText}
                  onChangeText={setEditText}
                  autoFocus
                />
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.modalCancelButton]}
                    onPress={() => setIsModalVisible(false)}
                  >
                    <Text style={styles.modalButtonText}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.modalSaveButton]}
                    onPress={handleUpdateTodo}
                  >
                    <Text style={[styles.modalButtonText, { color: "white" }]}>
                      Lưu
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#4285F4",
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  userEmail: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginTop: 4,
  },
  logoutButton: {
    padding: 8,
  },
  summary: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4285F4",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#757575",
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  todoList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: "#9E9E9E",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  todoItem: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  completedTodo: {
    backgroundColor: "#F5F5F5",
  },
  todoCheckbox: {
    marginRight: 10,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: "#212121",
  },
  completedTodoText: {
    textDecorationLine: "line-through",
    color: "#9E9E9E",
  },
  todoActions: {
    flexDirection: "row",
  },
  actionButton: {
    padding: 8,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  input: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#4285F4",
    borderRadius: 50,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonDisabled: {
    backgroundColor: "#BDBDBD",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#212121",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  modalCancelButton: {
    backgroundColor: "#F5F5F5",
  },
  modalSaveButton: {
    backgroundColor: "#4285F4",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
