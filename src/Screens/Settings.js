import React from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';

export default function Settings({navigation}) {
  const onPressHandler = () => {
    navigation.navigate('Tasks');
  };
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Settings</Text>
      <Button title={'Click Me'} onPress={onPressHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    margin: 10,
  },
});
