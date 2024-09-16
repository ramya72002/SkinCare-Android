import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';
import { scale, verticalScale } from '../../utils/scaling'; // Import scaling utilities

const SkinCancerPrevention = ({ navigation, route }) => {
  const [preferredLanguage, setPreferredLanguage] = useState('en');

  useEffect(() => {
    const getPreferredLanguage = async () => {
      try {
        const languageData = await AsyncStorage.getItem('loginData');
        const language = languageData ? JSON.parse(languageData).preferredLanguage : 'en';
        setPreferredLanguage(language);
      } catch (error) {
        console.error('Failed to load preferred language', error);
      }
    };

    getPreferredLanguage();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.mainHeading}>Skin Cancer Prevention</Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("SunSafety", { preferredLanguage })}
        >
          <ImageBackground source={require('./images/ss1.png')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>Sun Safety Practices</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("TraditionalClothing", { preferredLanguage })}
        >
          <ImageBackground source={require('./images/ss7.png')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>Traditional Clothing</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("UVindex", { preferredLanguage })}
        >
          <ImageBackground source={require('./images/ss4.png')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>UV index</Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(0),
    backgroundColor: '#f5f5f5',
  },
  mainHeading: {
    paddingTop: verticalScale(1),
    fontSize: verticalScale(28),
    fontWeight: 'bold',
    marginVertical: verticalScale(20),
    color: '#94499c',
    textAlign: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: verticalScale(30),
  },
  typeButton: {
    width: scale(300),
    height: verticalScale(200),
    borderRadius: scale(10),
    marginBottom: verticalScale(20),
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: verticalScale(20),
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: scale(10),
    opacity: 0.8,
  },
});

export default SkinCancerPrevention;
