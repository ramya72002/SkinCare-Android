import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import Header from '../Header';

const { width, height } = Dimensions.get('window');

const SkinCancerTypes = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.mainHeading}>Skin Cancer Types</Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("BCComponent")}
        >
          <ImageBackground source={require('./BCC.jpg')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>BCC</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("SCComponent")}
        >
          <ImageBackground source={require('./SCC.jpg')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>SCC</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("MelanomaComponent")}
        >
          <ImageBackground source={require('./MEM.jpg')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>Melanoma</Text>
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
    marginVertical: 20,
    color: '#94499c',
    textAlign: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 0.08 * height, // 5% of screen height for bottom padding
  },
  typeButton: {
    width: 0.60 * width, // 45% of screen width
    height: 0.28 * height, // 25% of screen height
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 0.03 * height, // 3% of screen height
    color: '#fff',
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

export default SkinCancerTypes;
