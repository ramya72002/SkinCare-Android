import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import { scale, verticalScale } from '../utils/scaling'; // Adjust the path as necessary

const { width } = Dimensions.get('window'); // Get screen width

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={scale(30)} color="#fff" />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: { 
    height: verticalScale(50),  // Scaled height
    backgroundColor: '#94499c',
    flexDirection: 'row',
    alignItems: 'center',  // Center aligns items vertically
  },
  backButton: { 
    marginLeft: scale(10), // Scaled margin for responsiveness
    marginTop: verticalScale(10), // Scaled marginTop to move down based on screen height
    flexDirection: 'row', // Aligns icon and text horizontally
    alignItems: 'center', // Center aligns icon and text vertically
  },
  headerText: {
    color: '#fff',
    fontSize: scale(16), // Scaled font size
    marginLeft: scale(5), // Margin between the icon and the text
  },
});

export default Header;
