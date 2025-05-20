import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Import icons from the desired icon library
import HomeScreen from '../screens/HomeScreen';
import AboutUs from '../screens/AboutUs';


const Tab = createBottomTabNavigator();


const Tabs = () => {
 
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Other"
          component={AboutUs}
          options={{
            tabBarLabel: 'Other',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-settings" color={color} size={size} />
            ),
          }}
        />
        {/* Add more screens as needed */}
      </Tab.Navigator>
      </NavigationContainer>
  );
}

export default Tabs