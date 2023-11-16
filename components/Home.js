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
          style={{ width: 160, height: 240, borderRadius: 4 }}
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            marginBottom: 4,
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
    <ScrollView>
    <View style={styles.container}>
    <Animated.View
    style={{opacity: fadeAnim}}
    >
      <Image
        source={{
          uri: 'https://cdn.dribbble.com/users/604891/screenshots/16581214/media/bb111973c18ec6b36a067efdecc9a8ff.gif',
        }}
        style={{ width: 200, height: 200 }}
      />
      </Animated.View>
      <View></View>
      <Text style={styles.text}>Best Sellers</Text>
      <ActivityIndicator color="purple" size={30} animating={indicator} />
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal={true}
        keyExtractor={(item) => item.author}
        ItemSeparatorComponent={() => (
          <View style={{ marginBottom: 20, margin: 20 , marginTop:5,}} />
        )}
      />
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDFDFC',
    padding: 8,
  },
  boxView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
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
