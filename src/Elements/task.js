import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const Task = props => {
  return (
    <View style={styles.element}>
      <Text style={styles.elementText}> {props.text} </Text>
    </View>
  );
};

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
  },
});

export default Task;
