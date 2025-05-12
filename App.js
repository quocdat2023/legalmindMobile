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

// Initialize the navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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

        
        <Drawer.Screen
          name="Trang chủ"
          component={HomeScreen}
          options={{ title: 'Trang chủ' }}
        />
        
        <Drawer.Screen
          name="Truy vấn"
          component={ChatGenerate}
          options={{ title: 'Chat Generate' }}
        />

            <Drawer.Screen
          name="Cài đặt"
          component={SettingsScreen}
          options={{ title: 'Cài Đặt' }}
        />

        {/* Drawer Screens */}
        <Drawer.Screen
          name="Đăng nhập"
          component={LoginScreen}

        />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}