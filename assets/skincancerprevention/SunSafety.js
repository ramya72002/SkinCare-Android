import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image, TouchableOpacity, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';
import styles from '../styles';

class SunSafety extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedSunSafety: [],
      selectedLanguage: 'en',
      loading: false,
      error: null,
    };

    // Images for the first three subtitles
    this.subtitleImages = [
      require('./banners/sunsafety/sun1.png'),
      require('./banners/sunsafety/sun2.png'),
      require('./banners/sunsafety/sun3.png'),
    ];
  }

  componentDidMount() {
    this.loadPreferredLanguage();
  }

  // Load preferred language from AsyncStorage
  loadPreferredLanguage = async () => {
    try {
      const loginDataString = await AsyncStorage.getItem('loginData');
      if (loginDataString) {
        const loginData = JSON.parse(loginDataString);
        const preferredLanguage = loginData.preferredLanguage || 'en';
        this.setState({ selectedLanguage: preferredLanguage }, this.fetchSunSafety);
      } else {
        this.fetchSunSafety();
      }
    } catch (error) {
      console.error('Failed to load preferred language', error);
      this.fetchSunSafety(); // Proceed to fetch data even if loading language fails
    }
  };

  // Fetch translated data
  fetchSunSafety = () => {
    this.setState({ loading: true });
    const requestBody = {
      language: this.state.selectedLanguage,
    };

    fetch('https://backen-skin-care-app.vercel.app/sunsafetyt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((responseJson) => {
        this.setState({
          translatedSunSafety: responseJson.tips,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  // Render content based on fetched data
  renderContent = (contentArray) => {
    const content = [];
    let currentSubtitle = null;
    let currentContent = [];
    let imageIndex = 0;

    contentArray.forEach((item, idx) => {
      if (item.startsWith('■')) {
        if (currentSubtitle) {
          content.push(
            <View key={currentSubtitle} style={styles.contentBlock}>
              <Text style={styles.subtitle}>{currentSubtitle}</Text>
              {imageIndex < this.subtitleImages.length && (
                <Image
                  style={styles.subtitleImage}
                  source={this.subtitleImages[imageIndex++]}
                />
              )}
              {currentContent.map((point, index) => (
                <View key={index} style={styles.bullet}>
                  <Text style={styles.bulletText}>{'\u2022'}</Text>
                  <Text style={styles.bulletText}>{point}</Text>
                </View>
              ))}
            </View>
          );
        }
        content.push(<Text key={item} style={styles.title}>{item.substring(2)}</Text>);
        currentSubtitle = null;
        currentContent = [];
      } else if (item.startsWith('●')) {
        if (currentSubtitle) {
          content.push(
            <View key={currentSubtitle} style={styles.contentBlock}>
              <Text style={styles.subtitle}>{currentSubtitle}</Text>
              {imageIndex < this.subtitleImages.length && (
                <Image
                  style={styles.subtitleImage}
                  source={this.subtitleImages[imageIndex++]}
                />
              )}
              {currentContent.map((point, index) => (
                <View key={index} style={styles.bullet}>
                  <Text style={styles.bulletText}>{'\u2022'}</Text>
                  <Text style={styles.bulletText}>{point}</Text>
                </View>
              ))}
            </View>
          );
        }
        currentSubtitle = item.substring(2);
        currentContent = [];
      } else if (item.startsWith('->')) {
        currentContent.push(item.substring(2));
      }
    });

    if (currentSubtitle) {
      content.push(
        <View key={currentSubtitle} style={styles.contentBlock}>
          <Text style={styles.subtitle}>{currentSubtitle}</Text>
          {imageIndex < this.subtitleImages.length && (
            <Image
              style={styles.subtitleImage}
              source={this.subtitleImages[imageIndex++]}
            />
          )}
          {currentContent.map((point, index) => (
            <View key={index} style={styles.bullet}>
              <Text style={styles.bulletText}>{'\u2022'}</Text>
              <Text style={styles.bulletText}>{point}</Text>
            </View>
          ))}
        </View>
      );
    }

    // Add additional resource at the end
    content.push(
      <View key="additional-resource" style={styles.contentBlock}>
        <Text style={styles.subtitle}>Additional resources:</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.fda.gov/consumers/consumer-updates/tips-stay-safe-sun-sunscreen-sunglasses')}>
          <Text style={styles.link}> &#8226;https://www.fda.gov/consumers/consumer-updates/tips-stay-safe-sun-sunscreen-sunglasses</Text>
        </TouchableOpacity>
      </View>
    );

    return content;
  };

  render() {
    const { translatedSunSafety, loading, error } = this.state;
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.scrollContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#94499c" />
          ) : (
            <ScrollView contentContainerStyle={styles.scrollView}>
              {this.renderContent(translatedSunSafety)}
            </ScrollView>
          )}
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </View>
    );
  }
}

export default SunSafety;
