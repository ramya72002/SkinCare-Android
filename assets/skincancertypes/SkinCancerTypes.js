import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import Header from '../Header';

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
    fontSize: 34,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#94499c',
    textAlign: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20, // Add padding to the bottom to ensure last item is scrollable
  },
  typeButton: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 26,
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
