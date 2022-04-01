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

export default function Home({navigation}) {
  const [AddMenu, SetAddMenu] = useState(false); //modal event handler
  const [todo, setTodo] = useState(''); //title of todo
  const [description, setDescription] = useState('');
  //properties which indicate the desired location of the task (upcoming, done, home)
  const [today, setToday] = useState(true);
  const [tommorrow, setTommorrow] = useState(false);
  const [someday, setSomeday] = useState(false);
  const [add, setAdd] = useState(true); //add or edit state, true = add, false = edit
  const [itemEdit, setItemEdit] = useState(''); //storing the id of the doc, global access
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [empty, setEmpty] = useState();
  //creating instances of the database, showin only tasks with (complete, tommorow) = false
  const ref = firestore().collection('tasksDatabase');
  const toComplete = firestore()
    .collection('tasksDatabase')
    .where('complete', '==', false)
    .where('tommorrow', '==', false)
    .where('someday', '==', false);
  //todos list handler

  const taskToday = () => {
    setToday(true);
    setTommorrow(false);
    setSomeday(false);
  };

  const taskTommorrow = () => {
    setToday(false);
    setTommorrow(true);
    setSomeday(false);
  };

  const taskSomeday = () => {
    setToday(false);
    setTommorrow(false);
    setSomeday(true);
  };

  useEffect(() => {
    return toComplete.onSnapshot(querySnapshot => {
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
      if (list.length == 0) {
        console.log('emptyyyy');
        setEmpty(true);
      } else {
        setEmpty(false);
      }
    });
  }, []);

  async function addTodo() {
    //writing to firabase
    console.log(todo, '1');
    if (todo.length == 0) {
      //err handling
      alert('Please provide a title!');
      return;
    }

    await ref.add({
      //add the fileds
      title: todo,
      complete: false,
      description: description,
      today: today,
      tommorrow: tommorrow,
      someday: someday,
      dateCreated: new Date(),
    });
    clear();
  }

  if (loading) {
    return null;
  }

  const onPressHandler = () => {
    SetAddMenu(true);
  };

  async function toggleComplete(id, complete) {
    await firestore().collection('tasksDatabase').doc(id).update({
      complete: !complete,
    });
  }

  async function LoadInfo(id) {
    console.log('in Load Info');
    const cityRef = firestore().collection('tasksDatabase').doc(id);
    const doc = await cityRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
      setTodo(doc.data().title);
      setDescription(doc.data().description);
      setToday(doc.data().today);
      setTommorrow(doc.data().tommorrow);
      setSomeday(doc.data().someday);
      SetAddMenu(true);
      setAdd(false);
      setItemEdit(id);
      console.log(itemEdit);
    }
  }

  function UpdateInfo(id) {
    console.log('in UPDATE Info');
    firestore().collection('tasksDatabase').doc(id).update({
      title: todo,
      description: description,
      today: today,
      tommorrow: tommorrow,
      someday: someday,
    });
    clear();
  }

  const clear = () => {
    console.log('Clearing Iniciated...');
    SetAddMenu(false);
    setTodo('');
    setDescription('');
    setToday(true);
    setTommorrow(false);
    setSomeday(false);
    setAdd(true);
  };

  return (
    <ImageBackground
      source={require('../../assets/back.png')}
      style={styles.body}>
      <View style={styles.body}>
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
              It looks like you {'\n'} dont have much to do.
            </Text>
          </View>
        ) : (
          <View></View>
        )}

        {/* ToDo Elements in a flat list, actual element in todo.js  */}
        <View style={styles.listaBe}>
          <FlatList
            style={styles.flatList}
            data={todos}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Todo2
                loadInfo={() => LoadInfo(item.id)}
                title={item.title}
                id={item.id}
                elFunction={() => toggleComplete(item.id, item.complete)}
                elIcon={'check'}
              />
            )}
          />
        </View>

        {/* Add to do modal */}
        <Modal
          visible={AddMenu}
          animationType={'fade'}
          onRequestClose={clear}
          transparent>
          <View style={styles.modal}>
            <View style={GlobalStyle.ModalWrapper}>
              <TextInput
                style={[GlobalStyle.Title]}
                placeholder="Taks Title"
                placeholderTextColor="#DEDEDE"
                value={todo}
                onChangeText={setTodo}></TextInput>
              <TextInput
                style={[GlobalStyle.Description]}
                multiline
                placeholder="Task Description"
                placeholderTextColor="#DEDEDE"
                value={description}
                onChangeText={setDescription}></TextInput>

              <View style={styles.modalWrapperTimeButtons}>
                <TouchableOpacity
                  style={[
                    today ? GlobalStyle.btnClicked : GlobalStyle.btnUnclicked,
                  ]}
                  onPress={taskToday}>
                  <Text style={[GlobalStyle.btnText]}>Today</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    tommorrow
                      ? GlobalStyle.btnClicked
                      : GlobalStyle.btnUnclicked,
                  ]}
                  onPress={taskTommorrow}>
                  <Text style={[GlobalStyle.btnText]}>Tommorrow</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    someday ? GlobalStyle.btnClicked : GlobalStyle.btnUnclicked,
                  ]}
                  onPress={taskSomeday}>
                  <Text style={[GlobalStyle.btnText]}>Someday</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.modalWrapperCreateCancel}>
                <TouchableOpacity
                  style={[GlobalStyle.btnUnclicked]}
                  onPress={clear}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome5
                      style={{right: 8}}
                      name={'times'}
                      size={18}
                      color={'#EF7373'}
                    />
                    <Text style={[GlobalStyle.btnCloseConfirmText]}>Close</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={todo.length === 0}
                  style={[GlobalStyle.btnUnclicked]}
                  onPress={add ? addTodo : () => UpdateInfo(itemEdit)}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome5
                      style={{right: 5}}
                      name={'check'}
                      size={18}
                      color={'#FECA8C'}
                    />
                    <Text style={GlobalStyle.btnCloseConfirmText}>Confirm</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* <Text style={[GlobalStyle.CustomFont, styles.text]}>Home</Text> */}

        {/* bulb button */}
        <TouchableOpacity style={styles.addBtn} onPress={onPressHandler}>
          <FontAwesome5 name={'plus'} size={30} color={'#FECA8C'} />
        </TouchableOpacity>
      </View>
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
    zIndex: 100,
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
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
  },
  modalWrapper: {
    width: '90%',
    backgroundColor: '#3b3c3d',
    borderRadius: 7,
    margin: 10,
  },

  modalBtnCreateCancel: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 3,
    height: 30,
    paddingLeft: 30,
    paddingRight: 30,
    margin: 10,
  },

  modalBtnTextCreateCancel: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },

  modalWrapperCreateCancel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
    marginTop: -3,
  },

  modalWrapperTimeButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnClicked: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FECA8C',
    borderRadius: 3,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
  },

  btnUnclicked: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 3,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
  },
});
