import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GlobalStyle from '../GlobalStyle';
const Element = props => {
  return (
    <View style={styles.element}>
      <View style={styles.icon}>
        <TouchableOpacity onPress={props.elFunction}>
          <FontAwesome5 name={props.elIcon} size={23} color={'#FECA8C'} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.elementText, GlobalStyle.LightFont]}>{title}</Text>
    </View>
  );
};
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

export default Element;
