import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';

const { width, height } = Dimensions.get('window');

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
    fontSize: width * 0.07,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    color: '#94499c',
    textAlign: 'center',
  },
  scrollContainer: {
    padding: width * 0.05,
    alignItems: 'center',
  },
  typeButton: {
    width: width * 0.9,
    height: height * 0.25,
    borderRadius: 10,
    marginBottom: height * 0.02,
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: width * 0.07,
    marginBottom: height * 0.01,
    marginTop: height * 0.1,
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

export default SefDermatology;
