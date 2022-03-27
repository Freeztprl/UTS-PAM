import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-paper';
import SIZES, {API, ColorPrimary} from '../../utils/constanta';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import {Fumi} from 'react-native-textinput-effects';


import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-picker/picker';

const Home = ({navigation}) => {
  const [awal, setAwal] = useState('pilih');
  const [tujuan, setTujuan] = useState('pilih');
  const [layanan, setLayanan] = useState('pilih');
  const [kategori, setKategori] = useState('pilih');
  const [jumlah, setJumlah] = useState('0');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState('Pilih Tanggal Masuk');
  const [time, setTime] = useState('Pilih Jam Masuk');
  const [name, setName] = useState('');
  const [identitas, setIdentitas] = useState('pilih');
  const [umur, setUmur] = useState('');
  const [pelabuhan, setPelabuhan] = useState([]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    // console.warn('A date has been picked: ', data);
    const tahun = date.getFullYear();
    const bulan = date.getMonth() + 1;
    const bulan2 = bulan >= 10 ? bulan : '0' + bulan;
    const tang = date.getDate();
    const tang2 = tang > 10 ? tang : '0' + tang;
    setDate(tahun + '-' + bulan2 + '-' + tang2);
    // console.warn('A date has been picked: ', setDate(data));
    hideDatePicker();
    console.log(isDatePickerVisible);
  };

  const showTimePicker = () => {
    console.log('masuk', isTimePickerVisible);
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = date => {
    // console.warn('A date has been picked: ', data);
    const jam = date.getHours();
    const jam2 = jam >= 10 ? jam : '0' + jam;
    const menit = date.getMinutes();
    const menit2 = menit >= 10 ? menit : '0' + menit;
    setTime(jam2 + ':' + menit2);
    // console.warn('A date has been picked: ', setTime(data));
    hideTimePicker();
    console.log(isTimePickerVisible);
  };

  const getPelabuhan = async () => {
    await fetch(`${API}/api/harbors`)
      .then(response => response.json())
      .then(response => setPelabuhan(response));
  };

  useEffect(() => {
    getPelabuhan();
  }, [pelabuhan]);

  const buatTiket = async () => {
    if (awal != 'pilih' &&
    tujuan != 'pilih' &&
    name != '' &&
    umur != '' &&
    jumlah != '0' &&
    layanan != 'pilih' &&
    kategori != 'pilih' &&
    date != 'Pilih Tanggal Masuk' &&
    time != 'Pilih Jam Masuk' &&
    identitas != 'pilih'
    ) {
    await fetch(`${API}/api/tickets`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destination: tujuan,
        starting: awal,
        name: name,
        age: umur,
        service: layanan,
        type: kategori,
        date: date,
        time: time,
        identity: identitas,
        total: jumlah,
      }),
    })
      .then(response => response.json())
      .then(response => {
        alert('Sukses membuat tiket')
        setAwal('pilih')
        setTujuan('pilih')
        setIdentitas('pilih')
        setLayanan('pilih')
        setKategori('pilih')
        setTime('Pilih Jam Masuk')
        setDate('Pilih Tanggal Masuk')
        setName('')
        setUmur('')
        setJumlah('0')
      })
      .catch((e) => (alert('Gagal membuat tiket')));
    } else {
      alert('Gagal membuat tiket')
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f5f5f5', color: '#000000'}}>
      <View
        style={{
          marginTop: 30,
          marginRight: 30,
          marginLeft: 30,
          borderRadius: 10,
          // paddingVertical: 20,
          paddingHorizontal: 10,
          backgroundColor: 'white',
          flex: 1,
          marginBottom: 120,
          // alignItems:'center',
        }}>
        <ScrollView>
          <Text style={styles.title}>Kapalzy</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={awal}
              onValueChange={(itemValue, itemIndex) => setAwal(itemValue)}>
              <Picker.Item label="Pilih Pelabuhan Awal" value="" enabled={false} />
              {pelabuhan.map((data, index) => {
                return (
                  <Picker.Item label={data.name} value={data.id} key={index} />
                );
              })}
            </Picker>
          </View>
          <View style={styles.picker}>
            <Picker
              selectedValue={tujuan}
              onValueChange={(itemValue, itemIndex) => setTujuan(itemValue)}>
              <Picker.Item label="Pilih Pelabuhan Tujuan" value="" enabled={false} />
              {pelabuhan.map((data, index) => {
                return (
                  <Picker.Item label={data.name} value={data.id} key={index} />
                );
              })}
            </Picker>
          </View>
          <View style={styles.picker}>
            <Picker
              selectedValue={layanan}
              onValueChange={(itemValue, itemIndex) => setLayanan(itemValue)}>
              <Picker.Item label="Pilih Layanan" value="" enabled={false} />
              <Picker.Item label="Eksekutif" value="Eksekutif" />
              <Picker.Item label="Reguler" value="Reguler" />
            </Picker>
          </View>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.txtButton}>{date}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showTimePicker}>
            <Text style={styles.txtButton}>{time}</Text>
          </TouchableOpacity>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View
              style={{
                marginBottom: 10,
                borderBottomWidth: 2,
                borderBottomColor: ColorPrimary,
                backgroundColor: ColorPrimary,
                flex: 1,
              }}>
              <Picker
                selectedValue={kategori}
                onValueChange={(itemValue, itemIndex) =>
                  setKategori(itemValue)
                }>
                <Picker.Item label="Pilih Kategori" value="" enabled={false} />
                <Picker.Item label="Dewasa" value="Dewasa" />
                <Picker.Item label="Anak-Anak" value="Anak-Anak" />
              </Picker>
            </View>
            <TextInput
              value={jumlah}
              keyboardType={'number-pad'}
              onChangeText={data => setJumlah(data)}
              style={styles.inputJumlah}
            />
            {/* <Text
            style={{
              color: 'white',
              marginLeft: 15,
              width: 100,
              height: 55,
              backgroundColor: ColorPrimary,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            sss
          </Text> */}
          </View>
          <TextInput
            placeholder="Masukkan Nama"
            value={name}
            onChangeText={data => setName(data)}
            style={{
              backgroundColor: ColorPrimary,
              marginBottom: 10,
              color: 'white',
              padding: 10,
            }}
            placeholderTextColor="#fff"
          />
          <View style={styles.picker}>
            <Picker
              selectedValue={identitas}
              onValueChange={(itemValue, itemIndex) => setIdentitas(itemValue)}>
              <Picker.Item label="Pilih Identitas" value="" enabled={false} />
              <Picker.Item label="Laki-laki" value="Laki-laki" />
              <Picker.Item label="Perempuan" value="Perempuan" />
            </Picker>
          </View>
          <TextInput
            placeholder="Masukkan Umur"
            keyboardType={'number-pad'}
            value={umur}
            onChangeText={data => setUmur(data)}
            style={{
              backgroundColor: ColorPrimary,
              marginBottom: 10,
              color: 'white',
              padding: 10,
            }}
            placeholderTextColor="#fff"
          />
          <Button
            color="blue"
            mode="contained"
            style={{marginBottom: 20}}
            onPress={buatTiket}>
            Buat Tiket
          </Button>
        </ScrollView>
      </View>
      {/* <View style={{backgroundColor:"red",width:100,height:100}}></View> */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
      />
      {/* <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <TouchableOpacity
          style={styles.button}
          //   onPress={addParfumePressed}
        >
          <Text style={styles.btnText}>Simpan</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: ColorPrimary,
    width: SIZES.width - 50,
    height: 66,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btnText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  textInput: {
    width: SIZES.width - 50,
    borderRadius: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'grey',
  },
  picker: {
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: ColorPrimary,
    backgroundColor: ColorPrimary,
  },
  picker1: {
    flex: 1,
  },
  txtButton: {
    color: 'white',
    backgroundColor: ColorPrimary,
    padding: 15,
    marginBottom: 10,
  },
  inputJumlah: {
    marginLeft: 15,
    width: 70,
    height: 55,
    padding: 0,
    textAlignVertical: 'center',
    textAlign: 'center',
    backgroundColor: ColorPrimary,
  },
});
