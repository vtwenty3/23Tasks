import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const MyButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.tBtn}
      onPress={props.pressFunction}
      activeOpacity={0.6}
    >
      <Text>{props.btnTitle}</Text>
    </TouchableOpacity>
  );
};

//submitted ? "Clear" : "Submit"

const styles = StyleSheet.create({
  tBtn: {
    width: 100,
    height: 30,
    alignItems: "center",
    backgroundColor: "grey",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    justifyContent: "center",
    margin: 5,
  },
});

export default MyButton;
