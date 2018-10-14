import React, { Component } from "react";
import { View, StyleSheet, Image, ScrollView, Text } from "react-native";
import { Constants } from "expo";
import { Button } from "react-native";

export default class App extends Component {
  static navigationOptions = {
    title: "Jim Carrey"
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.backgroundContainer}>
            <Image
              style={styles.backdrop}
              resizeMode="cover"
              source={{
                uri:
                  "http://jpninfo.com/wp-content/uploads/2017/01/hatsuhinode-in-japan.jpg"
              }}
            />
          </View>
          <View style={styles.overlay}>
            <Image
              style={styles.image}
              resizeMode={"cover"}
              source={{
                uri:
                  "https://s-media-cache-ak0.pinimg.com/736x/43/cd/6e/43cd6e82491bf130d97624c198ee1a3f--funny-movie-quotes-funny-movies.jpg",
                paddingBottom: 500
              }}
            />
          </View>
        </View>
        <Text
          style={{
            //alignSelf: "center",
            position: "absolute",
            top: 200,
            fontWeight: "bold",
            fontSize: 20
          }}
        >
          Jim's Journeys
        </Text>
        <View style={styles.largeContainer}>
          <Image
            style={styles.largeImage}
            resizeMode={"cover"}
            source={{
              uri:
                "https://www.nationalgeographic.com/content/dam/travel/2017-digital/destination-hubs/01_Japan.adapt.1900.1.jpg"
            }}
          />
          <Text style={{ fontWeight: "bold" }}>
            <Text style={{ color: "red" }}> </Text>
          </Text>
          <Image
            style={styles.largeImage}
            resizeMode={"cover"}
            source={{
              uri:
                "http://hamdenregionalchamber.com/wp-content/uploads/2018/01/Greece-1080x675.jpg"
            }}
          />
          <Text style={{ fontWeight: "bold" }}>
            <Text style={{ color: "red" }}> </Text>
          </Text>
          <Image
            style={styles.largeImage}
            resizeMode={"cover"}
            source={{
              uri:
                "https://www.azamaraclubcruises.com/sites/default/files/heros/pr-venice-italy-5-may-19.jpg"
            }}
          />
        </View>
        <Text
          style={{
            position: "absolute",
            top: 120,
            left: 30,
            fontWeight: "bold",
            fontSize: 30
          }}
        >
          Jim Carrey
        </Text>
        <Text
          style={{
            position: "absolute",
            top: 160,
            left: 30,
            fontSize: 15
          }}
        >
          @Jim_Carrey
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
    paddingLeft: Constants.statusBarHeight
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 0,
    backgroundColor: "#fff"
  },
  largeContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100, //Constants.statusBarHeight,
    paddingBottom: 100,
    backgroundColor: "#fff"
  },
  largeImage: {
    height: 400,
    width: 400,
    backgroundColor: "#fff"
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  overlay: {
    opacity: 1.0,
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 100
  },
  logo: {
    backgroundColor: "rgba(0,0,0,0)",
    width: 160,
    height: 52
  },
  backdrop: {
    flex: 1,
    flexDirection: "column"
  },
  headline: {
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "black",
    color: "white"
  }
});
