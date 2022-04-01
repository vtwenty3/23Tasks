//Home Screen, Building Page, Functionality of Todo in elements/Todo
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ImageBackground,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import Todo2 from '../Elements/Todo2';
import GlobalStyle from '../GlobalStyle';

export default function Upcoming({navigation}) {
  const tommorowTasks = firestore()
    .collection('tasksDatabase')
    .where('tommorrow', '==', true)
    .where('complete', '==', false);

  const somedayTasks = firestore()
    .collection('tasksDatabase')
    .where('someday', '==', true)
    .where('complete', '==', false);

  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [empty, setEmpty] = useState();
  const [empty2, setEmpty2] = useState();
  const [showTommorow, setShowTommorow] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [somedayTodo, setSomedayTodo] = useState('');
  const [loading2, setLoading2] = useState(true);
  const [somedayTodos, setSomedayTodos] = useState([]);

  useEffect(() => {
    return tommorowTasks.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {title, complete} = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });
      setTodos(list);
      if (loading) {
        setLoading(false);
      }
      console.log(list.length);
      if (list.length == 0) {
        console.log('emptyyyy');
        setEmpty(true);
      } else {
        setEmpty(false);
      }
    });
  }, []);
  useEffect(() => {
    return somedayTasks.onSnapshot(querySnapshot => {
      const list2 = [];
      querySnapshot.forEach(doc => {
        const {title, complete} = doc.data();
        list2.push({
          id: doc.id,
          title,
          complete,
        });
      });
      setSomedayTodos(list2);
      if (loading2) {
        setLoading2(false);
      }
      if (list2.length == 0) {
        console.log('emptyyyy');
        setEmpty2(true);
      } else {
        setEmpty2(false);
      }
    });
  }, []);

  async function moveToTodayTom(id) {
    console.log('activate');
    await firestore().collection('tasksDatabase').doc(id).update({
      tommorrow: false,
      today: true,
    });
  }

  async function moveToTodaySome(id) {
    console.log('activate');
    await firestore().collection('tasksDatabase').doc(id).update({
      someday: false,
      today: true,
    });
  }

  const deleteAll = () => {
    cont = true;
    tommorowTasks.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (cont) {
          doc.ref.delete();
        }
        if (querySnapshot.size == 1) {
          cont = false;
          return console.log('Deletion Terminated');
        }
      });
    });
  };
  return (
    <ImageBackground
      source={require('../../assets/back.png')}
      style={styles.body}>
      <Modal
        visible={modalVisible}
        animationType={'fade'}
        onRequestClose={() => setModalVisible(false)}
        transparent>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.48)',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '65%',
              backgroundColor: '#3b3c3d',
              borderRadius: 7,
              margin: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                textAlign: 'center',
                fontSize: 22,
                color: '#FECA8C',
              }}>
              {' '}
              Early-Access
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                textAlign: 'center',
                fontSize: 16,
              }}>
              This feauture will be added shortly
            </Text>
            <TouchableOpacity
              style={[GlobalStyle.btnUnclicked]}
              onPress={() => setModalVisible(false)}>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <FontAwesome5
                  style={{right: 8}}
                  name={'check-circle'}
                  size={18}
                  color={'#FECA8C'}
                />
                <Text style={[GlobalStyle.btnCloseConfirmText]}>Close</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {empty ? (
        <View
          style={{
            backgroundColor: 'rgba(238, 199, 118, 0.47)',
            borderRadius: 20,
            padding: 10,
            marginTop: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              color: 'black',
              fontSize: 23,
              textAlign: 'center',
            }}>
            Add upcoming tasks {'\n'} from Home Screen
          </Text>
        </View>
      ) : (
        <View></View>
      )}
      {/* ToDo Elements in a flat list, actual element in todo.js  */}

      {showTommorow ? (
        <View style={{flex: 1}}>
          <FlatList
            style={styles.flatList}
            data={todos}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Todo2
                loadInfo={() => setModalVisible(true)}
                title={item.title}
                id={item.id}
                elFunction={() => moveToTodayTom(item.id)}
                elIcon={'arrow-circle-up'}
              />
            )}
          />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            style={styles.flatList}
            data={somedayTodos}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Todo2
                loadInfo={() => setModalVisible(true)}
                title={item.title}
                id={item.id}
                elFunction={() => moveToTodaySome(item.id)}
                elIcon={'arrow-circle-up'}
              />
            )}
          />
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          // disabled={todo.length === 0}
          style={[
            !showTommorow ? GlobalStyle.btnClicked : GlobalStyle.btnUnclicked,
            {width: 150},
          ]}
          onPress={() => setShowTommorow(false)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome5
              style={{right: 5}}
              name={'moon'}
              size={18}
              color={'#FECA8C'}
            />
            <Text style={GlobalStyle.btnCloseConfirmText}>Someday</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            showTommorow ? GlobalStyle.btnClicked : GlobalStyle.btnUnclicked,
            {width: 150},
          ]}
          onPress={() => setShowTommorow(true)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome5
              style={{right: 8}}
              name={'sun'}
              size={18}
              color={'#FECA8C'}
            />
            <Text style={[GlobalStyle.btnCloseConfirmText]}>Tommorow</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* bulb button */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
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
    bottom: 15,
    right: 15,
    elevation: 5,
  },

  addBtn2: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#636363',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    left: 15,
    elevation: 5,
  },

  dateBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#636363',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    left: 15,
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
