import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from './Header';
import { scale, verticalScale } from '../utils/scaling'; // Import the scaling functions

const UserForum = () => {
  const handleJoinGroup = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.header}>User Forum</Text>
      <Text style={styles.quote}>
        "Healthy skin is a reflection of overall wellness."
      </Text>
      <Text style={styles.quote}>
        "Invest in your skin. It is going to represent you for a very long time."
      </Text>

      <Text style={styles.subheader}>Join Our WhatsApp Groups</Text>
      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => handleJoinGroup('https://chat.whatsapp.com/LhCirXFH0y53ow87DZBcpO')}
      >
        <Ionicons name="logo-whatsapp" size={scale(24)} color="#25D366" />
        <Text style={styles.linkText}>Group 1: Skincare Tips</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => handleJoinGroup('https://chat.whatsapp.com/LhCirXFH0y53ow87DZBcpO')}
      >
        <Ionicons name="logo-whatsapp" size={scale(24)} color="#25D366" />
        <Text style={styles.linkText}>Group 2: Skincare Discussions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(10),
    backgroundColor: '#f0f8ff',
  },
  header: {
    fontSize: scale(28),
    fontWeight: 'bold',
    marginBottom: verticalScale(0),
    textAlign: 'center',
    color: '#94499c',
  },
  quote: {
    fontSize: scale(18),
    fontStyle: 'italic',
    marginVertical: verticalScale(0),
    textAlign: 'center',
    color: '#555',
  },
  subheader: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(10),
    textAlign: 'center',
    color: '#94499c',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
    marginVertical: verticalScale(6),
    backgroundColor: '#e8f4f8',
    borderRadius: scale(8),
    borderColor: '#94499c',
    borderWidth: 1,
  },
  linkText: {
    marginLeft: scale(10),
    fontSize: scale(18),
    color: '#007bff',
  },
});

export default UserForum;
