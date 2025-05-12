import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CustomDrawerContent(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Helper function to return appropriate icon for each screen
  const getIconForScreen = (screenName) => {
    switch (screenName) {
      case 'Trang chủ':
        return 'home';
      case 'Cài đặt':
        return 'settings';
      case 'Đăng nhập':
        return 'login';
      // case 'Chat':
      //   return 'chat';
      default:
        return 'info';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dz9j1pqvk/image/upload/v1737823658/ITZONE2023/devices/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_4_jy6kt6.png',
          }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>Legalmind</Text>
      </View>

      {/* Drawer Items */}
      {props.state.routeNames.map((name, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.menuItem,
            activeIndex === index && styles.menuItemActive,
          ]}
          onPress={() => {
            setActiveIndex(index);
            props.navigation.navigate(name);
          }}
          activeOpacity={0.8}
        >
          <Icon
            name={getIconForScreen(name)}
            size={24}
            color={activeIndex === index ? '#fff' : '#19AB48'}
            style={styles.icon}
          />
          <Text
            style={[
              styles.menuText,
              activeIndex === index && styles.menuTextActive,
            ]}
          >
            {name}
          </Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 23
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  menuItemActive: {
    backgroundColor: '#19AB48',
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  menuTextActive: {
    color: '#fff',
  },
});
