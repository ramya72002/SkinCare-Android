import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { scale, verticalScale } from '../utils/scaling'; // Assuming the scaling functions are in a file called scaling.js
import Header from './Header';

const Weather = () => {
  const [selectedState, setSelectedState] = useState('');
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [uvIndex, setUvIndex] = useState([]);
  const [wind, setWind] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (selectedState) {
      fetchCities();
    }
  }, [selectedState]);

  const fetchCities = async () => {
    const requestBody = JSON.stringify({ state: selectedState });

    try {
      const response = await fetch('https://backen-skin-care-app.vercel.app/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    setIsLoading(true);
    const requestBody = JSON.stringify({ state: selectedState, city });

    try {
      const [weatherResponse, uvIndexResponse, windResponse] = await Promise.all([
        fetch('https://backen-skin-care-app.vercel.app/weather', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody,
        }),
        fetch('https://backen-skin-care-app.vercel.app/uvindex', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody,
        }),
        fetch('https://backen-skin-care-app.vercel.app/wind', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody,
        }),
      ]);

      const weatherData = await weatherResponse.json();
      const uvIndexData = await uvIndexResponse.json();
      const windData = await windResponse.json();

      setWeatherData(weatherData.slice(0, 2));
      setUvIndex(uvIndexData.slice(0, 2));
      setWind(windData.slice(0, 3));
      setDataFetched(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Pick Your State:</Text>
        <Picker
          selectedValue={selectedState}
          onValueChange={(itemValue) => setSelectedState(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Choose State" value="" />
          <Picker.Item label="Andhra Pradesh" value="AndhraPradesh" />
          <Picker.Item label="Arunachal Pradesh" value="ArunachalPradesh" />
          {/* Add other states here */}
        </Picker>

        <Text style={styles.pickerLabel}>Choose Your City:</Text>
        <Picker
          selectedValue={city}
          onValueChange={(itemValue) => setCity(itemValue)}
          style={styles.input}
          enabled={cities.length > 0}
        >
          <Picker.Item label="Choose City" value="" />
          {cities.map((cityName, index) => (
            <Picker.Item key={index} label={cityName} value={cityName} />
          ))}
        </Picker>

        <Button title="Get Weather Details" onPress={fetchData} color="#007AFF" />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Image
            source={require('../assets/1495.gif')}
            style={styles.loadingImage}
          />
          <Text style={styles.loadingText}>Fetching the latest data...</Text>
        </View>
      ) : (
        dataFetched && (
          <ScrollView style={styles.dataContainer}>
            <Text style={styles.title}>Current Weather</Text>
            <View style={styles.table}>
              {weatherData.map((row, index) => (
                <View key={index} style={styles.row}>
                  {row.map((cell, cellIndex) => (
                    <Text key={cellIndex} style={styles.cell}>{cell}</Text>
                  ))}
                </View>
              ))}
            </View>

            <Text style={styles.title}>UV Index</Text>
            <View style={styles.table}>
              {uvIndex.map((row, index) => (
                <View key={index} style={styles.row}>
                  {row.map((cell, cellIndex) => (
                    <Text key={cellIndex} style={styles.cell}>{cell}</Text>
                  ))}
                </View>
              ))}
            </View>

            <Text style={styles.title}>Wind Direction</Text>
            <View style={styles.table}>
              {wind.map((row, index) => (
                <View key={index} style={styles.row}>
                  {row.map((cell, cellIndex) => (
                    <Text key={cellIndex} style={styles.cell}>{cell}</Text>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  pickerContainer: {
    padding: scale(20),
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: scale(10),
    margin: scale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.2,
    shadowRadius: scale(5),
  },
  pickerLabel: {
    fontSize: scale(16),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: scale(5),
    padding: verticalScale(10),
    marginBottom: verticalScale(10),
    width: '100%',
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: scale(22),
    fontWeight: 'bold',
    marginVertical: verticalScale(10),
    textAlign: 'center',
    color: '#333',
  },
  dataContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
    marginTop: verticalScale(10),
    backgroundColor: 'lightblue',
    padding: verticalScale(10),
    borderRadius: scale(10),
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    padding: verticalScale(10),
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    fontWeight: 'bold',
    color: 'red',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingImage: {
    width: scale(80),
    height: scale(80),
  },
  loadingText: {
    marginTop: verticalScale(10),
    fontSize: scale(16),
    color: '#555',
  },
});

export default Weather;
