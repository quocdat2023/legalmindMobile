import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawerContent from './components/CustomDrawerContent';
import ChatGenerate from './screens/ChatGenerateScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';

// Initialize the navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Your image URL for the hamburger menu
const urlImage = 'https://res.cloudinary.com/dz9j1pqvk/image/upload/v1737823658/ITZONE2023/devices/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_4_jy6kt6.png';

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Đăng nhập"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
        }}
        
      >
        {/* Drawer Screens */}
        <Drawer.Screen
          name="Đăng nhập"
          component={LoginScreen}

        />

        <Drawer.Screen
          name="Trang chủ"
          component={HomeScreen}
          options={{ title: 'Trang chủ' }}
        />

        <Drawer.Screen
          name="Cài đặt"
          component={SettingsScreen}
          options={{ title: 'Cài Đặt' }}
        />

        <Drawer.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ title: 'ChatScreen' }}
        />
        
        <Drawer.Screen
          name="Chat"
          component={ChatGenerate}
          options={{ title: 'Chat Generate' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}