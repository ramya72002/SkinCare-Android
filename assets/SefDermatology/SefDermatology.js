import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';
import { scale, verticalScale } from '../../utils/scaling'; // Import scaling utilities

const SefDermatology = ({ navigation, route }) => {
  const [preferredLanguage, setPreferredLanguage] = useState('en');

  useEffect(() => {
    const getPreferredLanguage = async () => {
      try {
        const languageData = await AsyncStorage.getItem('loginData');
        const language = languageData ? JSON.parse(languageData).preferredLanguage : 'en';
        setPreferredLanguage(language);
      } catch (error) {
        console.error(error);
      }
    };

    getPreferredLanguage();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.mainHeading}>Common Skin Conditions</Text>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("Infectious", { preferredLanguage })}
        >
          <ImageBackground source={require('./images/image33.png')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>Infectious Skin Diseases</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("Inflaauto", { preferredLanguage })}
        >
          <ImageBackground source={require('./images/image44.png')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>Inflammatory and Autoimmune Skin Conditions</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("Pigmentary", { preferredLanguage })}
        >
          <ImageBackground source={require('./images/image22.png')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>Pigmentary Disorders</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("Hair", { preferredLanguage })}
        >
          <ImageBackground source={require('./images/image11.png')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>Hair and Scalp Disorders</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("Envdisorder", { preferredLanguage })}
        >
          <ImageBackground source={require('./images/image88.png')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>Environmental and Occupational Disorders</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("Additional", { preferredLanguage })}
        >
          <ImageBackground source={require('./images/image.png')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>Additional Resources: Building a Balanced Diet</Text>
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
    fontSize: scale(28), // Scaled for consistency
    fontWeight: 'bold',
    marginVertical: verticalScale(10), // Adjusted for vertical spacing
    color: '#94499c',
    textAlign: 'center',
  },
  scrollContainer: {
    padding: scale(20), // Scaled padding for uniformity
    alignItems: 'center',
  },
  typeButton: {
    width: scale(330), // 90% of screen width with scaling
    height: verticalScale(200), // 25% of screen height with scaling
    borderRadius: scale(10), // Scaled border radius
    marginBottom: verticalScale(20), // Scaled vertical margin
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: scale(22), // Scaled font size
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: scale(10), // Scaled padding for better readability
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: scale(10), // Scaled border radius for consistency
    opacity: 0.8,
  },
});

export default SefDermatology;
