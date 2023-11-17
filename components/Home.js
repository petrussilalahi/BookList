import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ScrollView, 
  Animated,
} from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { BookNav } from './Book.js';
import * as Font from 'expo-font';


export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [indicator, setIndicator] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 5000,
      }
    ).start();
  }, [fadeAnim])

  useEffect(() => {
    setIndicator(true);
    fetch(
      'https://api.nytimes.com/svc/books/v3/lists/hardcover-fiction?response-format=json&api-key=yYyHlpxh9hNIObhzKkBH4eirfaqEW3QW'
    )
      .then((x) => x.json())
      .then((json) => {
            setIndicator(false);
        setData(json.results.books);
      });
  }, []);

  const renderItem = ({ item, idx }) => {
    const image = item.book_image;
    const title = item.title;
    const author = item.author;
    const desc = item.description;

    return (
      <View style={styles.boxView} key={idx}>
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, borderRadius: 4, objectFit:'contain' }}
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: 'gray',
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          written By {author}
        </Text>
        {BookNav(navigation, title, author, image, desc)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.author}
        ItemSeparatorComponent={() => (
          <View style={{ marginBottom: 20, margin: 20 , marginTop:5,}} />
        )}
        numColumns={2}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  boxView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    margin: 1
  },
  text: {
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 0,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
