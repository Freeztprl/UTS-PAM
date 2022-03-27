import React, {useState} from 'react';
import { Image, StyleSheet, Text, Pressable, View } from "react-native";
import Modal from 'react-native-modal';
import {Call, Search, User, History} from '../../assets/icons';
import {Button} from 'react-native-paper';

const Lainnya = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('Tab');
    // console.log('test')
  };

  return (
    <View>
      <Modal isVisible={modalVisible}>
        <View style={{backgroundColor: 'none'}}>
          <View
            style={{
              borderColor: 'black',
              borderWidth: 1,
              backgroundColor: '#f5f5f5',
              padding: 5,
              margin: 0,
            }}>
            <Text style={styles.title}>Menu</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  width: 150,
                  height: 100,
                  backgroundColor: '#f5f5f5',
                  padding: 5,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Image
                  source={Search}
                  resizeMode="contain"
                  style={{
                    width: 40,
                    height: 50,
                  }}
                />
                <Text style={styles.opsi}>Cek Pemesanan</Text>
              </View>
              <View
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  width: 150,
                  height: 100,
                  backgroundColor: '#f5f5f5',
                  padding: 5,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Image
                  source={User}
                  resizeMode="contain"
                  style={{
                    width: 50,
                    height: 50,
                    tintColor: '#50ba77',
                  }}
                />
                <Text style={styles.opsi}>Detail Profil</Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  width: 150,
                  height: 100,
                  backgroundColor: '#f5f5f5',
                  padding: 5,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: 20,
                  marginBottom: 20,
                }}>
                <Image
                  source={Call}
                  resizeMode="contain"
                  style={{
                    width: 40,
                    height: 50,
                    tintColor: '#c4332b',
                  }}
                />
                <Text style={styles.opsi}>Hubungi Kami</Text>
              </View>
              <View
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  width: 150,
                  height: 100,
                  backgroundColor: '#f5f5f5',
                  padding: 5,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: 20,
                  marginBottom: 20,
                }}>
                <Image
                  source={History}
                  resizeMode="contain"
                  style={{
                    width: 50,
                    height: 50,
                    tintColor: '#a32900',
                  }}
                />
                <Text style={styles.opsi}>Riwayat Pemesanan</Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Button
                color="red"
                mode="contained"
                style={{width: 100, alignItems: 'center'}}
                onPress={toggleModal}>
                Tutup
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Lainnya;

const styles = StyleSheet.create({
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
