import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import Home from "../../screens/buoi4/Home";
import Detail from "../../screens/buoi4/Detail";
import Profile from "../../screens/buoi4/Profile";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>Admin</Text>
      </View>
      <DrawerItem
        label="Home"
        icon={({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        )}
        onPress={() => props.navigation.navigate("Home")}
        activeBackgroundColor="#e8e4f3"
        activeTintColor="#6A5ACD"
        labelStyle={styles.drawerItemLabel}
        style={props.state.index === 0 ? styles.activeItem : {}}
        inactiveBackgroundColor="transparent"
        inactiveTintColor="#000"
      />
      <DrawerItem
        label="Detail"
        icon={({ color, size }) => (
          <Ionicons name="information-circle" size={size} color={color} />
        )}
        onPress={() => props.navigation.navigate("Detail")}
        activeBackgroundColor="#e8e4f3"
        activeTintColor="#6A5ACD"
        labelStyle={styles.drawerItemLabel}
        style={props.state.index === 1 ? styles.activeItem : {}}
        inactiveBackgroundColor="transparent"
        inactiveTintColor="#000"
      />
      <DrawerItem
        label="Profile"
        icon={({ color, size }) => (
          <Ionicons name="person" size={size} color={color} />
        )}
        onPress={() => props.navigation.navigate("Profile")}
        activeBackgroundColor="#e8e4f3"
        activeTintColor="#6A5ACD"
        labelStyle={styles.drawerItemLabel}
        style={props.state.index === 1 ? styles.activeItem : {}}
        inactiveBackgroundColor="transparent"
        inactiveTintColor="#000"
      />
      <View style={styles.divider} />
      <DrawerItem
        label="Logout"
        icon={({ color, size }) => (
          <Ionicons name="log-out-outline" size={size} color={color} />
        )}
        labelStyle={styles.drawerItemLabel}
        inactiveTintColor="#000"
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: "#6A5ACD" },
        headerTintColor: "#fff",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
      />
      <Drawer.Screen
        name="Detail"
        component={Detail}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 15,
    backgroundColor: "#fff",
  },
  drawerHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 10,
  },
  drawerItemLabel: {
    fontSize: 16,
    marginLeft: 8, 
  },
  activeItem: {
    backgroundColor: "#e8e4f3",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  }
});