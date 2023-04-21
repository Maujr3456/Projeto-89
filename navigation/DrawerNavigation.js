import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../screens/Profile";
import StackNavigator from "./Stack";
import Logout from "../screens/Logout";
import firebase from "firebase";
import CustomSidebarMenu from "../screens/CustomSideBar";
const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    let theme;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (data) => {
        theme = data.val().current_theme;
        this.setState({
          light_theme: theme === "light",
        });
      });
  }

  render() {
    return (
      <Drawer.Navigator
        screenOptions={{
          activeTintColor: "#e91e63",
          inactiveTintColor: this.state.light_theme ? "black" : "white",
          itemStyle: { marginVertical: 5 },
          headerShown: true,
        }}
        drawerContent={(props) => {
          <CustomSidebarMenu {...props} />;
        }}
      >
        <Drawer.Screen name="Tela Inicial" component={StackNavigator} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
    );
  }
}
