import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image,
  RefreshControl,ScrollView} from 'react-native';
import SIZES, {API, ColorPrimary} from '../../utils/constanta';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';
import {Arrow} from '../../assets/icons';
import {Divider, Button} from 'react-native-paper';

const Pembatalan = ({navigation}) => {
  const Card = item => {
    return (<View
      style={{
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#f5f5f5',
        padding: 2,
        margin: 40,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.tujuan}>{Object.values(item)[0].starting.name}</Text>
        <Image
          source={Arrow}
          resizeMode="contain"
          style={{
            marginTop: 22,
            width: 25,
            height: 25,
          }}
        />
        <Text style={styles.tujuan}>{Object.values(item)[0].destination.name}</Text>
      </View>
      <Text style={styles.keterangan}>Jadwal Masuk Pelabuhan</Text>
      <Text style={styles.keterangan}>{Object.values(item)[0].date}</Text>
      <Text style={styles.keterangan}>{Object.values(item)[0].time} WIB</Text>
      <Text style={styles.keterangan}>Layanan</Text>
      <Text style={styles.keterangan}>{Object.values(item)[0].service}</Text>
      <Divider style={{backgroundColor: 'black', height: 2}} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.keterangan}>{Object.values(item)[0].type} x {Object.values(item)[0].total}</Text>
        <Text style={styles.keterangan}>Rp. {Object.values(item)[0].total * 50000},00</Text>
      </View>
    </View>);
  };

  const [tiket, setTiket] = useState([]);

  const getTiket = async () => {
    await fetch(`${API}/api/tickets/cancel`)
      .then(response => response.json())
      .then(response => setTiket(response));
  };

  useEffect(() => {
    if (!tiket.length) {
      getTiket();
    }
    return;
  }, [tiket]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getTiket()
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text style={styles.title}>Daftar Pembatalan</Text>
      <ScrollView
        style={{marginBottom: 90}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {tiket
          ? tiket.reverse().map((item, index) => {
              return <Card item={item} key={index} />;
            })
          : 'null'}
      </ScrollView>
    </View>
  );
};

export default Pembatalan;

const styles = StyleSheet.create({
  button: {
    backgroundColor: ColorPrimary,
    width: SIZES.width - 50,
    height: 66,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  title: {
    color: 'white',
    backgroundColor: ColorPrimary,
    textAlign: 'center',
    fontSize: 25,
    marginTop: 2,
    marginBottom: 10,
    padding: 20,
    fontWeight: 'bold',
  },
  tujuan: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    padding: 20,
    fontWeight: 'bold',
  },
  keterangan: {
    color: 'black',
    paddingHorizontal: 25,
    marginBottom: 5,
    fontSize: 15,
  },
});
