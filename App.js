//Make sure to import everything you are going to use
import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Button,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyButton from './src/Elements/elCustomButton';
import Settings from './src/Screens/Settings';
import Tasks from './src/Screens/Done';
import Home from './src/Screens/Home';
import Notes from './src/Screens/Notes';
import Upcoming from './src/Screens/Upcoming';
import Add from './src/Screens/Add';
import {createStackNavigator} from 'react-navigation-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function App() {
  return (
    // <ImageBackground
    //   source={require("./assets/back.png")}
    //   style={styles.background}
    // >

    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if (route.name === 'Settings') {
              iconName = 'cog';
              size = focused ? 25 : 20;
              // color = focused ? '#f0f' : '#555';
            } else if (route.name === 'Done') {
              iconName = 'check-circle';
              size = focused ? 25 : 20;
              // color = focused ? '#f0f' : '#555';
            } else if (route.name === 'Home') {
              iconName = focused ? 'lightbulb' : 'home';
              size = focused ? 27 : 20;
            } else if (route.name === 'Upcoming') {
              iconName = 'calendar-day';
              size = focused ? 25 : 20;
            } else if (route.name === 'Notes') {
              iconName = 'edit';
              size = focused ? 25 : 20;
            }
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
        })}
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{backgroundColor: '#694fad'}}>
        <Tab.Screen name="Settings" component={Settings} />
        <Tab.Screen name="Notes" component={Notes} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Upcoming" component={Upcoming} />
        <Tab.Screen name="Done" component={Tasks} />
      </Tab.Navigator>
    </NavigationContainer>

    // </ImageBackground>

    //jsx which is similar to HTML View = <div>, Text=<p> etc.

    /* <View style={styles.navBar}>
        <Text style={styles.navBarText}>Today, 23rd of Twenyary</Text>
      </View> */
  );
}

const styles = StyleSheet.create({
  //use ctrl+space if autocomplete is not opening

  navBar: {
    height: '7%',
    backgroundColor: '#3F3F3F',
    width: '100%',
  },

  navBarText: {
    paddingTop: '6%',
    color: 'white',
    textAlign: 'right',
    marginRight: '3%',
    fontSize: 15,
    fontFamily: 'fontPoppins-Bold.ttf',
  },
  background: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
  },
});

export default App;
