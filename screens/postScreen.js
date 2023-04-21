import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

import * as SplashScreen from "expo-splash-screen";
import firebase from "firebase";
SplashScreen.preventAutoHideAsync();

export default class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_liked: false,
      // likes: this.props.route.params.story.story.likes,
      light_theme: false,
    };
  }

  // componentDidMount() {
  //   this._loadFontsAsync();
  //   this.fetchUser();
  // }

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

  like = () => {
    if (this.state.is_liked) {
      firebase
        .database()
        .ref("posts")
        .child(this.props.route.params.story_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(-1));
      this.setState({ likes: (this.state.likes -= 1), is_liked: false });
    } else {
      firebase
        .database()
        .ref("posts")
        .child(this.props.route.params.story_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(1));
      this.setState({ likes: (this.state.likes += 1), is_liked: true });
    }
  };

  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } else {
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Spectagram</Text>
            </View>
          </View>
          <View style={styles.storyContainer}>
            <ScrollView style={styles.storyCard}>
              <Image
                source={require("../assets/image_1.jpg")}
                style={styles.image}
              ></Image>

              <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                  <Text style={styles.storyAuthorText}>
                    {this.props.route.params.post.author}
                  </Text>
                </View>
              </View>
              <View style={styles.storyTextContainer}>
                <Text style={styles.storyText}>
                  {this.props.route.params.post.caption}
                </Text>
              </View>
              <View style={styles.actionContainer}>
                <TouchableOpacity
                  style={
                    this.state.is_liked
                      ? styles.likeButtonLiked
                      : styles.likeButtonDisliked
                  }
                  // onPress={this.like}
                >
                  <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                  <Text style={styles.likeText}>{this.state.likes}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
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
    fontFamily: "Bubblegum-Sans",
  },
  storyContainer: {
    flex: 1,
  },
  storyCard: {
    margin: RFValue(20),
    backgroundColor: "black",
    borderRadius: RFValue(20),
    shadowColor: "white",
    shadowRadius: 10,
    shadowOffset: { width: 3, height: 3 },
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain",
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20),
  },
  titleTextContainer: {
    flex: 0.8,
  },
  storyTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "white",
  },
  storyAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white",
  },
  iconContainer: {
    flex: 0.2,
  },
  storyTextContainer: {
    padding: RFValue(20),
  },
  storyText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "white",
  },
  moralText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
    color: "white",
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30),
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  likeButtonLiked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30),
  },
  likeButtonDisliked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#eb3948",
    borderWidth: 2,
    borderRadius: RFValue(30),
  },
});
