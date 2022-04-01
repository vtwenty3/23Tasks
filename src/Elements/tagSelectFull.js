import React, {useState, useEffect} from 'react';

import firestore from '@react-native-firebase/firestore';
import {DarkTheme, List} from 'react-native-paper';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GlobalStyle from '../GlobalStyle';
import {deleteDoc, doc, getDoc, setDoc} from '@react-native-firebase/firestore';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import TagSelector from '../Elements/TagSelector';

export default function TagSelectFull(props) {
  return (
    <View>
      <View style={styles.flatList}>
        <FlatList
          data={props.data}
          horizontal={true}
          keyExtractor={item => item.id}
          inverted={props.tagClicked}
          renderItem={({item}) => (
            <TagSelector
              title={item.tag}
              id={item.id}
              tagClicked={props.tagClicked}
              selectedId={props.tagId}
              tagSelected={() => props.tagSel}
            />
          )}
        />
      </View>
      <TouchableOpacity
        onPress={props.tagClicked ? props.onPress2 : props.setTagModal}
        style={styles.tagAddBtn}>
        <FontAwesome5
          name={props.tagClicked ? 'times' : 'plus'}
          size={15}
          color={'#FECA8C'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  flatList: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 30,
    width: 360,
    height: 50,
    paddingHorizontal: 10,
    top: 2,
    left: 15,
  },
  tagAddBtn: {
    position: 'absolute',
    top: 7,
    right: 15,
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#636363',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
