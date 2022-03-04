import React from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';

export default function Done({navigation}) {
  const onPressHandler = () => {
    navigation.navigate('Settings');
  };
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Tasks</Text>
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
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
  },
});
