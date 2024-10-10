import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Get device dimensions
const { width } = Dimensions.get('window');

// Scaling functions
const scale = (size) => (width / 375) * size; // 375 is the base width
const verticalScale = (size) => size * (width / 375); // Scaling for both width and height-based properties

const About = () => {
  const navigation = useNavigation(); // Hook to access navigation

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('./anika1.jpg')} // Replace with the correct path to the image
            style={styles.image}
          />
        </View>
        <Text style={styles.title}>Hi! My name is Anika Pulumati</Text>
        <Text style={styles.subtitle}>Medical Student & Aspiring Dermatologist</Text>
        <Text style={styles.description}>
          I am a current medical student and aspiring dermatologist with a passion for making a difference in cutaneous health! 
          My journey through medicine has shown me the critical importance of accessible dermatological care. 
          That’s why I’m excited to introduce SkinSaathi — A comprehensive mobile application that addresses the unique dermatological 
          needs of India’s diverse population.
        </Text>
        <Text style={styles.description}>
          SkinSaathi focuses on sun safety and skin cancer awareness, specifically tailored to the climatic, cultural, and socioeconomic 
          conditions of India. With an emphasis on education, support, and community outreach, SkinSaathi offers resources to empower 
          individuals across the country with the knowledge and tools to take charge of their skin health.
        </Text>
        <Text style={styles.description}>
          Our mission is to promote proactive skin care, provide easier access to dermatological care, and ultimately cultivate a healthier, 
          more informed community. Join us in our mission to protect your skin, foster a proactive approach to skin health, and cultivate 
          a healthier future for all!
        </Text>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigation.navigate('Signup')} // Navigate to SignUp screen
        >
          <Text style={styles.signUpButtonText}>Create An Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e0f7fa', // Light cyan background for a professional look
  },
  contentContainer: {
    flexGrow: 1,
    padding: scale(20),
    backgroundColor: '#ffffff', // White background for the content area
    borderRadius: scale(12), // Rounded corners for a modern look
    borderWidth: 2, // Border width
    borderColor: '#00796b', // Professional teal border color
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, // For Android shadow
    alignItems: 'center',
    margin: scale(10), // Margin around the content area
  },
  imageContainer: {
    shadowColor: '#000',
    shadowRadius: 15,
    elevation: 20, // For Android shadow
    marginBottom: verticalScale(20),
  },
  image: {
    width: verticalScale(200),
    height: verticalScale(220),
    borderRadius: scale(100), // Circular shape
    borderWidth: 3,
    borderColor: '#ffffff', // Subtle white border for a clean look
  },
  title: {
    fontSize: scale(26),
    fontWeight: '700',
    color: '#004d40', // Dark cyan for a professional look
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scale(18),
    color: '#00796b', // Slightly lighter shade of cyan for the subtitle
    marginBottom: verticalScale(20),
    textAlign: 'center',
    fontStyle: 'italic',
  },
  description: {
    fontSize: scale(16),
    color: '#004d40',
    textAlign: 'justify',
    lineHeight: verticalScale(24),
    marginBottom: verticalScale(15),
    paddingHorizontal: scale(10), // Padding for readability
  },
  signUpButton: {
    backgroundColor: '#00796b', // Professional teal color for the button
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(30),
    borderRadius: scale(8),
    marginTop: verticalScale(30),
    borderWidth: 2, // Button border for better visibility
    borderColor: '#004d40', // Dark cyan border color
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default About;
