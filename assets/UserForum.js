import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../Header';

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
        <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
        <Text style={styles.linkText}>Group 1: Skincare Tips</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => handleJoinGroup('https://chat.whatsapp.com/LhCirXFH0y53ow87DZBcpO')}
      >
        <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
        <Text style={styles.linkText}>Group 2: Skincare Discussions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#94499c', 
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    marginVertical: 10,
    textAlign: 'center',
    color: '#555', 
  },
  subheader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
    color: '#94499c', 
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#e8f4f8',
    borderRadius: 8,
    borderColor: '#94499c',
    borderWidth: 1,
  },
  linkText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#007bff', 
  },
});

export default UserForum;
