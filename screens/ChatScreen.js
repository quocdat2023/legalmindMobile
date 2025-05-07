import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import axios from 'axios';

const urlImage = 'https://res.cloudinary.com/dz9j1pqvk/image/upload/v1737823658/ITZONE2023/devices/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_4_jy6kt6.png';

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([
    { text: 'Hello! How may I assist you today?', sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  // ScrollView ref for auto-scrolling
  const scrollViewRef = useRef(null);

  // Function to send the question to the API
  const handleSendMessage = async () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, sender: 'user' },
        { text: 'I am processing your question...', sender: 'bot' },
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
          { text: inputText, sender: 'user' },
          { text: final_response, sender: 'bot' },
        ]);
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
      keyboardVerticalOffset={60}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 20,paddingTop: 60 }}>
          <Image
            source={{ uri: urlImage }}
            style={{ width: 40, height: 40, borderRadius: 20}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
     {/* Chat Messages */}
     <ScrollView
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.sender === 'bot' ? styles.botMessage : styles.userMessage,
            ]}
          >
            {message.sender === 'bot' && (
              <Image
                source={{ uri: urlImage }}
                style={styles.avatar}
                resizeMode="cover"
              />
            )}
            <View
              style={[
                styles.messageBubble,
                message.sender === 'bot' ? styles.botBubble : styles.userBubble,
              ]}
            >
              <Text
                style={message.sender === 'bot' ? styles.messageTextBot : styles.messageTextUser}
              >
                {message.text}
              </Text>
            </View>
            {message.sender === 'user' && (
              <Image
                source={{ uri: userImage }}
                style={styles.avatar}
                resizeMode="cover"
              />
            )}
          </View>
        ))}
      </ScrollView>
      {/* Input Area */}
      <View style={styles.inputContainer}>

        <TextInput
          style={styles.input}
          placeholder="Ask me anything..."
          value={inputText}
          onChangeText={setInputText}
        />
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
    backgroundColor: '#fff',
  },
  messagesContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 15,
  },
  botBubble: {
    backgroundColor: '#f0f0f0',
    marginLeft: 10, // Space between avatar and bot message bubble
    borderBottomLeftRadius: 2,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    marginRight: 10, // Space between user message bubble and avatar
    borderBottomRightRadius: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#ccc', // Fallback color
  },
  messageTextBot: {
    fontSize: 16,
    color: '#000',
  },
  messageTextUser: {
    fontSize: 16,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  messagesContainer: {
    padding: 20,
    paddingBottom: 70,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 45,
  },
  input: {
    flex: 1,
    height: 48,
    borderColor: '#f8f8f8',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#19ab48',
    padding: 12, // Adjust padding to make the button more circular
    borderRadius: 100, // Makes the button fully circular
    width: 50, // Set width to ensure circular shape
    height: 50, // Set height to match width
    justifyContent: 'center',
    alignItems: 'center', // Centers the icon inside the button
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
