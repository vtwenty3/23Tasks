import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  Alert,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import GlobalStyle from '../GlobalStyle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Home({navigation}) {
  const [AddMenu, SetAddMenu] = useState(false);
  const onPressHandler = () => {
    SetAddMenu(true);
  };
  return (
    <ImageBackground
      source={require('../../assets/back.png')}
      style={styles.body}>
      <View style={styles.body}>
        <Modal
          visible={AddMenu}
          onRequestClose={() => SetAddMenu(false)}
          transparent>
          <View style={styles.addMenuParent}>
            <View style={styles.addMenu}>
              <TextInput
                style={styles.addMenuTitle}
                placeholder="Task title"></TextInput>
              <TextInput
                style={styles.addMenuDescription}
                placeholder="Description"></TextInput>
              <TouchableOpacity style={styles.btnText}>
                <Text> Create Task </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Text style={[GlobalStyle.CustomFont, styles.text]}>Home</Text>

        <TouchableOpacity style={styles.addBtn}>
          <FontAwesome5
            name={'lightbulb'}
            size={30}
            color={'#FECA8C'}
            onPress={onPressHandler}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Thin',
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
  },
  addBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#636363',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    elevation: 5,
  },
  addMenuParent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
  },
  addMenu: {
    width: '90%',
    backgroundColor: '#3b3c3d',
    borderRadius: 7,
    margin: 10,
  },
  addMenuTitle: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 7,
    margin: 10,
    fontSize: 20,
    backgroundColor: 'grey',
    elevation: 5,
  },
  addMenuDescription: {
    height: 150,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 7,
    margin: 10,
    fontSize: 12,
    backgroundColor: 'grey',
    elevation: 5,
  },
  btnText: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'grey',
    marginLeft: '33%',
    marginRight: '33%',
    borderRadius: 3,
    height: 30,
  },
});
