import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [name, setName] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('en');

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateContactNumber = (number) => {
    return /^\d+$/.test(number);
  };

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
      console.log('Server response:', responseData);

      if (!response.ok) {
        Alert.alert('Error', responseData.error || 'Failed to login');
        return;
      }

      // Save login details to AsyncStorage including name and preferredLanguage
      const userData = {
        ...loginData,
        name: responseData.name,
        preferredLanguage: responseData.preferredLanguage,
      };
      await AsyncStorage.setItem('loginData', JSON.stringify(userData));

      // Navigate to Categories screen with preferredLanguage
      props.navigation.navigate('Categories', { preferredLanguage: userData.preferredLanguage });
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to login');
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.loginPromptText}>Login to your account</Text>
          <Field
            placeholder="Email"
            keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}
          />
          <Field
            placeholder="Contact Number"
            keyboardType={'numeric'}
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
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Login"
            Press={handleLogin}
          />
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
              <Text style={styles.signupLinkText}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: width * 0.9, // 90% of screen width
  },
  loginText: {
    color: 'white',
    fontSize: 0.12 * width, // dynamic font size
    fontWeight: 'bold',
    marginVertical: 50,
  },
  formContainer: {
    backgroundColor: 'white',
    height: height * 0.8, // 80% of screen height
    width: width * 1, // 90% of screen width
    borderTopLeftRadius: 180,
    paddingTop: 90,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 0.09 * width, // dynamic font size
    color: darkGreen,
    fontWeight: 'bold',
  },
  loginPromptText: {
    color: 'grey',
    fontSize: 0.05 * width, // dynamic font size
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerContainer: {
    width: '78%',
    marginVertical: 10,
  },
  pickerLabel: {
    color: 'grey',
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupLinkText: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;
