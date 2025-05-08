import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import buoi1 from "./screens/buoi1";
import HomeScreen from "./screens/HomeScreen";
import buoi2 from "./screens/buoi2";
import LoginScreen from "./screens/buoi3/LoginScreen";
import RegisterScreen from "./screens/buoi3/RegisterScreen";
import ForgotPasswordScreen from "./screens/buoi3/ForgotPasswordScreen";
import FirebaseHome from "./screens/buoi3/FirebaseHome";
import DrawerNavigator from "./screens/buoi4/DrawerNavigator";
import TodoApp from "./screens/buoi5/TodoApp";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen name="buoi1" component={buoi1} />
        <Stack.Screen
          name="buoi2"
          component={buoi2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrawerHome"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FirebaseHome"
          component={FirebaseHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TodoApp"
          component={TodoApp}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}