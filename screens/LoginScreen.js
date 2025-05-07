import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

// Helper function to calculate percentages for width and height
const wp = (percentage) => (percentage * 0.01 * 375); // Adjust based on your design screen width
const hp = (percentage) => (percentage * 0.01 * 667); // Adjust based on your design screen height

const urlImage =
  "https://res.cloudinary.com/dz9j1pqvk/image/upload/v1737823658/ITZONE2023/devices/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_4_jy6kt6.png";

// Background image URL
const backgroundUrl =
  "https://res.cloudinary.com/dz9j1pqvk/image/upload/v1744773514/Frame_462_nmq0cf.png"; // Replace with your background image URL

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation(); // React Navigation hook to navigate between screens

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to validate login credentials
  const handleLogin = () => {
    if (phoneNumber === "" || password === "") {
      Alert.alert("Error", "Please fill in both phone number and password.");
    } else {
      // Assume successful login if fields are filled
      // For real-world, you can call an API to authenticate
      navigation.navigate("Trang chủ"); // Navigate to HomeScreen (or any other screen)
    }
  };

  return (
    <ImageBackground source={require("../assets/login.png")} style={styles.backgroundImage}>   
    <View style={styles.container}>
      <Image source={{ uri: urlImage }} style={styles.logoIcon} /><Text style={styles.welcomeText}>Legalmind</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={24} color="grey" style={styles.phoneIcon} />
        <TextInput
          style={[styles.input, { paddingLeft: wp(12) }]}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          placeholder="Phone number"
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />
    </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="grey" style={styles.lockIcon} />
          <TextInput
            style={[styles.input, { paddingLeft: wp(12) }]} // Increased paddingLeft for placeholder indentation
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Ionicons name={passwordVisible ? "eye-outline" : "eye-off-outline"} size={24} color="grey" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.forgotPassword}>I forgot my password</Text>

        <View style={styles.signupContainer}>
          <Text>Wanna try our services?</Text>
          <TouchableOpacity>
            <Text style={styles.signupText}>here you are</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center", // Ensures the content is centered
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10, // Optional, to add rounded corners to the container
    paddingTop: 60,
  },
  title: {
    fontSize: wp(6),
    marginBottom: hp(3),
    fontWeight: "bold",
  },
  logoIcon: {
    width: wp(30),
    height: wp(30),
    marginTop: hp(-19),
    marginBottom: hp(2),
    borderRadius: 100,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  input: {
    flex: 1,
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#19AB48",
    borderRadius: 25,
    padding: wp(3),
    alignItems: "center",
    marginTop: hp(2.5),
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: wp(5),
  },
  forgotPassword: {
    color: "#19AB48",
    marginTop: hp(2.5),
    fontSize: wp(3.5),
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: hp(2.5),
  },
  signupText: {
    color: "#19AB48",
    marginLeft: wp(1),
    fontSize: wp(3.5),
  },
  eyeIcon: {
    position: "absolute",
    right: wp(2.5),
    padding: wp(2.5),
  },
  phoneIcon: {
    position: "absolute",
    left: wp(2.5),
    padding: wp(2.5),
  },
  lockIcon: {
    position: "absolute",
    left: wp(2.5),
    padding: wp(2.5),
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginTop: 20,
    color: '#000',
    marginBottom: hp(4),

  },
});

export default LoginScreen;
