import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Switch,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import firebase from "firebase";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isEnabled: false,
      light_theme: false,
      name: "",
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    let theme, name, image;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (data) {
        theme = data.val().current_theme;
        name = `${data.val().first_name} ${data.val().last_name} `;
      });
    this.setState({
      light_theme: theme === "light" ? true : false,
      isEnabled: theme === "light" ? false : true,
      name: name,
    });
  }

  /*escreva aqui a função para switch*/
  TurnOn() {
    const previousState = this.state.isEnabled;
    const theme = !this.state.isEnabled ? "dark" : "light";
    var updates = {};
    updates["/users/" + firebase.auth().currentUser.uid + "/current_theme"] =
      theme;
    firebase.database().ref().update(updates);
    this.setState({ isEnabled: !previousState, light_theme: previousState });
  }

  render() {
    return (
      <View
        style={
          this.state.light_theme ? styles.containerLight : styles.container
        }
      >
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.appTitle}>
          <View style={styles.appIcon}>
            <Image
              style={styles.iconImage}
              source={require("../assets/logo.png")}
            />
          </View>
          <View style={styles.appTitleTextContainer}>
            <Text
              style={
                this.state.light_theme
                  ? styles.appTitleTextLight
                  : styles.appTitleText
              }
            >
              Storytelling App
            </Text>
          </View>
        </View>
        <View style={styles.screenContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require("../assets/profile_img.png")}
              style={styles.profileImage}
            ></Image>
            <Text style={styles.nameText}>{this.state.name}</Text>
          </View>
          <View style={styles.themeContainer}>
            <Text
              style={
                this.state.light_theme
                  ? styles.themeTextLight
                  : styles.themeText
              }
            >
              Tema escuro
            </Text>
            <Switch
              trackColor={{ false: "gray", true: "white" }}
              thumbColor={this.state.isEnabled ? "blue" : "#F4F4F4"}
              onValueChange={() => {
                this.TurnOn();
              }}
              value={this.state.isEnabled}
              style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
            />
          </View>
          <View style={{ flex: 0.3 }} />
        </View>
        <View style={{ flex: 0.08 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  containerLight: {
    flex: 1,
    backgroundColor: "#FFFACD",
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
  },
  screenContainer: {
    flex: 0.85,
  },
  profileImageContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
  },
  nameText: {
    color: "white",
    fontSize: RFValue(40),
    marginTop: RFValue(10),
  },
  nameTextLight: {
    color: "black",
    fontSize: RFValue(40),
    marginTop: RFValue(10),
  },
  themeContainer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: RFValue(20),
  },
  themeText: {
    color: "white",
    fontSize: RFValue(30),
    marginRight: RFValue(15),
  },
  themeTextLight: {
    color: "black",
    fontSize: RFValue(30),
    marginRight: RFValue(15),
  },
});
