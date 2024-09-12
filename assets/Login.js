import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

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
        Alert.alert('Error', responseData.error || 'Failed to login');
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
      Alert.alert('Error', 'Failed to login');
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
      <View style={styles.container}>
        <Text style={styles.loginText}>Step into SkinSahitti</Text>
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
              {/* Language options */}
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
          <View style={styles.footer}>
            <Text style={styles.footerText}>Designed and Developed by Nvision IT</Text>
          </View>
        </View>
        <Text style={styles.footerText}>Designed and Developed by Nvision IT</Text>

      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '200%',
    paddingTop: 40,
  },
  loginText: {
    color: 'white',
    fontSize: width * 0.1,
    fontWeight: 'bold',
    marginBottom: height * 0.06,
    paddingLeft: 20,
    marginTop: height * 0.06,
  },
  welcomeText: {
    paddingLeft: 50,
    fontSize: width * 0.09,
    color: darkGreen,
    fontWeight: 'bold',
    paddingTop: 0,
  },
  loginPromptText: {
    paddingLeft: 20,
    color: 'black',
    fontSize: width * 0.045,
    marginBottom: height * 0.02,
  },
  formContainer: {
    backgroundColor: 'white',
    width: '90%',
    borderTopLeftRadius: 180,
    paddingTop: height * 0.1,
    paddingLeft: height * 0.04,
    alignItems: 'flex-start',
    paddingBottom: height * 0.2,
    flex: 1,
  },
  pickerContainer: {
    width: '100%',
    marginVertical: height * 0.03,
  },
  pickerLabel: {
    color: 'black',
    fontSize: width * 0.045,
    marginBottom: height * 0.01,
  },
  picker: {
    height: height * 0.05,
    width: '50%',
  },
  btnContainer: {
    alignItems: 'left',
    justifyContent: 'left',
    width: '100%',
    paddingLeft: height * 0.05,
    marginTop: height * 0.03,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'left',
  },
  signupText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  signupLinkText: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: width * 0.04,
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
  footer: {
    marginTop: 80,
    alignItems: 'left',
    justifyContent: 'left',
    paddingVertical: 10,
    paddingLeft: 40,
    color: darkGreen,
    width: '100%',
  },
  footerText: {
    color: darkGreen,
    fontSize: 14,
    fontWeight: 'normal',
    justifyContent: 'center',
  },
});

export default Login;
