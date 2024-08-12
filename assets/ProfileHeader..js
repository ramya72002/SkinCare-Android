import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const { width } = Dimensions.get('window'); // Get screen width

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: { 
    height: 50,  
    backgroundColor: '#94499c',
    flexDirection: 'row',
    alignItems: 'center',  // Center aligns items vertically
  },
  backButton: { 
    marginLeft: 10, // Adjust if necessary
    marginTop: 10, // Moves the back arrow down
  },
  headerText: {
    color: '#fff',
    fontSize: 28,
    marginLeft: 10,
  },
});

export default Header;
