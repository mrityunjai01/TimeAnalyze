/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from "@react-navigation/native"
import Home from './Home';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Tab = createBottomTabNavigator()
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    
      <NavigationContainer>
        <Tab.Navigator screenOptions={{

          tabBarShowLabel: false,
          headerShown: false,
          
        }
        }>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Analyse" component={Home}/>
        </Tab.Navigator>
      </NavigationContainer>
    
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
