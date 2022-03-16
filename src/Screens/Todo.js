import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {List} from 'react-native-paper';
import {StyleSheet} from 'react-native';
function Todo({id, title, complete}) {
  async function toggleComplete() {
    await firestore().collection('tasksDatabase').doc(id).update({
      complete: !complete,
    });
  }

  return (
    <List.Item
      style={styles.element}
      title={title}
      onPress={() => toggleComplete()}
      left={props => (
        <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  element: {
    width: 350,
    height: 30,
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    margin: 5,
    fontSize: 40,
  },
});

export default React.memo(Todo);
