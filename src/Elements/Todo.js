import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {DarkTheme, List} from 'react-native-paper';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GlobalStyle from '../GlobalStyle';
import {deleteDoc, doc, getDoc, setDoc} from '@react-native-firebase/firestore';

function Todo({id, title, complete}) {
  async function toggleComplete() {
    await firestore().collection('tasksDatabase').doc(id).update({
      complete: !complete,
    });
  }

  async function deleteToDo() {
    const users = await firestore().collection('tasksDatabase').get();
    console.log(users.forEach);
  }

  return (
    // <List.Item
    //   style={styles.element}
    //   title={title}
    //   theme={DarkTheme}
    //   onPress={() => toggleComplete()}
    //   left={props => (
    //     <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
    //   )}
    // />

    <View style={styles.element}>
      <View style={styles.icon}>
        <TouchableOpacity onPress={() => toggleComplete()}>
          <FontAwesome5
            name={complete ? 'check' : 'redo'}
            size={23}
            color={'#FECA8C'}
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.elementText, GlobalStyle.LightFont]}> {title} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  element: {
    flex: 1,
    flexDirection: 'row',
    width: 380,
    height: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(25, 25, 25, 0.91)',
    color: 'white',
    borderRadius: 10,
    borderColor: 'rgba(40, 40, 40, 1)',
    borderWidth: 1.5,
    margin: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  elementText: {
    marginTop: 3,
    fontSize: 20,
    color: '#CECECE',
  },
  icon: {
    width: 33,
    alignItems: 'center',
    marginLeft: 5,
  },
});

export default React.memo(Todo);
