import React, {useState, useEffect} from 'react';

import firestore from '@react-native-firebase/firestore';
import {DarkTheme, List} from 'react-native-paper';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GlobalStyle from '../GlobalStyle';
import {deleteDoc, doc, getDoc, setDoc} from '@react-native-firebase/firestore';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';

export default function TagSelector(props) {
  //   const [tagClicked, setTagClicked] = useState(false);
  //   const [tagId, setTagid] = useState('');

  //   const selectTag = id => {
  //     setTagid(id);
  //     setTagClicked(true);
  //   };

  //   console.log(props.tagClicked);
  //   console.log(props.selectedId);

  if (props.tagClicked) {
    if (props.id == props.selectedId) {
      return (
        <View style={styles.item}>
          <TouchableOpacity onPress={props.tagSelectedOnPress}>
            <Text style={styles.tagText}>{props.title}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  } else {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={props.tagSelected}>
          <Text style={styles.tagText}>{props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tagText: {
    color: 'white',
  },
  item: {
    backgroundColor: '#5A5A5A',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 6,
    borderRadius: 5,
    justifyContent: 'center',
  },
  itemSelected: {
    backgroundColor: '#FECA8C',
    padding: 5,
    marginRight: 10,
    marginVertical: 8,
    borderRadius: 5,
    justifyContent: 'center',
  },
  tagTextSelected: {
    color: 'black',
  },
});
