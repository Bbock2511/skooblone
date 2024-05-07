import React, { useEffect, useState } from 'react';
import { ActivityIndicator, LogBox, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Home from '../screens/Home';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/user';
import fetchUsername from '../functions/fetchUsername';
import { setUserNameAction } from '../../redux/actions';

LogBox.ignoreAllLogs();

const auth = getAuth();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
  const { user } = useSelector(state => state.user);

  if (!user) {
    return(
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="TabRoutes" component={TabRoutes} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  };
}

const TabRoutes = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Search') {
                iconName = focused ? 'search' : 'search-outline';
                } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}
        
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
  );
};

export default Routes;