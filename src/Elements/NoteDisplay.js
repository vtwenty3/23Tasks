import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {DarkTheme, List} from 'react-native-paper';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GlobalStyle from '../GlobalStyle';
import {deleteDoc, doc, getDoc, setDoc} from '@react-native-firebase/firestore';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import {black} from 'react-native-paper/lib/typescript/styles/colors';

export default function NoteDisplay(props) {
  async function deleteToDo() {
    const users = await firestore().collection('tasksDatabase').get();
    console.log(users.forEach);
  }

  const showMe = () => {
    console.log('hehe');
  };

  if (props.tagClicked) {
    if (props.tag == props.tagSlc) {
      return (
        <TouchableOpacity onPress={props.loadInfo}>
          <View style={styles.elementFocus}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[styles.elementTextFocus, GlobalStyle.CustomFont]}>
              {props.title}
            </Text>
            <View style={styles.descriptionFocus}>
              <Text
                numberOfLines={4}
                ellipsizeMode={'tail'}
                style={[styles.descriptionText, GlobalStyle.LightFont]}>
                {props.description}
              </Text>
            </View>

            <View style={styles.tagSelected}>
              <Text style={[styles.tagText, GlobalStyle.CustomFont]}>
                {props.tag}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  } else {
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

      <TouchableOpacity onPress={props.loadInfo}>
        <View style={styles.element}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[styles.elementText, GlobalStyle.CustomFont]}>
            {props.title}
          </Text>
          <View style={styles.description}>
            <Text
              numberOfLines={4}
              ellipsizeMode={'tail'}
              style={[styles.descriptionText, GlobalStyle.LightFont]}>
              {props.description}
            </Text>
          </View>

          <View style={styles.tagSelected}>
            <Text style={[styles.tagText, GlobalStyle.CustomFont]}>
              {props.tag}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  element: {
    flex: 1,
    flexDirection: 'column',
    width: 175,
    height: 150,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#333333',
    color: 'white',
    borderRadius: 7,
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

  elementFocus: {
    flex: 1,
    flexDirection: 'column',
    width: 320,
    height: 160,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#333333',
    color: 'white',
    borderRadius: 7,
    borderColor: 'rgba(40, 40, 40, 1)',
    borderWidth: 1.5,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },

  elementTextFocus: {
    marginTop: 5,
    fontSize: 20,
    color: '#CECECE',
    textAlign: 'center',
  },

  elementText: {
    marginTop: 3,
    fontSize: 15,
    color: '#CECECE',
    textAlign: 'center',
  },
  icon: {
    width: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    width: 160,
    height: 100,
    borderRadius: 5,
    backgroundColor: '#1E1E1E',
    elevation: 5,
    borderColor: '#343434',
    borderWidth: 1,
  },

  descriptionFocus: {
    width: 290,
    height: 100,
    borderRadius: 5,
    backgroundColor: '#1E1E1E',
    elevation: 5,
    borderColor: '#343434',
    borderWidth: 1,
  },

  tagSelected: {
    position: 'absolute',
    backgroundColor: '#FECA8C',
    paddingHorizontal: 5,
    paddingTop: 2,
    borderRadius: 5,
    right: 10,
    bottom: 7,
  },
  tagText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
  },
  descriptionText: {
    color: 'white',
    padding: 5,
  },
});
