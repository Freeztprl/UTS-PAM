import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
// import {Text, TextInput} from 'react-native-paper';
import SIZES, {ColorPrimary} from '../../utils/constanta';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-picker/picker';

const Home = ({navigation}) => {
  const [awal, setAwal] = useState('pilih');
  const [tujuan, setTujuan] = useState('pilih');
  const [layanan, setLayanan] = useState('pilih');
  const [kategori, setKategori] = useState('pilih');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState("Pilih Tanggal Masuk");
  const [time, setTime] = useState("Pilih Jam Masuk");

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

  return (
    <View style={{flex: 1, backgroundColor: '#f5f5f5', color: '#000000'}}>
      <View
        style={{
          marginTop: 30,
          marginRight: 30,
          marginLeft: 30,
          borderRadius: 10,
          paddingVertical: 20,
          paddingHorizontal: 10,
          backgroundColor: 'white',
          // flex:1,
          // alignItems:'center',
        }}>
        <View style={styles.picker}>
          <Picker
            selectedValue={awal}
            onValueChange={(itemValue, itemIndex) => setAwal(itemValue)}>
            <Picker.Item label="Pilih Pelabuhan Awal" value="" />
            <Picker.Item label="Bakauheni" value="Bakauheni" />
            <Picker.Item label="Merak" value="Merak" />
          </Picker>
        </View>
        <View style={styles.picker}>
          <Picker
            selectedValue={tujuan}
            onValueChange={(itemValue, itemIndex) => setTujuan(itemValue)}>
            <Picker.Item label="Pilih Pelabuhan Tujuan" value="" />
            <Picker.Item label="Bakauheni" value="Bakauheni" />
            <Picker.Item label="Merak" value="Merak" />
          </Picker>
        </View>
        <View style={styles.picker}>
          <Picker
            selectedValue={layanan}
            onValueChange={(itemValue, itemIndex) => setLayanan(itemValue)}>
            <Picker.Item label="Pilih Layanan" value="" />
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
          <View style={[styles.picker, styles.picker1]}>
            <Picker
              selectedValue={kategori}
              onValueChange={(itemValue, itemIndex) => setKategori(itemValue)}>
              <Picker.Item label="Pilih Kategori" value="" />
              <Picker.Item label="Dewasa" value="Dewasa" />
              <Picker.Item label="Anak-Anak" value="Anak-Anak" />
            </Picker>
          </View>
          <Text style={{color: 'white',marginLeft:15, width: 100, height:55, backgroundColor: ColorPrimary, textAlign:"center", textAlignVertical:"center"}}>
            sss
          </Text>
        </View>
      </View>
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
    marginBottom: 30,
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
    marginBottom: 30,
  },
});
