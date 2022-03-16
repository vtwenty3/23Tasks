import React, {useState, useEffect} from 'react';
import {
  FlatList,
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
import {Appbar, Button} from 'react-native-paper';

import GlobalStyle from '../GlobalStyle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Task from '../Elements/task';
import firestore from '@react-native-firebase/firestore';
import Todo from './Todo';

export default function Home({navigation}) {
  const [AddMenu, SetAddMenu] = useState(false);

  const [todo, setTodo] = useState('');
  const ref = firestore().collection('tasksDatabase');

  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   return ref.onSnapshot(querySnapshot => {
  //     const list = [];
  //     querySnapshot.forEach(doc => {
  //       list.push({
  //         title: doc.data().title,
  //         complete: doc.data().complete,
  //       });
  //     });
  //     setList(list);
  //   });
  // }, []);

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
    setTodo(''); //clearing the TitleText
  }

  const onPressHandler = () => {
    SetAddMenu(true);
  };

  if (loading) {
    return null; // or a spinner
  }

  return (
    <ImageBackground
      source={require('../../assets/back.png')}
      style={styles.body}>
      <View style={styles.body}>
        <FlatList
          style={{flex: 1}}
          data={todos}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Todo {...item} />}
        />

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
