import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableHighlight,
  Alert
} from 'react-native';
import axios from 'axios';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon từ react-native-vector-icons

const urlImage = 'https://res.cloudinary.com/dz9j1pqvk/image/upload/v1737823658/ITZONE2023/devices/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_4_jy6kt6.png';

export default function ChatCapabilitiesScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [sentMessage, setSentMessage] = useState(false); // State để theo dõi việc gửi tin nhắn
  const [messages, setMessages] = useState([{ text: 'Hello! How can I help you?', sender: 'bot' }]); // state để quản lý tin nhắn
  const [inputText, setInputText] = useState(''); // state để quản lý input text
  const [loading, setLoading] = useState(false);

  const [count, setCount] = useState(0);
  const onPress_1 = () => {
    Alert.alert('Just ask me anything you like!');
  };
  const onPress_2 = () => {
    Alert.alert('Essays, articles, reports, stories, & more');
  };

  const onPress_3 = () => {
    Alert.alert('I can talk to you like a natural human');
  };


  const handleSendMessage = async () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, sender: 'user' },
      ]);
      setInputText('');
      setLoading(true);

      try {
        const response = await axios.post('http://192.168.2.20:5000/query', {
          question: inputText,
        });

        const { final_response } = response.data;
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: final_response, sender: 'bot' },
        ]);
        setSentMessage(true); // Đánh dấu tin nhắn đã được gửi
      } catch (error) {
        console.error(error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Sorry, I could not process your question.', sender: 'bot' },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={-15}
    >
        <View style={styles.header}>
               <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 10 }}>
               <Image
                           source={{ uri: urlImage }}
                           style={{ width: 40, height: 40, borderRadius: 20 }}
                           resizeMode="contain"
                         />
               </TouchableOpacity>
               {/* <Text style={styles.headerTitle}></Text> */}
             </View>

      {/* Capabilities Section */}
      {!sentMessage && (
        <ScrollView contentContainerStyle={styles.capabilitiesContainer}>
          {/* Show the logo and other content only if no message is sent */}
          <View style={styles.logoCenter}>
            <Image
              source={{ uri: urlImage }} // Replace with your logo URL
              style={styles.logo}
            />
          </View>

          <Text style={styles.capabilitiesTitle}>Legalmind</Text>
          <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
              <TouchableHighlight activeOpacity={0.6} underlayColor="white" onPress={onPress_1}>
                <View style={styles.card}>
                  <Text style={styles.capabilityText}>Answer all your questions.</Text>
                  <Text style={styles.capabilitySubText}>(Just ask me anything you like!)</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight activeOpacity={0.6} underlayColor="white" onPress={onPress_2}>
                <View style={styles.card}>
                  <Text style={styles.capabilityText}>Generate all the text you want.</Text>
                  <Text style={styles.capabilitySubText}>(Essays, articles, reports, stories, & more)</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight activeOpacity={0.6} underlayColor="white" onPress={onPress_3}>
                <View style={styles.card}>
                  <Text style={styles.capabilityText}>Conversational AI.</Text>
                  <Text style={styles.capabilitySubText}>(I can talk to you like a natural human)</Text>
                </View>
              </TouchableHighlight>

            </SafeAreaView>
          </SafeAreaProvider>
          <Text style={styles.footerText}>
            <Text>These are just a few examples of what I can do.</Text>
          </Text>
        </ScrollView>
      )}

      {/* Show Chat Messages if a message has been sent */}
      {sentMessage && (
        <ScrollView contentContainerStyle={styles.messagesContainer}>
          {messages.map((msg, index) => (
            <View
              key={index}
              style={msg.sender === 'bot' ? styles.botMessage : styles.userMessage}
            >
              <Text style={msg.sender === 'bot' ? styles.messageTextBot : styles.messageTextUser}>
                {msg.text}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Chat Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask me anything..."
          value={inputText}
          onChangeText={setInputText}
        />
        {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={30} color="#000" />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.sendButtonText}>➤</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 60,
    // paddingLeft: 20,
    // paddingRight: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'flex-start', // Logo left aligned, title centered
  },
  menuButton: {
    paddingLeft: 30,
  },
  capabilitiesContainer: {
    padding: 30,
    paddingBottom: '-40',
  },
  capabilitiesTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    paddingTop: 20,
    color: '#C7C7CE'
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginTop: 100,
  },
  logoCenter: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  capabilityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#C7C7CE',
    justifyContent: 'center',
    textAlign: 'center'
  },
  capabilitySubText: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
    color: '#C7C7CE',
    justifyContent: 'center',
    textAlign: 'center'
  },
  footerText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
    color: '#C7C7CE'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  input: {
    flex: 1,
    height: 48,
    borderColor: '#f8f8f8',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f8f8f8'
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#19ab48',
    padding: 12,
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  messagesContainer: {
    padding: 20,
  },
  botMessage: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  userMessage: {
    backgroundColor: '#19ab48',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  messageTextBot: {
    fontSize: 16,
    color: '#333',
  },
  messageTextUser: {
    fontSize: 16,
    color: 'white',
  },
});


