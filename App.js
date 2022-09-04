/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  RefreshControl,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Home from './src/pages/Home'

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const bgColor = {
    ...Colors, 
    lightBlue: '#D9E6F1',
    txtlight: '#000',
    txtDark: '#fff'
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? bgColor.darker : bgColor.lightBlue,
  };


  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Home backgroundStyle={backgroundStyle} isDarkMode={isDarkMode} bgColor={bgColor}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
