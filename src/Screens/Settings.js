import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ImageBackground,
} from 'react-native';
import GlobalStyle from '../GlobalStyle';

import auth from '@react-native-firebase/auth';

export default function Settings({navigation}) {
  const register = () => {
    auth()
      .createUserWithEmailAndPassword(username, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const [username, setUsername] = useState(''); //title of todo
  const [password, setPassword] = useState(''); //title of todo
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <ImageBackground
        style={styles.body}
        source={require('../../assets/back.png')}>
        <TextInput
          style={styles.txtInput}
          placeholder="name@email.com"
          value={username}
          onChangeText={setUsername}></TextInput>
        <TextInput
          style={styles.txtInput}
          multiline
          placeholder="superSecurePassword"
          autoCapitalize={'none'}
          onChangeText={setPassword}></TextInput>

        <View style={styles.btnWrapper}>
          <TouchableOpacity
            // disabled={username.length === 0 || password.length === 0}
            style={styles.btnRegister}
            onPress={register}>
            <Text style={styles.txtbtnRegister}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // disabled={username.length === 0 || password.length === 0}
            style={styles.btnLogin}
            onPress={register}>
            <Text style={styles.txtbtnLogin}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      style={styles.body}
      source={require('../../assets/back.png')}>
      <Text style={styles.welcome}>Welcome {user.email}</Text>
      <TouchableOpacity
        // disabled={username.length === 0 || password.length === 0}
        style={styles.btnRegister}
        onPress={logout}>
        <Text style={styles.txtbtnRegister}>Log Out</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtbtnRegister: {
    fontSize: 20,
    color: '#000000',
  },
  btnRegister: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edc664',
    borderRadius: 7,
    height: 35,
    width: 120,
    paddingHorizontal: 10,
    margin: 10,
    elevation: 3,
  },

  txtbtnLogin: {
    fontSize: 20,
    color: '#edc664',
  },
  btnLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#edc664',
    borderRadius: 7,
    height: 35,
    width: 120,
    paddingHorizontal: 10,
    margin: 10,
    elevation: 3,
  },

  btnWrapper: {
    flexDirection: 'row',
  },
  txtInput: {
    borderRadius: 7,
    margin: 10,
    width: 260,
    height: 40,
    fontSize: 16,
    backgroundColor: 'grey',
    elevation: 3,
  },
  welcome: {
    fontSize: 20,
    color: '#edc664',
    marginBottom: 20,
  },
});
