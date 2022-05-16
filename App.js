/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


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
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Analyse from './Analyse';

const Tab = createBottomTabNavigator()
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    
      <NavigationContainer>
        <Tab.Navigator >
          <Tab.Screen 
            name="Home" 
            component={Home}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: ({color, size}) => (

                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }} />
          <Tab.Screen 
            name="Analyse" 
            component={Analyse}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="chart-line" color={color} size={size} />
              )
              
            }}

          />
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
