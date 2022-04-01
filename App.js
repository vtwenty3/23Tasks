//Make sure to import everything you are going to use
import React, {useState} from 'react';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from './src/Screens/Settings';
import Tasks from './src/Screens/Done';
import Home from './src/Screens/Home';
import Notes from './src/Screens/Notes';
import Upcoming from './src/Screens/Upcoming';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {DarkTheme} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {
            shadowColor: '#000',
            shadowOpacity: 0.1,
            height: 53,
            paddingVertical: 3,
            paddingBottom: 2,
          },
          tabBarLabelStyle: {
            color: '#7a7a7a',
            fontSize: 12,
          },

          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if (route.name === 'Settings') {
              iconName = 'cog';
              size = focused ? 25 : 20;
              color = focused ? '#FECA8C' : '#7a7a7a';
            } else if (route.name === 'Done') {
              iconName = 'check-circle';
              size = focused ? 25 : 20;
              color = focused ? '#FECA8C' : '#7a7a7a';
            } else if (route.name === 'Home') {
              iconName = 'home';
              size = focused ? 27 : 20;
              color = focused ? '#FECA8C' : '#7a7a7a';
            } else if (route.name === 'Upcoming') {
              iconName = 'calendar-day';
              size = focused ? 25 : 20;
              color = focused ? '#FECA8C' : '#7a7a7a';
            } else if (route.name === 'Notes') {
              iconName = 'edit';
              size = focused ? 25 : 20;
              color = focused ? '#FECA8C' : '#7a7a7a';
            }
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          headerShown: false,
        })}>
        <Tab.Screen name="Settings" component={Settings} />
        <Tab.Screen name="Notes" component={Notes} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Upcoming" component={Upcoming} />
        <Tab.Screen name="Done" component={Tasks} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
