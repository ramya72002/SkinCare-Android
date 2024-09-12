import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';
const { width, height } = Dimensions.get('window');

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
          <ImageBackground source={require('./images/ss2.png')} style={styles.image} imageStyle={styles.imageStyle}>
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
    backgroundColor: '#f5f5f5',
  },
  mainHeading: {
    fontSize: 0.04 * height, // 4% of screen height
    fontWeight: 'bold',
    marginVertical: 0.02 * height, // 2% of screen height
    color: '#94499c',
    textAlign: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 0.05 * height, // 5% of screen height for bottom padding
  },
  typeButton: {
    width: 0.8 * width, // 80% of screen width
    height: 0.25 * height, // 25% of screen height
    borderRadius: 10,
    marginBottom: 0.02 * height, // 2% of screen height for margin
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 0.03 * height, // 3% of screen height
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
    borderRadius: 10,
    opacity: 0.8,
  },
});

export default SkinCancerPrevention;
