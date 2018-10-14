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

import { Planet, BottomBar } from '../compo';

const { width } = Dimensions.get('window');

const planets = [
  { title: 'Burj Khalifa', value: 'khalifa', abbr: 'BKH' },
  { title: 'Mall of the Emirates', value: 'emirates', abbr: 'OSK' },
  { title: 'Palm Islands', value: 'islands', abbr: 'ISL' },
  { title: 'Bastakia', value: 'bastakia', abbr: 'BAS' },
];

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
  state = {
    currentIndex: 0,
    fontsLoaded: false,
  };

  componentDidMount = async () => {
    await Font.loadAsync({
      dhurjati: require('../assets/Dhurjati-Regular.ttf'),
      'inconsolata-regular': require('../assets/Inconsolata-Regular.ttf'),
      'inconsolata-bold': require('../assets/Inconsolata-Bold.ttf'),
      'libre-barcode-39': require('../assets/LibreBarcode39-Regular.ttf'),
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
            source={require('../assets/space-bg.jpg')}
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

  // render() {
  //   return (
  //     <ScrollView style={styles.container}>
  //
  //     <Image
  //       source={require('../assets/images/mountains.jpg')}
  //       style={styles.container}>
  //       <SearchBar
  //           onSearchChange={() => console.log('On Search Change')}
  //           height={50}
  //           onFocus={() => console.log('On Focus')}
  //           onBlur={() => console.log('On Blur')}
  //           placeholder={'Search...'}
  //           autoCorrect={false}
  //           padding={5}
  //           returnKeyType={'search'}
  //         />
  //     </Image>
  //
  //
  //
  //     </ScrollView>
  //   );
  // }

const styles = StyleSheet.create({
  defaultStyle: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
