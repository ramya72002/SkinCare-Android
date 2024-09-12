import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions, StyleSheet, Image, TextInput } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import { scale, verticalScale } from '../utils/scaling';

const { width, height } = Dimensions.get('window');

// Scaling function for responsive font sizes
const scaleFont = (size) => size * (width / 375); // 375 is the base width used for scaling

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

      Alert.alert('Account created');
      props.navigation.navigate('HomepageText');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to create account');
    } finally {
      setLoading(false); // Hide loading GIF
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
                keyboardType={'email-address'}
                value={email}
                onChangeText={setEmail}
                style={styles.inputField}
                placeholderTextColor={darkGreen}
              />
              <TextInput
                placeholder="Contact Number"
                keyboardType={'numeric'}
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
    width: scale(330), // Scaled width
  },
  registerText: {
    color: 'white',
    fontSize: scaleFont(44), 
    fontWeight: 'bold',
    marginTop: verticalScale(30), // Scaled margin
  },
  createAccountText: {
    color: 'white',
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(10), 
  },
  formContainer: {
    backgroundColor: 'white',
    height: verticalScale(600), // Scaled height
    width: scale(440), 
    borderTopLeftRadius: scale(250), 
    paddingTop: verticalScale(70), 
    alignItems: 'center',
    paddingLeft: scale(20), 
  },
  inputField: {
    borderRadius: scale(180),
    color: darkGreen,
    paddingHorizontal: scale(15),
    width: '80%',
    backgroundColor: 'rgb(220,220,220)',
    marginVertical: verticalScale(10),
    height: verticalScale(50), 
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(15), 
  },
  loginText: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
  loginLinkText: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: scaleFont(16),
  },
  footerText: {
    fontSize: scaleFont(14),
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default Signup;
