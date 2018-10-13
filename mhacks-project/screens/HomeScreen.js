import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View, Button } from 'react-native';
import {Constants} from 'expo';
import {createStackNavigator} from 'react-navigation';
import firebaseConfig from '../constants/firebase';
import * as firebase from 'firebase';

firebase.initializeApp(firebaseConfig);

class TextInput extends React.Component {
  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable = {true}
        maxLength = {40}
      />
    );
  }
  
}

class EntryScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Entry</Text>
        
      </View>
    )
  }
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Travello\n",
      bodyText: 'A Social media app for planning and sharing trips \n'
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
      <Button
        onPress={() => this.props.navigation.navigate('Entry')}
        title="New Trip"
        color="#841584"
        accessibilityLabel="Learn more about this blue button"
        />
    </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Entry: EntryScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.tasksRef = this.props.firebaseApp.database().ref();
      this.state = {
        user:null,
        loading: true,
        newTask: ""
    }
    return (<RootStack />);
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
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'normal',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
