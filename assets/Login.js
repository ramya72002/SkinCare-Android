import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';
import { Picker } from '@react-native-picker/picker';
import { scale, verticalScale } from '../utils/scaling';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [name, setName] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('en');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateContactNumber = (number) => /^\d+$/.test(number);

  const handleLogin = async () => {
    if (!email || !contactNumber) {
      Alert.alert('Error', 'Email and contact number are required');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Invalid email format');
      return;
    }

    if (!validateContactNumber(contactNumber)) {
      Alert.alert('Error', 'Contact number must contain only digits');
      return;
    }

    setLoading(true);

    const loginData = { email, contactNumber, preferredLanguage, name };

    try {
      const response = await fetch('https://backen-skin-care-app.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        Alert.alert('Message', responseData.error || 'Please Signup To Login');
        return;
      }

      const userData = {
        ...loginData,
        name: responseData.name,
        preferredLanguage: responseData.preferredLanguage,
      };
      await AsyncStorage.setItem('loginData', JSON.stringify(userData));

      navigation.navigate('Categories', { preferredLanguage: userData.preferredLanguage });
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Please Signup To Login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={require('./1495.gif')} style={styles.loadingImage} />
      </View>
    );
  }

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.loginText}>Step into SkinSaathi</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.loginPromptText}>Unlock your personalized skin insights</Text>
          <Field
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Field
            placeholder="Contact Number"
            keyboardType="numeric"
            value={contactNumber}
            onChangeText={setContactNumber}
          />
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Preferred Language</Text>
            <Picker
              selectedValue={preferredLanguage}
              onValueChange={(itemValue) => setPreferredLanguage(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Assamese" value="as" />
              <Picker.Item label="Awadhi" value="awa" />
              <Picker.Item label="Bengali" value="bn" />
              <Picker.Item label="Bhojpuri" value="bho" />
              <Picker.Item label="Chhattisgarhi" value="chg" />
              <Picker.Item label="Dogri" value="doi" />
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Gujarati" value="gu" />
              <Picker.Item label="Haryanvi" value="hne" />
              <Picker.Item label="Hindi" value="hi" />
              <Picker.Item label="Kannada" value="kn" />
              <Picker.Item label="Kashmiri" value="ks" />
              <Picker.Item label="Konkani" value="kok" />
              <Picker.Item label="Maithili" value="mai" />
              <Picker.Item label="Malayalam" value="ml" />
              <Picker.Item label="Manipuri" value="mni" />
              <Picker.Item label="Marathi" value="mr" />
              <Picker.Item label="Nepali" value="ne" />
              <Picker.Item label="Odia" value="or" />
              <Picker.Item label="Punjabi" value="pa" />
              <Picker.Item label="Sanskrit" value="sa" />
              <Picker.Item label="Santali" value="sat" />
              <Picker.Item label="Sindhi" value="sd" />
              <Picker.Item label="Tamil" value="ta" />
              <Picker.Item label="Telugu" value="te" />
              <Picker.Item label="Urdu" value="ur" />
            </Picker>
          </View>
          <View style={styles.btnContainer}>
            <Btn
              textColor="white"
              bgColor={darkGreen}
              btnLabel="Login"
              Press={handleLogin}
            />
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupLinkText}>Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.footerText}>Designed and Developed by NVision IT</Text>

        </View>
        <Text style={styles.footerText}>Designed and Developed by NVision IT</Text>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(40),
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  loginText: {
    color: 'white',
    fontSize: scale(34),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 250,
    paddingTop: verticalScale(70),
    paddingHorizontal: scale(40),  // Adjusted padding
    height: verticalScale(700),     // Set a fixed height
    width: '120%',                   // Adjust the overall width
    maxWidth: scale(400),           // Maximum width for better control
    marginRight: scale(15),         // Increase the right margin for extra width
    alignSelf: 'center',            // Center the form container
  },
  
  welcomeText: {
    paddingLeft:verticalScale(50),
    fontSize: scale(35),
    color: darkGreen,
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  loginPromptText: {
    paddingLeft:verticalScale(50),
    color: 'black',
    fontSize: scale(14),
    marginBottom: verticalScale(16),
  },
  pickerContainer: {
    marginVertical: verticalScale(16),
  },
  pickerLabel: {
    color: 'black',
    fontSize: scale(14),
    marginBottom: verticalScale(8),
  },
  picker: {
    height: verticalScale(40),
    width: '100%',
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems:'center',
    marginTop: verticalScale(20),
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(16),
    justifyContent: 'center',
  },
  signupText: {
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  signupLinkText: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: scale(14),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingImage: {
    width: 100,
    height: 100,
  },
  footerText: {
    marginTop: verticalScale(100),

    color: '#2c3e50',
    fontSize: scale(14),
    fontWeight: 'normal',
    textAlign: 'center',
  },
});

export default Login;
