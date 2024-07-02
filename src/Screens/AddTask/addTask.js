import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import { updatetaskList } from "../../ReduxState/mainState";
import { Entypo } from "@expo/vector-icons";
const AddTask = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [desc, setDesc] = useState("");
  const [descError, setDescError] = useState(false);

  const dispatch = useDispatch();

  const AddTask = () => {
    if (!title) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
    if (!desc) {
      setDescError(true);
    } else {
      setDescError(false);
    }

    //Add Title and Description
    if (title !== "" && desc !== "") {
      if (title.trim() && desc) {
        setTitle(title.trim());
        setTitle("");
      }
      if (desc.trim() && title) {
        setDesc(desc.trim());
        setDesc("");
      }

      const payload = {
        title,
        desc,
      };
      dispatch(updatetaskList(payload));
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backbutton}>
        <Entypo name="back" size={24} color="black" />
      </Pressable>
      <View style={styles.subContainer}>
        <View style={styles.container}>
          <Text>Title:</Text>
          <TextInput
            style={styles.titleInput}
            maxLength={40}
            editable
            onChangeText={(text) => {
              setTitle(text);
              setTitleError();
            }}
            value={title}
          />
          {titleError ? (
            <View>
              <Text style={styles.ErrorStyle}>Please Enter Title</Text>
            </View>
          ) : null}
          <Text>Description:</Text>
          <TextInput
            style={styles.descInput}
            numberOfLines={4}
            editable
            multiline
            maxLength={150}
            onChangeText={(text) => {
              setDesc(text);
              setDescError();
            }}
            value={desc}
          />
          {descError ? (
            <View>
              <Text style={styles.ErrorStyle}>Please Enter Description</Text>
            </View>
          ) : null}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonStyle} onPress={() => AddTask()}>
              <Text>Add Task</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#05c46b",
  },
  subContainer: {
    flex: 1,
    backgroundColor: "#05c46b",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
  },
  titleInput: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 10,
    elevation: 10,
    padding: 10,
  },
  descInput: {
    width: "100%",
    height: 100,
    backgroundColor: "white",
    marginBottom: 20,
    elevation: 10,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
  },
  buttonContainer: {
    alignItems: "center",
  },
  buttonStyle: {
    width: "60%",
    height: 40,
    backgroundColor: "#ff9f43",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  ErrorStyle: { color: "red", marginBottom: 20 },
  backbutton: {
    marginTop: 40,
    marginHorizontal: 20,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
