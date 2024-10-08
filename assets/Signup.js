import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions, StyleSheet, Image, TextInput } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import { scale, verticalScale } from '../utils/scaling';

const { width, height } = Dimensions.get('window');

const scaleFont = (size) => size * (width / 375);

const Signup = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateContactNumber = (number) => {
    return /^\d+$/.test(number);
  };

  const handleSignup = async () => {
    if (!name || !email || !contactNumber) {
      Alert.alert('Missing Information', 'Please ensure all fields are completed before proceeding.');
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

    const userData = {
      name,
      email,
      contactNumber,
    };

    setLoading(true); // Show loading GIF

    try {
      const response = await fetch('https://backen-skin-care-app.vercel.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const responseText = await response.text();
      console.log('Server response:', responseText);

      if (!response.ok) {
        Alert.alert('Error', responseText);
        setLoading(false); // Hide loading GIF
        return;
      }
      props.navigation.navigate('Login', {
        email: email,
        contactNumber: contactNumber,
      });
          } catch (error) {
      Alert.alert('Error', 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.registerText}>Register</Text>
        <Text style={styles.createAccountText}>Start your skincare revolution today</Text>
        <View style={styles.formContainer}>
          {loading ? (
            <Image source={require('./1495.gif')} style={styles.loadingImage} />
          ) : (
            <>
              <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.inputField}
                placeholderTextColor={darkGreen}
              />
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                style={styles.inputField}
                placeholderTextColor={darkGreen}
              />
              <TextInput
                placeholder="Contact Number"
                keyboardType="numeric"
                value={contactNumber}
                onChangeText={setContactNumber}
                style={styles.inputField}
                placeholderTextColor={darkGreen}
              />
              <Btn textColor="white" bgColor={darkGreen} btnLabel="Signup" Press={handleSignup} />
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                  <Text style={styles.loginLinkText}>Login</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {/* Footer Text */}
          <Text style={styles.footerText}>Designed and Developed by NVision IT</Text>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '90%',
  },
  registerText: {
    color: '#fff',
    fontSize: scaleFont(36),
    fontWeight: 'bold',
    marginTop: verticalScale(30),
  },
  createAccountText: {
    color: '#ccc',
    fontSize: scaleFont(16),
    marginBottom: verticalScale(20),
  },
  formContainer: {
    backgroundColor: 'white',
    height: verticalScale(600), // Scaled height
    width: scale(440), 
    borderTopLeftRadius: scale(250), 
    paddingTop: verticalScale(70), 
    alignItems: 'center',
    paddingLeft: scale(5), 
  },
  inputField: {
    borderRadius: scale(20),
    backgroundColor: '#e9e9e9',
    width: '70%',
    padding: scale(15),
    marginVertical: verticalScale(10),
    fontSize: scaleFont(16),
    color: '#333',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(15),
  },
  loginText: {
    fontSize: scaleFont(14),
    // color: '#777',
  },
  loginLinkText: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: scaleFont(14),
  },
  footerText: {
    fontSize: scaleFont(12),
    color: '#aaa',
    textAlign: 'center',
    marginTop: verticalScale(1),
  },
});

export default Signup;
