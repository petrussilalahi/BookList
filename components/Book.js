import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Pressable,
  Animated,
} from 'react-native';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FavBook } from '../redux/actions/index';
import { connect } from 'react-redux';

const BookNav = (navigation, title, author, image, desc, isFav) => (
  <Button
    title="View Book"
    color="#74cfe8"
    onPress={() => [
      console.log(title, author, image, desc, isFav),
      navigation.navigate('Book', {
        title: title,
        author: author,
        img: image,
        desc: desc,
        isFav: isFav,
      }),
    ]}
  />
);

const Book = ({ route, FavBook, fav_books }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const author = route.params.author;
  const title = route.params.title;
  const image = route.params.img;
  const desc = route.params.desc;
  const isFav = route.params.isFav;
  

  const anim = useRef(new Animated.Value(0));

  const shake = useCallback(() => {
    console.log('Hello');
    // makes the sequence loop
    Animated.loop(
      // runs the animation array in sequence
      Animated.sequence([
        // shift element to the left by 2 units
        Animated.timing(anim.current, {
          toValue: -2,
          duration: 50,
        }),
        // shift element to the right by 2 units
        Animated.timing(anim.current, {
          toValue: 2,
          duration: 50,
        }),
        // bring the element back to its original position
        Animated.timing(anim.current, {
          toValue: 0,
          duration: 50,
        }),
      ]),
      // loops the above animation config 2 times
      { iterations: 2 }
    ).start();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <Image style={styles.imagebook} source={{ uri: image }} />

          <Text style={styles.bookTitle}>{title}</Text>
          <Text style={styles.bookAuthor}>{author}</Text>
        </View>
        <View style={styles.styleBtn}></View>
        <View></View>
        <Image
          source={{
            uri: 'https://img.icons8.com/ios-filled/50/null/open-book.png',
          }}
          style={{ width: 30, height: 30, margin: 10 }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Added to favourites!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{ fontSize: 12 }}>Hide</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          <Animated.View style={{ transform: [{ translateX: anim.current }] }}>
            <Button
              title="Favourite Book"
              color="#17315c"
              type="outline"
              mode="contained"
              onPress={()=> {
              shake();
              FavBook(title, author, image, desc),
              setModalVisible(true)
              }}
            />
          </Animated.View>
        </View>
        <Text style={styles.bookDesc}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'blue' }}>
            {' '}
            Description{' '}
          </Text>
          :{desc}
        </Text>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imagebook: {
    borderRadius: 15,
    width: 200,
    height: 300,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
  },
  bookTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
    margin: 5,
  },
  bookAuthor: {
    fontSize: 18,
    margin: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
    color: 'blue',
  },
  bookDesc: {
    fontSize: 15,
    marginLeft: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
  },
  styleBtn: {
    marginBottom: 0,
    marginTop: 0,
    marginLeft: 70,
    marginRight: 70,
    flex: 0,
    justifyContent: 'center',
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

const mapDispatchToProps = { FavBook };
const mapStateToProps = (state) => ({ fav_books: state.favReducer.fav_books });

export default connect(mapStateToProps, mapDispatchToProps)(Book);

export { BookNav, Book };
