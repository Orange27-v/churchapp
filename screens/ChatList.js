import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import CustomLinearGradient from "../components/CustomLinearGradient";
import Header from "../components/Header";
import { EvilIcons } from "@expo/vector-icons";
import moment from "moment";

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [base64Image, setBase64Image] = useState("");
  const [imageMIME, setImageMIME] = useState("");

  const flatListRef = useRef(null);

  const handleSend = (text, image) => {
    if (text.trim() !== "" || image) {
      const newMessage = {
        text: text,
        id: Math.random().toString(),
        timestamp: Date.now(),
        image: image,
        imageMIME: imageMIME,
      };

      setMessages([...messages, newMessage]);
      setMessage("");
      setBase64Image("");
      setImageMIME("");
    }
  };

  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      const response = await fetch(result.uri);
      const blob = await response.blob();

      const base64data = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setBase64Image(base64data);
      setImageMIME(blob.type);

      // Automatically send the selected image
      handleSend("", base64data);
    }
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      <CustomLinearGradient style={styles.gradient}>
        <View>
          <Header/>
        </View>
      </CustomLinearGradient>
      <View style={styles.messageContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.messageBubble}>
              {item.image ? (
                <Image
                  source={{
                    uri: `data:${item.imageMIME};base64,${item.image}`,
                  }}
                  style={styles.messageImage}
                />
              ) : null}
              <Text style={styles.messageText}>{item.text}</Text>
              <View style={styles.dateTimeArea}>
                <Text style={styles.dateTimeText}>
                  {moment(item.timestamp).format("MMMM D, YYYY h:mm A")}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={openImagePicker}>
          <EvilIcons
            style={styles.cameraIcon}
            name="camera"
            size={40}
            color="black"
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <Button title="Send" onPress={() => handleSend(message, "")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 120,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
    position: "absolute",
    bottom: 75,
    width: "100%",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: "lightblue",
    marginRight: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  messageBubble: {
    backgroundColor: "lightblue",
    borderRadius: 10,
    padding: 7,
    maxWidth: "99%",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  messageText: {
    fontSize: 20,
    lineHeight: 28,
  },
  dateTimeArea: {
    alignSelf: "flex-end",
  },
  dateTimeText: {
    fontSize: 12,
    color: "gray",
    fontStyle: "italic",
  },
  cameraIcon: {
    width: 30,
    height: 30,
    marginRight: 2,
  },
  selectedImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 10,
  },
  messageImage: {
    width: "auto",
    height: "auto",
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default ChatScreen;
