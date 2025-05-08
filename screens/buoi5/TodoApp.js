import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { ref, push, onValue, remove, update } from "firebase/database";
import { Ionicons } from "@expo/vector-icons";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fetch todos from Firebase
  useEffect(() => {
    const todosRef = ref(db, "todos");
    const unsubscribe = onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const todoList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        todoList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTodos(todoList);
      } else {
        setTodos([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Add new todo
  const addTodo = () => {
    if (newTodo.trim() === "") {
      Alert.alert("Error", "Please enter a todo");
      return;
    }

    const todosRef = ref(db, "todos");
    push(todosRef, {
      text: newTodo,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    });
    setNewTodo("");
  };

  // Delete todo
  const deleteTodo = (id) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const todoRef = ref(db, `todos/${id}`);
          remove(todoRef);
        },
      },
    ]);
  };

  // Update todo
  const updateTodo = (id, newText) => {
    const todoRef = ref(db, `todos/${id}`);
    update(todoRef, {
      text: newText,
      updatedAt: new Date().toISOString(),
    });
    setEditingTodo(null);
  };

  // Toggle todo completion
  const toggleTodo = (id, completed) => {
    const todoRef = ref(db, `todos/${id}`);
    update(todoRef, {
      completed: !completed,
      completedAt: !completed ? new Date().toISOString() : null,
    });
  };

  const renderItem = ({ item }) => (
    <View style={[styles.todoItem, item.completed && styles.completedTodoItem]}>
      {editingTodo === item.id ? (
        <TextInput
          style={styles.editInput}
          value={item.text}
          onChangeText={(text) => updateTodo(item.id, text)}
          onBlur={() => setEditingTodo(null)}
          autoFocus
        />
      ) : (
        <>
          <View style={styles.todoContent}>
            <TouchableOpacity
              style={styles.todoCheckbox}
              onPress={() => toggleTodo(item.id, item.completed)}
            >
              <Ionicons
                name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={item.completed ? "#4CAF50" : "#666"}
              />
            </TouchableOpacity>
            <View style={styles.todoTextContainer}>
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.completedTodoText,
                ]}
              >
                {item.text}
              </Text>
              <Text style={styles.todoDate}>
                Created: {formatDate(item.createdAt)}
              </Text>
              {item.completed && item.completedAt && (
                <Text style={styles.todoDate}>
                  Completed: {formatDate(item.completedAt)}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.todoActions}>
            <TouchableOpacity
              onPress={() => setEditingTodo(item.id)}
              style={[styles.actionButton, styles.editButton]}
            >
              <Ionicons name="pencil" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteTodo(item.id)}
              style={[styles.actionButton, styles.deleteButton]}
            >
              <Ionicons name="trash" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todo List</Text>
        <Text style={styles.subtitle}>Manage your tasks efficiently</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add new todo..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  addButton: {
    width: 45,
    height: 45,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 15,
  },
  todoItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  completedTodoItem: {
    backgroundColor: "#f8f8f8",
  },
  todoContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  todoCheckbox: {
    marginRight: 10,
  },
  todoTextContainer: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  completedTodoText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  todoDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  todoActions: {
    flexDirection: "row",
    marginLeft: 10,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: "#007AFF",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  editInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
});
