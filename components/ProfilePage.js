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
} from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Account } from '../redux/actions/index';
import { connect } from 'react-redux';
import { useFonts } from 'expo-font';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const createOneButtonAlert = () =>
  Alert.alert(
    'Thank You For Subscribing',
    '',
    [
      {
        text: 'Thanks',
        onPress: () => console.log('ask later'),
      },
    ],
    { cancelable: false }
  );

const createTwoButtonAlert = () =>
  Alert.alert(
    'Give Us Feedback About Our App',
    '',
    [
      {
        text: 'Perfect',
        onPress: () => console.log('ask later'),
      },

      {
        text: 'Average',
        onPress: () => console.log('yeah later'),
        style: 'default',
      },
      {
        text: 'Needs Work',
        onPress: () => console.log('no later'),
        style: 'cancel',
      },
    ],
    { cancelable: false }
  );

const RegisterButton = (navigation) => (
  <Button
    title="Get Started"
    onPress={() => {
      createOneButtonAlert;
      createTwoButtonAlert();
      navigation.navigate('Sign Up');
    }}
  />
);

const CreateAccountButton = (navigation, username) => (
  <TouchableOpacity
    style={{
      marginHorizontal: 55,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
      backgroundColor: 'skyblue',
      paddingVertical: 10,
      borderRadius: 23,
    }}
    onPress={() => [
      navigation.navigate('Profile', { username }),
      Account(username, email, password),
      console.log(username),
    ]}>
    <View>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'white',
          fontFamily: 'SemiBold',
        }}>
        Create Account
      </Text>
    </View>
  </TouchableOpacity>
);

function Profile({ route, navigation, user }) {
  const { username } = route.params;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#241332',
      }}>
      <ScrollView
        style={{
          backgroundColor: '#241332',
        }}>
        <ImageBackground
          source={require('../assets/photo.png')}
          style={{
            height: 0.4 * h,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginTop: 60,
              alignItems: 'center',
            }}></View>
          <LinearGradient
            colors={['rgba(36,19,50,1)', 'transparent']}
            style={{
              transform: [{ rotate: '180deg' }],
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
              height: 0.16 * h,
            }}>
            {' '}
            <Text
              style={{
                transform: [{ rotate: '-180deg' }],
                color: '#FFF',
                fontSize: 24,
                marginVertical: 30,
                alignSelf: 'center',
                fontFamily: 'Montserrat_700Bold',
              }}>
              Welcome Back {username}!
            </Text>
          </LinearGradient>
        </ImageBackground>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 35,
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Montserrat_700Bold',
                color: '#FFF',
              }}>
              125
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Montserrat_600SemiBold',
                color: '#918998',
              }}>
              FOLLOWERS
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Montserrat_700Bold',
                color: '#FFF',
              }}>
              150
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Montserrat_600SemiBold',
                color: '#918998',
              }}>
              FOLLOWING
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Montserrat_700Bold',
                color: '#FFF',
              }}>
              321
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Montserrat_600SemiBold',
                color: '#918998',
              }}>
              Favourite Books
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#352641',
            marginTop: 30,
            marginHorizontal: 10,
            borderRadius: 60,
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}>
          <Text
            style={{
              fontSize: 10,
              paddingLeft: 20,
              fontFamily: 'Montserrat_600SemiBold',
              color: '#918998',
            }}></Text>
          <View
            style={{
              backgroundColor: '#8A56AC',
              paddingHorizontal: 50,
              paddingVertical: 10,
              borderRadius: 50,
            }}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileCover({ navigation }) {
  return (
    <ScrollView
      style={{
        backgroundColor: 'white',
      }}>
      <View>
        <Text style={styles.profileText}>Book Marks</Text>
        <Text style={styles.textBottom}>Begin your journey!</Text>
      </View>
      <ImageBackground
        source={{
          uri: 'https://cdn.dribbble.com/users/2367833/screenshots/7816190/media/b1aaf5c98510012b56422d1619dc62e8.gif',
        }}
        style={{
          weight: 0.1 * w,
          height: 0.4 * h,
        }}></ImageBackground>
      <View style={styles.loginButton}>{RegisterButton(navigation)}</View>
    </ScrollView>
  );
}

function SignUp({ route, navigation, Account }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={{ backgroundColor: '#FFF', height: '100%' }}>
      <Image
        source={require('../assets/bookMarks1.jpg')}
        style={{ width: '100%', height: '40%' }}
      />
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 30,
          fontFamily: 'SemiBold',
          alignSelf: 'center',
          marginBottom: 0,
        }}>
        Book Marks
      </Text>

      <Text
        style={{
          fontFamily: 'SemiBold',
          marginHorizontal: 55,
          textAlign: 'center',
          fontSize: 20,
          marginTop: 10,
          opacity: 0.5,
        }}>
        Enter your username, email and password
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 55,
          borderWidth: 2,
          marginTop: 30,
          paddingHorizontal: 10,
          borderColor: 'skyblue',
          borderRadius: 23,
          paddingVertical: 4,
        }}>
        <Image
          source={{
            uri: 'https://img.icons8.com/material-outlined/24/null/user-male-circle.png',
          }}
          style={styles.iconStyle}
        />

        <TextInput
          placeholder="User name "
          value={username}
          onChangeText={setUsername}
          style={{ paddingVertical: 0, outlineStyle: 'none' }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 55,
          borderWidth: 2,
          marginTop: 15,
          paddingHorizontal: 10,
          borderColor: 'skyblue',
          borderRadius: 23,
          paddingVertical: 4,
        }}>
        <Image
          source={{
            uri: 'https://img.icons8.com/material-outlined/24/null/filled-message.png',
          }}
          style={styles.iconStyle}
        />

        <TextInput
          placeholder="Email "
          value={email}
          onChangeText={setEmail}
          style={{ paddingVertical: 0, outlineStyle: 'none' }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 55,
          borderWidth: 2,
          marginTop: 15,
          paddingHorizontal: 10,
          borderColor: 'skyblue',
          borderRadius: 23,
          paddingVertical: 4,
        }}>
        <Image
          source={{
            uri: 'https://img.icons8.com/material-outlined/24/null/lock--v1.png',
          }}
          style={styles.iconStyle}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={{ paddingVertical: 0, outlineStyle: 'none' }}
          secureTextEntry={true}
        />
      </View>
      {CreateAccountButton(navigation, username)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileText: {
    textAlign: 'center',
    color: '#000000',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
    fontSize: 45,

    marginTop: 50,
    marginBottom: 10,
  },
  iconStyle: {
    opacity: 0.45,
    position: 'absolute',
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    top: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBottom: {
    opacity: 0.6,
    textAlign: 'center',
    color: '#000000',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 100,
  },
  loginButton: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = { Account };

const mapStateToProps = (store) => ({
  user: store.accountReducer.user,
});

export { ProfileCover, Profile, SignUp };
export default connect(mapStateToProps, mapDispatchToProps)(SignUp, Profile);
