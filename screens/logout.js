import React, { Component } from "react";
import { View } from "react-native";
import firebase from "firebase";

export default class Logout extends Component {
  componentDidMount() {
    firebase.auth().signOut();
    this.props.navigation.replace("Login");
    alert("Você foi deslogado");
  }
  render() {
    return <View style={{ backgroundColor: "black" }}></View>;
  }
}
