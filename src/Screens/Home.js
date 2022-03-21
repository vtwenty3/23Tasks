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

import GlobalStyle from '../GlobalStyle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import Todo from '../Elements/Todo';

export default function Home({navigation}) {
  //modal event handler

  const [AddMenu, SetAddMenu] = useState(false);

  //declare db and write handler
  const [todo, setTodo] = useState('');
  const ref = firestore().collection('tasksDatabase');

  //todos list handler
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
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
    });
    setTodo(''); //clearing the Todo text
  }

  const onPressHandler = () => {
    SetAddMenu(true);
  };

  if (loading) {
    return null;
  }

  return (
    <ImageBackground
      source={require('../../assets/back.png')}
      style={styles.body}>
      <View style={styles.body}>
        {/* ToDo Elements in a flat list, actual element in todo.js  */}
        <View style={styles.listaBe}>
          <FlatList
            style={styles.flatList}
            data={todos}
            keyExtractor={item => item.id}
            renderItem={({item}) => <Todo {...item} />}
          />
        </View>

        {/* Add to do modal */}
        <Modal
          visible={AddMenu}
          animationType={'fade'}
          onRequestClose={() => SetAddMenu(false)}
          transparent>
          <View style={styles.addMenuParent}>
            <View style={styles.addMenu}>
              <TextInput
                style={styles.addMenuTitle}
                placeholder="Task title"
                value={todo}
                onChangeText={setTodo}></TextInput>
              <TextInput
                style={styles.addMenuDescription}
                placeholder="Description"></TextInput>
              <TouchableOpacity
                disabled={todo.length === 0}
                style={styles.btnText}
                onPress={addTodo}>
                <Text> Create Task </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* <Text style={[GlobalStyle.CustomFont, styles.text]}>Home</Text> */}

        {/* bulb button */}
        <TouchableOpacity style={styles.addBtn} onPress={onPressHandler}>
          <FontAwesome5 name={'lightbulb'} size={30} color={'#FECA8C'} />
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
