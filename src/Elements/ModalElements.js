import React, {useState, useEffect} from 'react';

import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function ModalElements(props) {
  const [AddMenu, SetAddMenu] = useState(true);
  //declare db and write handler
  const [todo, setTodo] = useState('');
  const [description, setDescription] = useState('');

  const [today, setToday] = useState(true);
  const [tommorrow, setTommorrow] = useState(false);
  const [someday, setSomeday] = useState(false);

  async function addTodo() {
    //writing to firabase
    console.log(todo, '1');
    if (todo.length == 0) {
      //err handling
      alert('Please provide a title!');
      return;
    }
    const ref = firestore().collection('tasksDatabase');

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
    setTodo('');
    setDescription(''); //clearing the Todo text
  }

  async function toggleComplete(id, complete) {
    await firestore().collection('tasksDatabase').doc(id).update({
      complete: !complete,
    });
  }

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

  return (
    <View style={styles.modal}>
      <View style={styles.modalWrapper}>
        <TextInput
          style={styles.modalTitle}
          placeholder="Task title"
          value={todo}
          onChangeText={setTodo}></TextInput>
        <TextInput
          style={styles.modalDescription}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}></TextInput>

        <View style={styles.modalWrapperTimeButtons}>
          <TouchableOpacity
            style={[today ? styles.btnClicked : styles.btnUnclicked]}
            onPress={taskToday}>
            <Text style={styles.modalTextTimeButtons}>Today</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[tommorrow ? styles.btnClicked : styles.btnUnclicked]}
            onPress={taskTommorrow}>
            <Text>Tommorrow</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[someday ? styles.btnClicked : styles.btnUnclicked]}
            onPress={taskSomeday}>
            <Text>Someday</Text>
          </TouchableOpacity>
        </View>

        {/* CLOSE BUTTON */}

        <View style={styles.modalWrapperCreateCancel}>
          <TouchableOpacity
            style={styles.modalBtnCreateCancel}
            onPress={props.closeBtnProp}>
            <Text style={styles.modalBtnTextCreateCancel}>Close</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={todo.length === 0}
            style={styles.modalBtnCreateCancel}
            onPress={addTodo}>
            <Text style={styles.modalBtnTextCreateCancel}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modalWrapper: {
    width: '90%',
    backgroundColor: '#3b3c3d',
    borderRadius: 7,
    margin: 10,
  },
  modalTitle: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 7,
    margin: 10,
    fontSize: 20,
    backgroundColor: 'grey',
    elevation: 5,
  },
  modalDescription: {
    height: 150,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 7,
    margin: 10,
    fontSize: 12,
    backgroundColor: 'grey',
    elevation: 5,
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
    fontFamily: 'Poppins-SemiBold',
  },

  modalWrapperCreateCancel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
