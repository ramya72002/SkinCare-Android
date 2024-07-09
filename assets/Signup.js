import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions, StyleSheet } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';
import HomepageText from './HomepageText';

const { width, height } = Dimensions.get('window');

const Signup = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateContactNumber = (number) => {
    return /^\d+$/.test(number);
  };

  const handleSignup = async () => {
    if (!name || !email || !contactNumber) {
      Alert.alert('Error', 'All fields are required');
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
        return;
      }

      Alert.alert('Account created');
      props.navigation.navigate('HomepageText');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to create account');
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.registerText}>Register</Text>
        <Text style={styles.createAccountText}>Create a new account</Text>
        <View style={styles.formContainer}>
          <Field placeholder="Name" value={name} onChangeText={setName} />
          <Field placeholder="Email" keyboardType={'email-address'} value={email} onChangeText={setEmail} />
          <Field placeholder="Contact Number" keyboardType={'numeric'} value={contactNumber} onChangeText={setContactNumber} />
          {/* <View style={styles.termsContainer}>
            <Text style={styles.termsText}>By signing in, you agree to our </Text>
            <Text style={styles.termsLinkText}>Terms & Conditions</Text>
          </View> */}
          {/* <View style={styles.privacyContainer}>
            <Text style={styles.privacyText}>and </Text>
            <Text style={styles.privacyLinkText}>Privacy Policy</Text>
          </View> */}
          <Btn textColor="white" bgColor={darkGreen} btnLabel="Signup" Press={handleSignup} />
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
              <Text style={styles.loginLinkText}>Login</Text>
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
  registerText: {
    color: 'white',
    fontSize: 0.12 * width, // dynamic font size
    fontWeight: 'bold',
    marginTop: 50,
  },
  createAccountText: {
    color: 'white',
    fontSize: 0.05 * width, // dynamic font size
    fontWeight: 'bold',
    marginBottom: 40,
  },
  formContainer: {
    backgroundColor: 'white',
    height: height * 0.8, // 80% of screen height
    width: width * 1, // 90% of screen width
    borderTopLeftRadius: 200,
    paddingTop: 100,
    alignItems: 'center',
  },
  termsContainer: {
    flexDirection: 'row',
    width: '78%',
    paddingRight: 16,
  },
  termsText: {
    color: 'grey',
    fontSize: 16,
  },
  termsLinkText: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: 16,
  },
  privacyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '78%',
    paddingRight: 16,
    marginBottom: 10,
  },
  privacyText: {
    color: 'grey',
    fontSize: 16,
  },
  privacyLinkText: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginLinkText: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Signup;
