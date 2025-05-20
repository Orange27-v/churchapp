import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AuthLink from "../components/AuthLink";
import AuthButton from "../components/AutoButton";
import { StatusBar } from "expo-status-bar";
import { commonStyles } from "../theme/CommonStyles";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Add your registration logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

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
        <Text style={[commonStyles.title, styles.title]}>Create Account</Text>
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
          text="Register"
          onPress={handleRegister}
          backgroundColor="#b60b2e"
        />

        <AuthLink
          text="Already have an account? Login here"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
// ...styles remain the same
// ... Other code ...

const styles = StyleSheet.create({
  title: {
    fontFamily:'OpenSans',
    fontSize:30,
  }
})