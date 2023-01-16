import React from 'react';
import {
  TextInput,
  Icon,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import { saveSearch, UnsaveSearch } from '../redux/actions';
import { useState } from 'react';
import { GetData } from './SearchBook';
import { connect } from 'react-redux';

const HistoryButton = (navigation) => {
  <Button title="See History" onPress={() => navigation.navigate('History')} />;
};

function HistoryView({ navigation, search_history, UnsaveSearch }) {
  const [key, setKeyword] = useState('');
  const deleteHistory = (id) => {
    UnsaveSearch(id);
  };

  console.log('search_render', search_history);
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 15 }}>Previous Searches: </Text>
      {search_history?.map((x) => (
        <View style={styles.container}>
          <Image
            source={{
              uri: 'https://img.icons8.com/material-outlined/24/null/time-machine.png',
            }}
            style={styles.imageStyle}
          />

          <TouchableHighlight
            onPress={() => [
              navigation.navigate('Search'),
            ]}>
            <Text style={styles.buttonText}>{x.searchKey}</Text>
          </TouchableHighlight>
          <TouchableOpacity onPress={() => deleteHistory(x.id)}>
            <Text style={styles.smallText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    width: '100%',
    borderRadius: 5,
  },
  buttonText: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 50,
    fontSize: 22,
  },
  smallText: {
    flex: 0.25,
    paddingTop: 15,
    fontSize: 10,
    color: 'grey',
    textAlign: 'right',
  },
  imageStyle: {
    position: 'absolute',
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    top: 5,
    right: 0,
    bottom: 0,
    flex: 1,

    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

const mapDispatchToProps = { saveSearch, UnsaveSearch };

const mapStateToProps = (store) => ({
  search_history: store.saveSearchReducer.search_history,
});

export { HistoryButton };
export default connect(mapStateToProps, mapDispatchToProps)(HistoryView);
