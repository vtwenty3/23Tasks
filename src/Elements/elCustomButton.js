import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const Task = props => {
  return (
    <TouchableOpacity
      style={styles.tBtn}
      onPress={props.pressFunction}
      activeOpacity={0.6}>
      <Text>{props.btnTitle}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  element: {
    marginTop: 10,
    width: 350,
    height: 30,
    backgroundColor: '#999999',
    borderColor: '#4d4d4d',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;
