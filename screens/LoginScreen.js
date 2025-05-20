import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AuthButton from "../components/AutoButton";
import AuthLink from "../components/AuthLink";
import { Entypo } from "@expo/vector-icons";
import { commonStyles } from "../theme/CommonStyles";
import { useCustomFonts } from '../components/useCustomFonts';
import { StatusBar } from "expo-status-bar";


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return null; // You might display a loading indicator here
  }

  return (
   
    <View style={commonStyles.container}>
       <StatusBar style={"Dark"} />
      <SafeAreaView style={commonStyles.topBarArea}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={commonStyles.goBackButton}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={commonStyles.InputArea}>
        <Text style={[commonStyles.title, styles.title]}>Welcome Back</Text>
        <TextInput
          placeholder="Email"
          style={commonStyles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={commonStyles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <AuthButton
          text="Login"
          // onPress={handleLogin}
          onPress={() => navigation.navigate('Home')} 
          backgroundColor="#b60b2e"
        />

        <AuthLink
          text="Already have an account? Register here"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
};

// ...styles remain the same
// ... Other code ...


export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily:'OpenSans',
    fontSize:30,
  }
})
