import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import SIZES, {API, ColorPrimary} from '../../utils/constanta';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';
import {Arrow} from '../../assets/icons';
import {Divider, Button} from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';

const Pemesanan = ({navigation}) => {
  const [tiket, setTiket] = useState([]);
  const [success, setSuccess] = useState(false);

  const getTiket = async () => {
    await fetch(`${API}/api/tickets`)
      .then(response => response.json())
      .then(response => setTiket(response));
  };

  useEffect(() => {
    if (!tiket.length) {
      getTiket();
    }
    return;
  }, [tiket]);

  const cancelTiket = async id => {
    Alert.alert(
      'Peringatan',
      'Yakin ingin membatalkan tiket?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          style: 'cancel',
          onPress: () => {
            fetch(`${API}/api/tickets/cancel/${id}`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            })
              .then(response => response.json())
              .then(response => getTiket());
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const Card = item => {
    // data = JSON.stringify(data)
    // console.log(Object.values(item)[0].starting.name);
    return (
      <View
        style={{
          borderColor: 'black',
          borderWidth: 1,
          backgroundColor: '#f5f5f5',
          padding: 2,
          marginLeft: 40,
          marginRight: 40,
          marginBottom: 10,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.tujuan}>
            {Object.values(item)[0].starting.name}
          </Text>
          <Image
            source={Arrow}
            resizeMode="contain"
            style={{
              marginTop: 22,
              width: 25,
              height: 25,
            }}
          />
          <Text style={styles.tujuan}>
            {Object.values(item)[0].destination.name}
          </Text>
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
          <Text style={styles.keterangan}>
            {Object.values(item)[0].type} x {Object.values(item)[0].total}
          </Text>
          <Text style={styles.keterangan}>
            Rp. {Object.values(item)[0].total * 50000},00
          </Text>
        </View>
        <Button
          color="red"
          mode="contained"
          onPress={() => cancelTiket(Object.values(item)[0].id)}>
          Batal Tiket
        </Button>
      </View>
    );
  };

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
      <Text style={styles.title}>Daftar Pemesanan</Text>
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

export default Pemesanan;

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
