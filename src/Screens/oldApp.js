//Make sure to import everything you are going to use
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import MyButton from "./src/Elements/elCustomButton";

const Tab = createBottomTabNavigator();

//Use Starter Template in notion and rename const App and export default App
const App = () => {
  //variables with setters, setters can be anyname. Use state is for managing the state.
  const [name, setName] = useState("Val");
  const [session, setSession] = useState({ number: 23, title: "state" });
  const [current, setCurrent] = useState(true);
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ItemZ = ({ inputZ }) => {
    return (
      <View style={styles.scroll2}>
        <Text style={styles.item}>Item: {count}</Text>
      </View>
    );
  };

  const onPressHandler = () => {
    if (name.length > 3) {
      setSubmitted(!submitted);
    } else {
      Alert.alert(
        "Warning",
        "The name must be longer than 3 characters",
        [
          {
            text: "Do not show again",
            onPress: () => console.warn("Do not show Pressed!"),
          },
          {
            text: "Cancel",
            onPress: () => console.warn("Cancel Pressed!"),
          },
          {
            text: "OK",
            onPress: () => console.warn("OK Pressed!"),
          },
        ],
        {
          cancelable: true,
          onDismiss: () => console.warn("Alert dismissed!"),
        }
      );
    }
    setSubmitted(!submitted);
  };

  //Defining a function which is activated when a button is clicked
  const onClickHandler = () => {
    //Basic JS if statment, toggle plus console log
    if (current == false) {
      setName("Val");
      setSession({ number: 23, title: "state" });
      setCurrent(true);
      console.log({ current });
    } else {
      setName("Twenty3");
      setSession({ number: 24, title: "Style" });
      setCurrent(false);
      console.log({ current });
    }
  };
  //Counter Funtion
  const AddOne = () => {
    setCount(count + 1);
  };

  return (
    //jsx which is similar to HTML View = <div>, Text=<p> etc.
    <ImageBackground
      source={require("./assets/back.png")}
      style={styles.background}
    >
      <View style={styles.navBar}>
        <Text style={styles.navBarText}>Today, 23rd of Twenyary</Text>
      </View>
      {/* <ScrollView  style={styles.scrollMain}> */}
      <View style={styles.addElement}>
        <TextInput
          placeholder="Task... Eg. Recive your 10k"
          style={styles.addElementInput}
          onChangeText={(value) => setName(value)}
        ></TextInput>
      </View>
      {/* <Button title={submitted ? "Clear" : "Submit"} onPress={onPressHandler} /> */}

      <MyButton
        pressFunction={onPressHandler}
        btnTitle={submitted ? "Clear" : "Submit"}
      />

      {/* 
      <TouchableOpacity
        style={styles.tBtn}
        onPress={onPressHandler}
        activeOpacity={0.6}
      >
        <Text>{submitted ? "Clear" : "Submit"}</Text>
      </TouchableOpacity> */}

      {submitted ? (
        <View style={styles.addElement}>
          <Text>{name}</Text>
        </View>
      ) : null}
      {/* 
      <View style={styles.clearSpace}></View>
      <Text style={styles.text}> Whoami: {name} </Text>
      <Text style={styles.text}>
        Sess number: {session.number} and title: {session.title}
      </Text>
      <Text style={styles.text}>
        {current ? "current session" : "next session"}
      </Text>
      <Button
        style={styles.butt}
        title="update"
        onPress={onClickHandler}
      ></Button>
      <Button title="Add One" onPress={AddOne}></Button> */}
      {/* inline styling, jesus this comment was hard */}
      {/* <Text style={{ fontSize: 23, color: "white" }}>
        Count is {count} and score is {count * 23}
      </Text>
      <ScrollView style={styles.scroll}>
        <ItemZ />
        <ItemZ />
        <ItemZ />
        <ItemZ />
        <ItemZ />
        <ItemZ />
        <ItemZ />
        <ItemZ />
        <ItemZ />
        <ItemZ />
        <ItemZ />
        <ItemZ />
        <ItemZ />
        <ItemZ />
        <ItemZ />
        <ItemZ />
        <ItemZ />
        <ItemZ />
        <ItemZ />
        <ItemZ />
        <ItemZ />
      </ScrollView> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  //use ctrl+space if autocomplete is not opening

  addElementInput: {
    borderWidth: 2,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
  },

  navBar: {
    height: "7%",
    backgroundColor: "#3F3F3F",
    width: "100%",
  },

  addElement: {
    marginTop: 10,
    width: "90%",
    height: 30,
    backgroundColor: "grey",
    borderRadius: 5,
  },
  navBarText: {
    paddingTop: "6%",
    color: "white",
    textAlign: "right",
    marginRight: "3%",
    fontSize: 15,
  },
  background: {
    flex: 1,
    backgroundColor: "grey",
    alignItems: "center",
  },

  // text: {
  //   fontSize: 30,
  //   padding: 20,
  // },
  // scroll: {
  //   width: "40%",
  //   borderRadius: 7,

  //   backgroundColor: "darkgrey",
  // },
  // item: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "darkgreen",
  //   fontSize: 20,
  //   margin: 2,
  //   borderRadius: 5,
  // },
  // scroll2: {
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // clearSpace: {
  //   height: 200,
  // },
});

export default App;
