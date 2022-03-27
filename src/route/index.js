import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Lainnya
} from '../pages';
import { BottomNavigator } from '../components'
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Route = () => {
  return (
    <Stack.Navigator initialRouteName="Tab">
      <Stack.Screen
        name="Tab"
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Modal"
        component={Lainnya}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Route;

const styles = StyleSheet.create({});
