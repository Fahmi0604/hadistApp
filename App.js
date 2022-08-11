import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginLanding from './src/screen/LoginLanding';
import Login from './src/screen/Login';
import Home from './src/screen/Home';
import ListChapter from './src/screen/ListChapter';
import ListHadits from './src/screen/ListHadits';
import DetailHadits from './src/screen/DetailHadits';
import Icon from 'react-native-vector-icons/FontAwesome';
import Bookmark from './src/screen/Bookmark';
import Profile from './src/screen/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomePage() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3FBD82',
        tabBarStyle: {backgroundColor: '#eee'},
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name={'home'} color={color} size={size} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name={'bookmark'} color={color} size={size} />
          ),
        }}
        name="Save"
        component={Bookmark}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name={'user'} color={color} size={size} />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // screenOptions={{headerTransparent: true}}
        screenOptions={{
          headerStyle: {backgroundColor: '#f7f6fd'},
          headerShadowVisible: false,
          headerTitle: '',
        }}
        // screenOptions={{headerShown: false}}
        initialRouteName="HomePage">
        <Stack.Screen
          options={{headerShown: false}}
          name="HomePage"
          component={HomePage}
        />
        <Stack.Screen name="LoginLanding" component={LoginLanding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ListChapter" component={ListChapter} />
        <Stack.Screen name="ListHadits" component={ListHadits} />
        <Stack.Screen name="DetailHadits" component={DetailHadits} />
      </Stack.Navigator>

      {/* <MyTabs /> */}
    </NavigationContainer>
  );
};

export default App;
