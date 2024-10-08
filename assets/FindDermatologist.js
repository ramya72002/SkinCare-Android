import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const scaleWidth = width / 375;
const scaleHeight = height / 667; 

const FindDermatologist = () => {
  const navigation = useNavigation();
  const [selectedState, setSelectedState] = useState('');
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [FindDermatologistData, setFindDermatologistData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showBanner, setShowBanner] = useState(true);

  const bannerImages = [
    require('./dermaBanner/derma.png'),
    require('./dermaBanner/derma1.png'),
    require('./dermaBanner/derma2.png'),
    require('./dermaBanner/derma3.png'),
  ];

  useEffect(() => {
    if (selectedState) {
      fetchCities();
    }
  }, [selectedState]);

  useEffect(() => {
    startBannerSlideshow();
    return () => {
      clearInterval(this.bannerInterval);
    };
  }, []);

  const startBannerSlideshow = () => {
    const bannerInterval = setInterval(() => {
      setCurrentBannerIndex(prevIndex => (prevIndex + 1) % bannerImages.length);
    }, 4000);
    return bannerInterval;
  };

  const fetchCities = async () => {
    const requestBody = JSON.stringify({ state: selectedState });
    try {
      const response = await fetch('https://backen-skin-care-app.vercel.app/cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestBody,
      });
      if (response.ok) {
        const data = await response.json();
        setCities(data.cities);
      } else {
        console.error('Failed to fetch cities');
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const requestBody = JSON.stringify({ state: selectedState, city });

    try {
      const response = await fetch('https://backen-skin-care-app.vercel.app/Doctordetails1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestBody,
      });

      if (response.ok) {
        const responseData = await response.json();
        const FindDermatologistData = responseData.true;
        setFindDermatologistData(FindDermatologistData);
        setLoading(false);
        setShowBanner(false);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {showBanner && (
        <Image
          style={styles.banner}
          source={bannerImages[currentBannerIndex]}
          resizeMode="cover"
        />
      )}

      <Text style={styles.mainHeading}>Find Your Dermatologist in One Click</Text>
      <Text style={styles.subHeading}>Choose your state and city to locate nearby specialists.</Text>

      <Picker
        selectedValue={selectedState}
        onValueChange={(itemValue) => setSelectedState(itemValue)}
        style={styles.input}
      >
  <Picker.Item label="Choose State" value="" />
  <Picker.Item label="Andhra Pradesh" value="AndhraPradesh" />
  <Picker.Item label="Arunachal Pradesh" value="ArunachalPradesh" />
  <Picker.Item label="Assam" value="Assam" />
  <Picker.Item label="Bihar" value="Bihar" />
  <Picker.Item label="Chhattisgarh" value="Chhattisgarh" />
  <Picker.Item label="Goa" value="Goa" />
  <Picker.Item label="Gujarat" value="Gujarat" />
  <Picker.Item label="Haryana" value="Haryana" />
  <Picker.Item label="Himachal Pradesh" value="HimachalPradesh" />
  <Picker.Item label="Jharkhand" value="Jharkhand" />
  <Picker.Item label="Karnataka" value="Karnataka" />
  <Picker.Item label="Kerala" value="Kerala" />
  <Picker.Item label="Madhya Pradesh" value="MadhyaPradesh" />
  <Picker.Item label="Maharashtra" value="Maharashtra" />
  <Picker.Item label="Manipur" value="Manipur" />
  <Picker.Item label="Meghalaya" value="Meghalaya" />
  <Picker.Item label="Mizoram" value="Mizoram" />
  <Picker.Item label="Nagaland" value="Nagaland" />
  <Picker.Item label="Odisha" value="Odisha" />
  <Picker.Item label="Punjab" value="Punjab" />
  <Picker.Item label="Rajasthan" value="Rajasthan" />
  <Picker.Item label="Sikkim" value="Sikkim" />
  <Picker.Item label="Tamil Nadu" value="TamilNadu" />
  <Picker.Item label="Telangana" value="Telangana" />
  <Picker.Item label="Tripura" value="Tripura" />
  <Picker.Item label="Uttar Pradesh" value="UttarPradesh" />
  <Picker.Item label="Uttarakhand" value="Uttarakhand" />
  <Picker.Item label="West Bengal" value="WestBengal" />
  <Picker.Item label="Andaman and Nicobar Islands" value="AndamanNicobar" />
  <Picker.Item label="Chandigarh" value="Chandigarh" />
  <Picker.Item label="Dadra and Nagar Haveli and Daman and Diu" value="DadraNagarHaveliDamanDiu" />
  <Picker.Item label="Lakshadweep" value="Lakshadweep" />
  <Picker.Item label="Delhi" value="Delhi" />
  <Picker.Item label="Puducherry" value="Puducherry" />
  {/* Add any other union territories or custom regions here */}
</Picker>

      
      <Picker
        selectedValue={city}
        onValueChange={(itemValue) => setCity(itemValue)}
        style={styles.input}
        enabled={cities.length > 0}
      >
        <Picker.Item label="Select City" value="" />
        {cities.map((cityName, index) => (
          <Picker.Item key={index} label={cityName} value={cityName} />
        ))}
      </Picker>

      <TouchableOpacity
        style={styles.button}
        onPress={fetchData}
        disabled={!selectedState || !city || loading}
      >
        <Text style={styles.buttonText}>Find Nearby Dermatologist</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer}>
  {loading ? (
    <ActivityIndicator size="large" color="#94499c" style={styles.loader} />
  ) : (
    FindDermatologistData.filter(item => item.phone).map((item, index) => (
      <View key={index} style={styles.itemContainer}>
        <Text style={styles.itemText}>Name: {item.name}</Text>
        <Text style={styles.itemText}>Address: {item.address}</Text>
        <Text style={styles.itemText}>City: {item.city}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.phone}`)}>
          <Text style={[styles.itemText, styles.phoneLink]}>Phone: {item.phone}</Text>
        </TouchableOpacity>
      </View>
    ))
  )}
  {error && <Text style={styles.errorText}>{error}</Text>}
</ScrollView>

      <View style={styles.footer}>
      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Categories')}>
        <Ionicons name="home" size={24} color="white" />
        <Text style={styles.tabText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Weather')}>
        <Ionicons name="cloud" size={24} color="white" />
        <Text style={styles.tabText}>Weather</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('FindDermatologist')}>
        <Ionicons name="search" size={20} color="white" />
        <Text style={styles.tabText}>Find Dermatologist</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person" size={24} color="white" />
        <Text style={styles.tabText}>Profile</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5 * scaleHeight,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  banner: {
    width: '100%',
    height: 0.3 * height,
    borderRadius: 10 * scaleWidth,
    marginBottom: 20 * scaleHeight,
  },
  mainHeading: {
    marginTop: 20 * scaleHeight,

    fontSize: 22 * scaleWidth,
    fontWeight: 'bold',
    marginBottom: 5 * scaleHeight,
    color: '#5a2d82',
  },
  subHeading: {
    fontSize: 16 * scaleWidth,
    color: '#5a5a5a',
    marginBottom: 15 * scaleHeight,
    textAlign: 'center',
    paddingHorizontal: 20 * scaleWidth,
  },
  input: {
    width: '80%',
    marginBottom: 10 * scaleHeight,
    borderColor: '#ccc',
    borderWidth: 1 * scaleWidth,
    borderRadius: 10 * scaleWidth,
    paddingHorizontal: 10 * scaleWidth,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#94499c',
    borderRadius: 10 * scaleWidth,
    paddingVertical: 12 * scaleHeight,
    paddingHorizontal: 20 * scaleWidth,
    marginBottom: 20 * scaleHeight,
  },
  buttonText: {
    color: 'white',
    fontSize: 16 * scaleWidth,
    fontWeight: '600',
  },
  loader: {
    marginTop: 20 * scaleHeight,
  },
  scrollContainer: {
    width: '100%',
    marginTop: 10 * scaleHeight,
    // marginBottom: 10 * scaleHeight,
  },
  itemContainer: {
    backgroundColor: '#94499c',
    padding: 15 * scaleWidth,
    marginBottom: 10 * scaleHeight,
    marginLeft: 10 * scaleWidth,
    marginRight: 10 * scaleWidth,
    borderRadius: 10 * scaleWidth,
  },
  itemText: {
    fontSize: 15 * scaleWidth,
    color: 'white',
  },
  phoneLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginTop: 10 * scaleHeight,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1 * scaleWidth,
    borderTopColor: '#ccc',
    backgroundColor: '#94499c',
    paddingVertical: 10 * scaleHeight,
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    fontSize: 12 * scaleWidth,
  },
});

export default FindDermatologist;
