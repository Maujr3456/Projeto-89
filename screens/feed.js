import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { FlatList } from "react-native-gesture-handler";

import * as SplashScreen from "expo-splash-screen";
import PostCard from "./postCard";
import firebase from "firebase";
SplashScreen.preventAutoHideAsync();

// let posts = require("./temp.json");

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: false,
      posts: [],
    };
  }

  componentDidMount() {
    this.fetchPosts();
    console.log(this.state.posts);
  }

  fetchPosts = () => {
    firebase
      .database()
      .ref("/posts/")
      .on(
        "value",
        (snapshot) => {
          let posts = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              posts.push({
                key: key,
                value: snapshot.val()[key],
              });
            });
          }
          this.setState({ posts: posts });
          //this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log("A leitura falhou: " + errorObject.code);
        }
      );
  };
  renderItem = ({ item: post }) => {
    return <PostCard post={post} navigation={this.props.navigation} />;
  };

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
              source={require("../assets/logo.png")}
              style={styles.iconImage}
            ></Image>
          </View>
          <View style={styles.appTitleTextContainer}>
            <Text
              style={
                this.state.light_theme
                  ? styles.appTitleTextLight
                  : styles.appTitleText
              }
            >
              Spectagram
            </Text>
          </View>
        </View>
        {!this.state.posts[0] ? (
          <View style={styles.noStories}>
            <Text
              style={
                this.state.light_theme
                  ? styles.noStoriesTextLight
                  : styles.noStoriesText
              }
            >
              Ainda não há postagens :(
            </Text>
          </View>
        ) : (
          <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.posts}
              renderItem={this.renderItem}
            />
          </View>
        )}
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
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
    marginBottom: 20,
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
    fontFamily: "Bubblegum-Sans",
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  cardContainer: {
    flex: 0.85,
  },
  noStories: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center",
  },
  noStoriesTextLight: {
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
  },
  noStoriesText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
  },
});
