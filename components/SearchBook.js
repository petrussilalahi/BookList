import {
  Text,
  StyleSheet,
  FlatList,
  Image,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useState } from 'react';
import { BookNav } from './Book.js';
import { SaveSearch } from '../redux/actions/index';
import { connect } from 'react-redux';
import * as Font from 'expo-font';

function SearchBook({ navigation, SaveSearch }) {
  const [data, setData] = useState([]);
  const [key, setKeyword] = useState('');
  const [indicator, setIndicator] = useState(false);

  const GetData = () => {
    setIndicator(true);
    fetch(
      'https://www.googleapis.com/books/v1/volumes?q=' + key + '&maxResults=20'
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json.items);
        setIndicator(false);
        console.log('Fetching');
      });
  };

  const Entry = ({ item }) => {
    const sTitle = item.volumeInfo.title;
    const sAuthor = item.volumeInfo.authors;
    const sDesc = item.volumeInfo.description;

    var url = '';
    if (item.volumeInfo != null) {
      if (item.volumeInfo.imageLinks != null) {
        url = item.volumeInfo.imageLinks.thumbnail;
        return (
          <SafeAreaView style={styles.entry}>
            <View style={styles.imageContainer}>
              <Image
                onLoad={() => {}}
                style={styles.image}
                source={{ uri: url }}></Image>
            </View>
            <View style={styles.textStyle}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                {item.volumeInfo.title}
              </Text>
              {
                item.volumeInfo.subtitle != null ? ( <Text style={{ fontSize: 15, fontStyle: 'italic' }}>
                {item.volumeInfo.subtitle}
              </Text>) : null
              }
              <Text> </Text>
              <Text> Author: {item.volumeInfo.authors}</Text>
              <Text> Publisher: {item.volumeInfo.publisher}</Text>
              <Text> Number of Pages: {item.volumeInfo.pageCount}</Text>
              <Text> Average rating: {item.volumeInfo.averageRating}★</Text>
              {BookNav(navigation, sTitle, sAuthor, url, sDesc)}
            </View>
          </SafeAreaView>
        );
      } else {
        return (
          <SafeAreaView style={styles.entry}>
            <View style={styles.imageContainer}>
              <Image
                onLoad={() => {}}
                style={styles.image}
                source={require('../assets/imagenot.jpg')}></Image>
            </View>
            <View style={styles.textStyle}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                {item.volumeInfo.title}
              </Text>
              <Text style={{ fontSize: 15, fontStyle: 'italic' }}>
                {item.volumeInfo.subtitle}
              </Text>
              <Text> </Text>
              <Text> Author: {item.volumeInfo.authors}</Text>
              <Text> Publisher: {item.volumeInfo.publisher}</Text>
              <Text> Number of Pages: {item.volumeInfo.pageCount}</Text>
              <Text> Average rating: {item.volumeInfo.averageRating}★</Text>
              {BookNav(navigation, sTitle, sAuthor, url, sDesc)}
            </View>
          </SafeAreaView>
        );
      }
    } else {
      return (
        <SafeAreaView>
          <Text>Not found</Text>
        </SafeAreaView>
      );
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.sectionStyle}>
        <Image
          source={{
            uri: 'https://img.icons8.com/ios-filled/50/null/search--v1.png',
          }}
          style={styles.imageStyle}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Enter keyword"
          value={key}
          onChangeText={setKeyword}
          maxLength={25}/>
      </View>

      <TouchableHighlight
        underlayColor="cyan"
        onPress={() => [GetData(key), SaveSearch(key)]}>
        <View style={styles.touchableItem}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Get books</Text>
          <Text style={{ color: 'gray', fontSize: 10 }}>
            Search for books by title or author
          </Text>
          <Image
            source={{
              uri: 'https://img.icons8.com/external-anggara-glyph-anggara-putra/32/null/external-book-school-anggara-glyph-anggara-putra-4.png',
            }}
            style={styles.imageStyleBook}
          />
        </View>
      </TouchableHighlight>
      <ActivityIndicator color="purple" size={30} animating={indicator} />
      <FlatList data={data} renderItem={Entry} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
  },

  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',

    borderBottomWidth: 1,
    padding: 0,
    justifyContent: 'space-between',
  },
  touchableItem: {
    borderWidth: 2,
    borderColor: '#5D8AA8',
    padding: 5,
    borderRadius: 4,
  },
  textStyle: {
    flexShrink: 1,
    width: 260,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: 'bold',

    color: '#222',
  },

  image: {
    width: 80,
    height: 120,
    borderRadius: 10,
  },
  imageStyle: {
    position: 'absolute',
    padding: 10,
    margin: 5,
    height: 30,
    width: 30,
    top: 5,
    left: 0,
    bottom: 0,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  textinput: {
    paddingVertical: 0,
    outlineStyle: 'none',
  },

  imageStyleBook: {
    position: 'absolute',
    padding: 10,
    margin: 5,
    height: 30,
    width: 30,
    top: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 50,
    borderRadius: 5,
    margin: 10,
  },
});

const mapDispatchToProps = { SaveSearch };

const mapStateToProps = (store) => ({
  search_history: store.saveSearchReducer.search_history,
});

export { SearchBook };
export default connect(mapStateToProps, mapDispatchToProps)(SearchBook);
