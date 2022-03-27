import React, {useState} from 'react';
import {Image, Alert, StyleSheet, Text, Pressable, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Pemesanan, Pembatalan} from '../../pages';
import {ColorPrimary} from '../../utils/constanta';
import {Home as HomeIcon} from '../../assets/icons';

const Tab = createBottomTabNavigator();

const Lainnya = () => {return <View style={{flex:1, backgroundColor:'red'}}/>;}


const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          // bottom:25,
          // left:20,
          // right:20,
          elevation: 0,
          backgroundColor: '#ededed',
          // borderRadius:15,
          height: 90,
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          borderTopColor: '#919191',
          ...styles.shadow,
          paddingHorizontal: 40,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Beranda"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={HomeIcon}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? ColorPrimary : '#C4C4C4',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Pesanan Saya"
        component={Pemesanan}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={HomeIcon}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? ColorPrimary : '#C4C4C4',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Pembatalan"
        component={Pembatalan}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={HomeIcon}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? ColorPrimary : '#C4C4C4',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Lainnya"
        component={Lainnya}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={HomeIcon}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? ColorPrimary : '#C4C4C4',
                }}
              />
            </View>
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Modal');
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5,
  },
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
    marginTop: 10,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  opsi: {
    color: 'black',
    textAlign: 'center',
    fontSize: 10,
  },
});
