import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View } from 'react-native';
import {Constants} from 'expo';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Travello",
      bodyText: 'A Social media app for planning and sharing trips'
    };
  }

  render() {
    return (
    <View style={styles.container}>
      <Text style={styles.baseText}>
        <Text style={styles.titleText}>
          {this.state.titleText}
        </Text>
        <Text numberOfLines={5}>
          {this.state.bodyText}
        </Text>
      </Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  baseText: {
    fontFamily: 'normal',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
