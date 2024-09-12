import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Scaling functions
const scale = (size) => (width / 375) * size; // 375 is the base width
const verticalScale = (size) => (height / 667) * size; // 667 is the base height
const scaleFont = (size) => size * (width / 375); // Scaling for font sizes

const Categories = ({ navigation, route }) => {
  const { preferredLanguage } = route.params || { preferredLanguage: 'en' };

  return (
    <View> 
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.heading}>Categories</Text>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('SkinCancerTypes', { preferredLanguage })}
          >
            <Image
              source={require('./categoryImages/bb.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Skin Cancer Types</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('SkinCancerPrevention', { preferredLanguage })}
          >
            <Image
              source={require('./categoryImages/bb4.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Skin Cancer Prevention</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('SefDermatology', { preferredLanguage })}
          >
            <Image
              source={require('./categoryImages/bb5.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Common Skin Conditions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    // paddingVertical: verticalScale(20), // Scaled padding
  },
  container: {
    flex: 1,
    padding: scale(20), // Scaled padding
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: scaleFont(40), // Scaled font size for heading
    fontWeight: 'bold',
    marginBottom: verticalScale(20), // Scaled margin
    color: '#94499c',
  },
  box: {
    width: scale(320), // Scaled box width
    height: verticalScale(150), // Scaled box height
    marginBottom: verticalScale(20), // Scaled margin
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: scale(10), // Scaled border radius
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: scale(10), // Scaled shadow radius
    shadowOffset: { width: 0, height: scale(5) }, // Scaled shadow offset
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(10), // Scaled border radius for the image
    position: 'absolute',
    opacity: 0.8,
  },
  title: {
    fontSize: scaleFont(25), // Scaled font size for title
    fontWeight: 'bold',
    color: '#fff',
    zIndex: 1,
  },
});

export default Categories;
