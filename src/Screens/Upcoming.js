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
  str,
} from 'react-native';

import GlobalStyle from '../GlobalStyle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import Todo from '../Elements/Todo';

export default function Upcoming({navigation}) {
  // const date = () => {
  //   let today = String(new Date());
  //   let day = today.substring(8, 10);

  //   console.log(today, ' today: ', day);
  // };

  const [todo, setTodo] = useState('');

  const ref = firestore().collection('tasksDatabase');
  const upcoming = firestore()
    .collection('tasksDatabase')
    .where('tommorrow', '==', true)
    .where('complete', '==', false);

  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    return upcoming.onSnapshot(querySnapshot => {
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

  const showMe = () => {
    console.log(upcoming.doc.title);
  };

  const deleteAll = () => {
    cont = true;
    upcoming.onSnapshot(querySnapshot => {
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
              style={styles.btnText}>
              <Text> Create Task </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <Text style={[GlobalStyle.CustomFont, styles.text]}>Home</Text> */}

        {/* bulb button */}
        <TouchableOpacity style={styles.addBtn} onPress={deleteAll}>
          <FontAwesome5 name={'trash'} size={30} color={'#FECA8C'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn2} onPress={showMe}>
          <FontAwesome5 name={'trash'} size={30} color={'#FECA8C'} />
        </TouchableOpacity>
        {/* 
        <TouchableOpacity style={styles.dateBtn} onPress={date}>
          <FontAwesome5 name={'calendar'} size={30} color={'#FECA8C'} />
        </TouchableOpacity> */}
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
