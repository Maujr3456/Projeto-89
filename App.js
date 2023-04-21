import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import DrawerNavigator from "./navigation/DrawerNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./screens/register";
import Login from "./screens/login";
import { firebaseConfig } from "./config";
import firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const StackNav = createStackNavigator();
const StackInicial = () => {
  return (
    <StackNav.Navigator>
      <StackNav.Screen name="Login" component={Login} />
      <StackNav.Screen name="Dashboard" component={DrawerNavigator} />
      <StackNav.Screen name="Register" component={Register} />
    </StackNav.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <StackInicial />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
