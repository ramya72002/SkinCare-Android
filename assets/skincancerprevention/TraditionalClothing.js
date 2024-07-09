import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image, TouchableOpacity, Linking } from 'react-native';
import Header from '../Header';
import styles from '../styles'; // Import the styles

class TraditionalClothing extends Component {
  constructor(props) {
    super(props);
    const { preferredLanguage } = props.route.params;
    this.state = {
      translatedTraditionalClothing: [],
      selectedLanguage: preferredLanguage || 'en',
      loading: false,
      error: null,
    };

    // Images for the first three subtitles
    this.subtitleImages = [
      require('./banners/tradClothing/image1.png'),
      require('./banners/tradClothing/image2.png'),
      require('./banners/tradClothing/image3.png'),
      require('./banners/tradClothing/image4.png'),
      
      require('./banners/tradClothing/image5.png'),
      require('./banners/tradClothing/image6.png'),
      require('./banners/tradClothing/image9.png'),

      require('./banners/tradClothing/image7.png'),
      require('./banners/tradClothing/image8.png'),
      
       
    ];
  }

  componentDidMount() {
    this.fetchTraditionalClothing();
  }

  // Fetch translated data
  fetchTraditionalClothing = () => {
    this.setState({ loading: true });
    const requestBody = {
      language: this.state.selectedLanguage,
    };

    fetch('https://backen-skin-care-app.vercel.app/traditionalct', {
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
          translatedTraditionalClothing: responseJson.tips,
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
        <TouchableOpacity onPress={() => Linking.openURL('https://www.aad.org/public/everyday-care/sun-protection/shade-clothing-sunscreen/what-to-wear-protect-skin-from-sun')}>
          <Text style={styles.link}> &#8226;https://www.aad.org/public/everyday-care/sun-protection/shade-clothing-sunscreen/what-to-wear-protect-skin-from-sun</Text>
        </TouchableOpacity>
      </View>
    );

    return content;
  };

  render() {
    const { translatedTraditionalClothing, loading, error } = this.state;
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.scrollContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#94499c" />
          ) : (
            <ScrollView contentContainerStyle={styles.scrollView}>
              {this.renderContent(translatedTraditionalClothing)}
            </ScrollView>
          )}
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </View>
    );
  }
}

export default TraditionalClothing;
