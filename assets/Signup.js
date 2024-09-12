import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions, StyleSheet, Image, TextInput } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';

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
          <Text style={styles.footerText}>Designed and Developed by Nvision IT</Text>
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
  registerText: {
    color: 'white',
    fontSize: scaleFont(44), // Scaled font size
    fontWeight: 'bold',
    marginTop: height * 0.05, // 10% of screen height
  },
  createAccountText: {
    color: 'white',
    fontSize: scaleFont(18), // Scaled font size
    fontWeight: 'bold',
    paddingLeft: height * 0.05,
    marginBottom: height * 0.02, // 2% of screen height
  },
  formContainer: {
    backgroundColor: 'white',
    height: height * 0.9, // 80% of screen height
    width: width * 1.09, // 100% of screen width
    borderTopLeftRadius: 250,
    paddingTop: height * 0.15, // 10% of screen height
    alignItems: 'center',
    paddingLeft: height * 0.05,
  },
  inputField: {
    borderRadius: 100,
    color: darkGreen,
    paddingHorizontal: 15,
    width: '90%',
    backgroundColor: 'rgb(220,220, 220)',
    marginVertical: 10,
    height: '9%',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: height * 0.0, // 15% of screen height
  },
  loginText: {
    fontSize: scaleFont(16), // Scaled font size
    fontWeight: 'bold',
  },
  loginLinkText: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: scaleFont(16), // Scaled font size
  },
  loadingImage: {
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  footerText: {
    marginTop: height * 0.18, // Spacing from other components
    fontSize: scaleFont(14),
    color: darkGreen,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Signup;
