import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { ref, push, onValue, remove, update } from "firebase/database";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

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
    });
    setNewTodo("");
  };

  // Delete todo
  const deleteTodo = (id) => {
    const todoRef = ref(db, `todos/${id}`);
    remove(todoRef);
  };

  // Update todo
  const updateTodo = (id, newText) => {
    const todoRef = ref(db, `todos/${id}`);
    update(todoRef, {
      text: newText,
    });
    setEditingTodo(null);
  };

  // Toggle todo completion
  const toggleTodo = (id, completed) => {
    const todoRef = ref(db, `todos/${id}`);
    update(todoRef, {
      completed: !completed,
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
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
          <TouchableOpacity
            style={styles.todoText}
            onPress={() => toggleTodo(item.id, item.completed)}
          >
            <Text
              style={[styles.todoText, item.completed && styles.completedTodo]}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
          <View style={styles.todoActions}>
            <TouchableOpacity
              onPress={() => setEditingTodo(item.id)}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteTodo(item.id)}
              style={[styles.actionButton, styles.deleteButton]}
            >
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add new todo..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  todoItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
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
  todoText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  completedTodo: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  todoActions: {
    flexDirection: "row",
  },
  actionButton: {
    padding: 8,
    marginLeft: 10,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 12,
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
  },
});
