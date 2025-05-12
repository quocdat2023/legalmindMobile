import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing MaterialIcons

const urlImage = 'https://res.cloudinary.com/dz9j1pqvk/image/upload/v1737823658/ITZONE2023/devices/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_4_jy6kt6.png';

export default function HomeScreen({ navigation }) {
  const handleStartChat = () => {
    navigation.navigate('Truy vấn');
  };

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 10 }}>
        <Image
                    source={{ uri: urlImage }}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                    resizeMode="contain"
                  />
        </TouchableOpacity>
      </View>
 

      {/* Main content */}
      <View style={styles.main}>
        <Image
          source={{ uri: urlImage }} // Replace with your logo URL
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Welcome to Legalmind AI</Text>
        <Text style={styles.description}>Start chatting with ChattyAI now. You can ask me anything.</Text>

        <TouchableOpacity style={styles.button} onPress={handleStartChat}>
          <Text style={styles.buttonText}>Start Chat</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity  onPress={() => navigation.navigate('Chat')} style={styles.navItem}>
          <Icon name="chat" size={30} color="#19ab48" />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AI Assistants')} style={styles.navItem}>
          <Icon name="assistant" size={30} color="#19ab48" />
          <Text style={styles.navText}>AI Assistants</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('History')} style={styles.navItem}>
          <Icon name="history" size={30} color="#19ab48" />
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.navItem}>
          <Icon name="account-circle" size={30} color="#19ab48" />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingLeft: 10,
    paddingRight: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: 0,
    paddingBottom: 10,
    justifyContent: 'flex-start', // Logo left aligned, title centered
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    flex: 1, // Ensures the title is centered
  },
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '20%',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginTop: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#777777',
    marginTop: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#19ab48',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navBar: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#19ab48',
    marginTop: 5, // Adds some space between the icon and text
  },
});