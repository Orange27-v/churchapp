import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import FadeInView from "../components/FadeView";
import { removeItem, setItem } from "../utils/asyncStorage";
import AuthButton from "../components/AutoButton";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const WelcomeScreen = () => {
 const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    'Raleway': require('../assets/fonts/Raleway-VariableFont_wght.ttf'),
    'OpenSans': require('../assets/fonts/OpenSans-VariableFont.ttf'),
  });




  // Hide the splash screen after 2 seconds
  useEffect(() => {
    setTimeout(() => SplashScreen.hideAsync(), 2000);
  }, []);

  // Navigate to the "WelcomePage" and set 'alreadyLaunched' to 'true'
  const navigateToHome = async () => {
    await setItem('alreadyLaunched', 'true');
    // await removeItem('alreadyLaunched');
    navigation.navigate('WelcomePage');
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={[styles.welcomeStyle, { marginTop: Platform.OS === 'ios' ? 0 : 70 }]}>
        <FadeInView>
          <Image
            source={require("../assets/image/logo.png")}
            style={styles.image}
          />
        </FadeInView>
        <View style={styles.infoText}>
          <Text style={styles.headerText}>Welcome to church</Text>
          <Text style={styles.subText}>We Celebrate You</Text>
          
          <AuthButton 
           text="Get Started"
           onPress={navigateToHome}
           backgroundColor="#b60b2e"
          />
         
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeStyle: {},
  fadeInView: {
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  infoText: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: 'OpenSans',
    marginBottom: 10,
    marginTop: 60,
  },
  subText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: 'OpenSans',
  },
  startText: {
    fontSize: 18,
    alignSelf: "center",
    color: "#ffffff",
    fontWeight: "700",
    fontFamily: 'OpenSans',
  },
});

export default WelcomeScreen;
