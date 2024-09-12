import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import Header from '../Header';
import { scale, verticalScale } from '../../utils/scaling'; // Adjust the path as necessary

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
    fontSize: verticalScale(25), // Scaled font size
    fontWeight: 'bold',
    marginVertical: verticalScale(20),
    color: '#94499c',
    textAlign: 'center',
    paddingBottom: verticalScale(1),
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: verticalScale(50), // Scaled bottom padding
  },
  typeButton: {
    width: scale(225), // Scaled width
    height: verticalScale(180), // Scaled height
    borderRadius: scale(10),
    marginBottom: verticalScale(10),
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: verticalScale(20), // Scaled font size
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
    borderRadius: scale(10),
    opacity: 0.8,
  },
});

export default SkinCancerTypes;
