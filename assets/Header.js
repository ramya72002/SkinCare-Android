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
    height: 100,
    backgroundColor: '#94499c',
    flexDirection: 'row',
    // alignItems: 'center',
    // paddingHorizontal: 10,
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOpacity: 0.4,
    // shadowRadius: 10,
    // shadowOffset: { width: 30, height: 80 },
  },
  backButton: {
    width: 50,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
