import { Provider } from 'react-redux';
import store from './redux/store';
import Ionic from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/Home';
import SearchBook from './components/SearchBook';
import FavIndex from './components/FavouriteBooks';
import { ProfileCover, Profile, SignUp } from './components/ProfilePage';
import History from './components/History';
import Book from './components/Book';
import * as Font from 'expo-font';

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size, colour }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
                size = focused ? size + 8 : size + 5;
              } else if (route.name === 'Search') {
                iconName = focused ? 'search-sharp' : 'search-outline';
                size = focused ? size + 8 : size + 5;
              } else if (route.name === 'Favourites') {
                iconName = focused ? 'heart' : 'heart-outline';
                size = focused ? size + 8 : size + 5;
              } else if (route.name === 'ProfileCover') {
                iconName = focused
                  ? 'ios-person-circle'
                  : 'ios-person-circle-outline';
                size = focused ? size + 8 : size + 5;
              } else if (route.name === 'History') {
                iconName = focused ? 'ios-book' : 'ios-book-outline';
                size = focused ? size + 8 : size + 5;
              }
              return <Ionic name={iconName} size={size} colour={colour} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: 'black',
            showLabel: false,
            tabStyle: {
              backgroundColor: '#86b9db',
              height: 50,
            },
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen name="Search" component={SearchBook} />
          <Tab.Screen name="Favourites" component={FavIndex} />
          <Tab.Screen name="History" component={History} />
          <Tab.Screen name="ProfileCover" component={ProfileCover} options={{ headerShown: false }}/>
          <Tab.Screen name="Profile" component={Profile} options={{ tabBarButton: (props) => null }}/>
          <Tab.Screen name="Sign Up" component={SignUp} options={{ tabBarButton: (props) => null }}/>
          <Tab.Screen name="Book" component={Book} options={{ tabBarButton: (props) => null }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
