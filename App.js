/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, { useState } from 'react';
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

const cyrb53 = function(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
  h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1>>>0);
}

const Tab = createBottomTabNavigator()
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [grains, setGrains] = useState([])
  const [points, setPoints] = useState([])
  const [curr_idx, set_idx] = useState(1)
  
  const editGrain = (newText, index) => {
    setGrains((curr_grains) => {
      let copy_array = curr_grains.slice()
      copy_array[index].text = newText
      return copy_array
    })
  }

  const add_grain = (grain_text) => {
    set_idx((curr_idx) => (curr_idx + 1))
    setGrains((curr_grains) => ([{ text: grain_text, key: curr_idx, hash: cyrb53(grain_text) }, ...curr_grains]))
  }

  const deleteGrain = (index) => {
    setGrains((curr_grains) => {
      let copy_array = curr_grains.slice()
      copy_array.splice(index, 1)
      return copy_array
    })
  }

  const undoSelectedPoint = (hash) => {
    if (points.length && points.at(-1) !== hash) return
    setPoints((points) => (points.slice(0, -1)))
  }
  const addSelectPoint = (hash) => {
    
    const ind = grains.findIndex((grain) => (grain.hash === hash))

    const grains_copy = grains.slice()
    const temp = grains[0]
    grains_copy[0] = grains_copy[ind]
    grains_copy[ind] = temp
    setGrains(grains_copy)
    setPoints((points) => ([...points, { ts: new Date(), hash: hash }]))
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (

    <NavigationContainer>
      <Tab.Navigator >
        <Tab.Screen
          name="Home"
          
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color, size }) => (

              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}>
            {
              () => 
                (<Home
                  grains={grains}
                  editGrain={editGrain}
                  add_grain={add_grain}
                  deleteGrain={deleteGrain}
                  undoSelectedPoint={undoSelectedPoint}
                  addSelectPoint={addSelectPoint}
                />)
              
            }
          </Tab.Screen>
        <Tab.Screen
          name="Analyse"
          
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chart-line" color={color} size={size} />
            )

          }}

        >
          {() => 
            (<Analyse/>)
          }
        </Tab.Screen>
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
