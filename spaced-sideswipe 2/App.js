import React, { Component } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { Constants, Font } from 'expo';
import SideSwipe from 'react-native-sideswipe'; // 1.3.0

import { Planet, BottomBar } from './components';

const { width } = Dimensions.get('window');

const planets = [
  { title: 'Burj Khalifa', value: 'khalifa', abbr: 'BKH' },
  { title: 'Mall of the Emirates', value: 'emirates', abbr: 'OSK' },
  { title: 'Palm Islands', value: 'islands', abbr: 'ISL' },
  { title: 'Bastakia', value: 'bastakia', abbr: 'BAS' },
];

export default class App extends Component {
  state = {
    currentIndex: 0,
    fontsLoaded: false,
  };

  componentDidMount = async () => {
    await Font.loadAsync({
      dhurjati: require('./assets/Dhurjati-Regular.ttf'),
      'inconsolata-regular': require('./assets/Inconsolata-Regular.ttf'),
      'inconsolata-bold': require('./assets/Inconsolata-Bold.ttf'),
      'libre-barcode-39': require('./assets/LibreBarcode39-Regular.ttf'),
    });

    this.setState({ fontsLoaded: true });
  };

  render = () => {
    const offset = (width - Planet.WIDTH) / 2;

    return !this.state.fontsLoaded
      ? <View style={[styles.container, { justifyContent: 'center' }]}>
          <ActivityIndicator color="white" />
        </View>
      : <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Image
            resizeMode="contain"
            style={styles.fill}
            source={require('./assets/space-bg.jpg')}
          />
          <SideSwipe
            data={planets}
            shouldCapture={() => true}
            style={[styles.fill, { width }]}
            contentContainerStyle={{  paddingTop: 100 }}
            itemWidth={Planet.WIDTH}
            threshold={Planet.WIDTH / 4}
            extractKey={item => item.value}
            contentOffset={offset}
            onIndexChange={index =>
              this.setState(() => ({ currentIndex: index }))}
            renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
              <Planet
                planet={item}
                index={itemIndex}
                currentIndex={currentIndex}
                animatedValue={animatedValue}
              />
            )}
          />
          <Text style={[styles.title, styles.titlePlatformSpecific]}>
            SPACED
          </Text>
          <BottomBar destination={planets[this.state.currentIndex].abbr} />
        </View>;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black',
  },
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    fontFamily: 'dhurjati',
    fontSize: 32,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 1.6,
    zIndex: 2,
    alignSelf: 'center'
  },
  titlePlatformSpecific: Platform.select({
    ios: {
      marginBottom: 10,
    },
  }),
});
