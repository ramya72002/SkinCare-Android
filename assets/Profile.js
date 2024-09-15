import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import { scale, verticalScale } from '../utils/scaling'; // Import scaling functions

const { width, height } = Dimensions.get('window');
const scaleWidth = width / 375; // Assuming base width is 375 (iPhone 6/7/8)
const scaleHeight = height / 667; // Assuming base height is 667

const Profile = ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);
  const [preferredLanguage, setPreferredLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const loginDataString = await AsyncStorage.getItem('loginData');
        if (loginDataString) {
          const loginData = JSON.parse(loginDataString);
          setProfileData(loginData);
          setPreferredLanguage(loginData.preferredLanguage || 'en');
        } else {
          // No data in AsyncStorage, navigate back to Login
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Failed to load profile data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [navigation]);

  const handleLanguageChange = async (itemValue) => {
    setPreferredLanguage(itemValue);
    const updatedProfileData = { ...profileData, preferredLanguage: itemValue };
    setProfileData(updatedProfileData);
    await AsyncStorage.setItem('loginData', JSON.stringify(updatedProfileData));
    navigation.navigate('Categories', { preferredLanguage: itemValue });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('loginData');
    navigation.navigate('Login');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!profileData) {
    return null; // Return null to avoid rendering if there's no profile data
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <Text style={styles.headerText}>Profile</Text>
      <View style={styles.profileContainer}>
        <View style={styles.profileItem}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{profileData?.name}</Text>
        </View>
        <View style={styles.profileItem}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{profileData?.email}</Text>
        </View>
        <View style={styles.profileItem}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{profileData?.contactNumber}</Text>
        </View>
        <View style={styles.profileItem}>
          <Text style={styles.label}>Language:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={preferredLanguage}
              onValueChange={handleLanguageChange}
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
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footerText}>Designed and Developed by NVision IT</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: verticalScale(10),
    fontSize: scale(16),
    color: '#333',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
  },
  headerText: {
    fontSize: scale(28),
    fontWeight: 'bold',
    marginBottom: verticalScale(15),
    color: '#94499c',
    textAlign: 'center',
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: scale(15),
    borderRadius: scale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(5),
    marginBottom: verticalScale(20),
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  label: {
    fontSize: scale(16),
    color: '#333',
    fontWeight: 'bold',
    flex: 1,
  },
  value: {
    fontSize: scale(16),
    color: '#666',
    flex: 2,
  },
  pickerContainer: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: scale(5),
    marginLeft: scale(10),
  },
  picker: {
    height: verticalScale(40),
    width: '100%',
  },
  logoutButton: {
    backgroundColor: '#ff6961',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderRadius: scale(5),
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    fontSize: scale(14),
    marginBottom: verticalScale(0),
    color: '#94499c',
  },
});

export default Profile;
