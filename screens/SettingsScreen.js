import React from 'react';
import { Image,View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const urlImage =
  "https://res.cloudinary.com/dz9j1pqvk/image/upload/v1737823658/ITZONE2023/devices/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_4_jy6kt6.png";

export default function SettingsScreen({ navigation }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Header */}
       <View style={styles.header}>
             <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 10 }}>
             <Image
                         source={{ uri: urlImage }}
                         style={{ width: 40, height: 40, borderRadius: 20 }}
                         resizeMode="contain"
                       />
             </TouchableOpacity>
           </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.description}>
            Tùy chỉnh các thiết lập của ứng dụng Legalmind theo nhu cầu của bạn.
          </Text>

          {/* Tùy chọn cài đặt */}
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Bật thông báo</Text>
            <Icon name="toggle-on" size={40} color="#19AB48" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Ngôn ngữ</Text>
            <Text style={styles.settingSubText}>Tiếng Việt</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.logoutButtonText}>Đăng Xuất</Text>
          </TouchableOpacity>
        </View>

        {/* NavBar */}
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
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
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 40,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  settingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  settingSubText: {
    fontSize: 16,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 40,
  },
  logoutButtonText: {
    color: '#fff',
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