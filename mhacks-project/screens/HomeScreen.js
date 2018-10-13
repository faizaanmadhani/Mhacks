import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View, Button, TextInput, Image } from 'react-native';
import {Constants} from 'expo';
import {createStackNavigator} from 'react-navigation';
import * as firebase from 'firebase';

import { ImagePicker } from 'expo';

import t from 'tcomb-form-native';

const firebaseConfig = {
  apiKey: "AIzaSyC3W2Cte0o_TpeigvyXStXQ3esYwyD8ceo",
  authDomain: "Mhacks.firebaseapp.com",
  databaseURL: "https://mhacks-3254e.firebaseio.com/",
  storageBucket: "mhacks-3254e.appspot.com",
};

firebase.initializeApp(firebaseConfig);

const entryId = "DefaultUser";

const Form = t.form.Form;

const Entrance = t.struct({
  location: t.String,
  description: t.String,
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    location: {
      error: 'Enter where you went'
    },
    description: {
      error: 'Enter some information about it',
    },
  },
  stylesheet: formStyles,
};

class EntryScreen extends React.Component {
  state = {
    image: null,
  };
  
  render() {
    
    let { image } = this.state;
    
    return (
      <View style={styles.container}>
        
        <Form 
          ref={c => this._form = c}
          type={Entrance} 
          options={options}
        />
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Button
          title="Submit"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
  
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.uploadImage(result.uri, EntryId)  
      .then(() => {
        Alert.alert("Success");
      })
      .catch((error)=>{
        Alert.alert("Error");
    });
  }
}
  
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log(value);
    
    function storeFormSubmission(entryId, value) {
      firebase.database().ref('entries/' + entryId).set({
        entry: value
      });
    }
  }
  
  uploadImage = async (uri, EntryId) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    
    var ref = firebase.storage.ref().child("entries/" + EntryId);
    return ref.put(blob);
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
  render() {
    return <RootStack />;
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
