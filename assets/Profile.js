import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';

const Profile = ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const loginDataString = await AsyncStorage.getItem('loginData');
        if (loginDataString) {
          const loginData = JSON.parse(loginDataString);
          setProfileData(loginData);
          setPreferredLanguage(loginData.preferredLanguage || 'en');
        }
      } catch (error) {
        console.error('Failed to load profile data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

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
          <Text style={styles.label}>Contact Number:</Text>
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
      
      {/* Footer Section */}
      <Text style={styles.footerText}>Designed and Developed by NVision IT</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#94499c',
    textAlign: 'center',
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Align the label and picker vertically
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    flex: 1, // Make the label take up some space
  },
  pickerContainer: {
    flex: 2, // Adjust flex value to control the width of the picker relative to the label
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginLeft: 10, // Add some spacing between label and picker
  },
  picker: {
    height: 40,
    width: '100%',
  },
   
  logoutButton: {
    backgroundColor: '#ff6961',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
    color: '#94499c',
  },
});

export default Profile;
