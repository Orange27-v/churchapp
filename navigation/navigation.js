// App.js
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomePage from "../screens/HomePage";
import WelcomePage from "../screens/WelcomePage";
import { getItem, removeItem } from "../utils/asyncStorage";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DetailsScreen from "../screens/DetailsScreen";

import { Text, Dimensions, View } from "react-native";

import {
  PageIcon,
  AboutIcon,
  NewsIcon,
  PlayIcon,
  ChatIcon,
  text,
} from "../components/CustomIcons"; // Import custom icons
import { theme } from "../theme";
import PlayList from "../screens/PlayList";
import MusicPlayer from "../screens/MusicPlayer";
import BookScreen from "../screens/BookScreen";
import MusicPlay from "../screens/AboutUs";
import LiveTv from "../screens/LiveTv";
import ChatList from "../screens/ChatList";
import PdfView from "../screens/PdfView";
import ProdPurchase from "../screens/ProdPurchase";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const windowWidth = Dimensions.get("window").width; // Get the screen width
const windowHeight = Dimensions.get("window").height; // Get the screen height

const HomeStack = () => {
  const tabBarStyles = {
    tabBar: {
      // Adjust the radius as needed
      width: windowWidth, // Set the width to the screen width
      height: windowHeight * 0.09, // Set the desired height
      // justifyContent: "space-between",
      flexDirection: "row",
      // backgroundColor: "rgba(0, 0, 0, 1)",
      backgroundColor: "#ffffff",
      alignItems: "center", // Center content vertically
      alignSelf: "center",
      padding: 8,
      position: "absolute",
      // bottom: Platform.OS === "ios" ? 15 : 2,
      // left: Platform.OS === "android" ? 14 : 11.5,
      flexDirection: "row", // This is to align text/icon content within the tab bar
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 4,
      elevation: 5,
      zIndex: 92,
    },
    screen: {
      justifyContent: "center",
      alignItems: "center",
      bottom: Platform.OS === "ios" ? 15 : 2,
    },
    // Add more styles as needed
  };

  const CustomTab = ({ IconComponent, color, text }) => {
    return (
      <View style={tabBarStyles.tabItem}>
        {IconComponent}
        <Text style={tabBarStyles.tabText}>{text}</Text>
      </View>
    );
  };

  return (
   
    <Tab.Navigator
      screenOptions={{
        tabBarLabel: "",
        tabBarStyle: tabBarStyles.tabBar, // Use the defined style
      }}
    >
      <Tab.Screen
        name="Page"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomTab
              IconComponent={
                <PageIcon
                  color={focused ? theme.bleched : "#8c8b8b"}
                  text={focused ? "Home" : ""}
                />
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Books"
        component={BookScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomTab
              IconComponent={
                <AboutIcon
                  color={focused ? theme.bleched : "#8c8b8b"}
                  text={focused ? "eBooks" : ""}
                />
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Play"
        component={PlayList}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomTab
              IconComponent={
                <NewsIcon
                  color={focused ? theme.bleched : "#8c8b8b"}
                  text={focused ? "Messages" : ""}
                />
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Mastertv"
        component={LiveTv}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomTab
              IconComponent={
                <PlayIcon
                  color={focused ? theme.bleched : "#8c8b8b"}
                  text={focused ? "Mastertv" : ""}
                />
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Testimonies"
        component={ChatList}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomTab
              IconComponent={
                <ChatIcon
                  color={focused ? theme.bleched : "#8c8b8b"}
                  text={focused ? "Good Reports" : ""}
                />
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
   
  );
};

function AppNavigation() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    // let alreadyLaunched = await removeItem("alreadyLaunched"); // Using await here
    let alreadyLaunched = await getItem("alreadyLaunched"); // Using await here
    // let alreadyLaunched = await removeItem('alreadyLaunched');  // Using await here
    if (alreadyLaunched == "true") {
      // Use strict equality
      setIsFirstLaunch(true);
    } else {
      setIsFirstLaunch(false);
    }
    // console.log(isFirstLaunch);
    // console.log(alreadyLaunched);
  };

  if (isFirstLaunch == null) {
    // Use strict equality
    setIsFirstLaunch(false);
  } else if (isFirstLaunch === true) {
    // Use strict equality

    return (
     
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="WelcomePage"
            component={WelcomePage}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Register"
            component={RegisterScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="DetailScreen"
            component={DetailsScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeStack}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Music"
            component={MusicPlayer}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="PdfReader"
            component={PdfView}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Purchase"
            component={ProdPurchase}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (isFirstLaunch === false) {
    return (
      <NavigationContainer>
      <Stack.Screen
            options={{ headerShown: false }}
            name="WelcomePage"
            component={WelcomePage}
          />
      </NavigationContainer>
    );
  }
}

export default AppNavigation;
