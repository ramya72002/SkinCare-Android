import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons

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
    width: '100%',
    height: 50,
    backgroundColor: '#94499c',
    flexDirection: 'row'
  },
  backButton: {
    width: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
