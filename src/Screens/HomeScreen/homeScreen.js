import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { TaskState } from "../../ReduxState";
import { useDispatch, useSelector } from "react-redux";
import { updateRemoveList } from "../../ReduxState/mainState";
import config from "../../config";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const TaskListData = useSelector(TaskState.selectTaskList);
  const [mark, setMark] = useState([]);
  const [radioMark, setradioMark] = useState(0);

  const removeItem = (index) => {
    dispatch(updateRemoveList(index));
  };

  //mark if task completed
  const markOnPress = (item) => {
    const isSelected = mark.includes(item);

    if (isSelected) {
      setMark(mark.filter((selectedItems) => selectedItems !== item));
    } else {
      setMark([...mark, item]);
    }
  };

  //search completed TASK

  const filteredItems =
    radioMark === 1
      ? TaskListData.filter((item) => {
          if (mark.includes(item)) {
            return item;
          }
        })
      : radioMark === 2
      ? TaskListData.filter((item) => {
          if (mark.includes(item) !== true) {
            return item;
          }
        })
      : TaskListData;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.containerSearch}>
          <View style={styles.subcontainerSearch}>
            <Pressable
              style={styles.markBoxSearch}
              onPress={() => setradioMark(0)}
            >
              {radioMark === 0 ? (
                <MaterialIcons
                  name="check"
                  size={30}
                  color="green"
                  style={styles.markBoxText}
                />
              ) : null}
            </Pressable>
            <View>
              <Text>ALL</Text>
            </View>
          </View>

          <View style={styles.subcontainerSearch}>
            <Pressable
              style={styles.markBoxSearch}
              onPress={() => setradioMark(1)}
            >
              {radioMark === 1 ? (
                <MaterialIcons
                  name="check"
                  size={30}
                  color="green"
                  style={styles.markBoxText}
                />
              ) : null}
            </Pressable>
            <View>
              <Text>Completed</Text>
            </View>
          </View>

          <View style={styles.subcontainerSearch}>
            <Pressable
              style={styles.markBoxSearch}
              onPress={() => setradioMark(2)}
            >
              {radioMark === 2 ? (
                <MaterialIcons
                  name="check"
                  size={30}
                  color="green"
                  style={styles.markBoxText}
                />
              ) : null}
            </Pressable>
            <View>
              <Text>Pending</Text>
            </View>
          </View>
        </View>
        <FlatList
          data={filteredItems}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <View style={styles.listContainer}>
                <Text style={styles.itemText}>Title:{item.title} </Text>
                <Text style={styles.itemText}>Description:{item.desc} </Text>
              </View>

              {mark.includes(item) !== true ? (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => removeItem(index)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(config.routes.EDIT_TASK, {
                        index,
                        item,
                      })
                    }
                    style={styles.editButton}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.completedText}>Completed</Text>
              )}
              {radioMark === 1 ? null : (
                <TouchableOpacity
                  style={styles.markBox}
                  onPress={() => markOnPress(item)}
                >
                  {mark.includes(item) && (
                    <MaterialIcons
                      name="check"
                      size={30}
                      color="green"
                      style={styles.markBoxText}
                    />
                  )}
                </TouchableOpacity>
              )}
            </View>
          )}
          keyExtractor={(item, index) => index + item}
        />
      </View>
      <Pressable
        style={styles.addTask}
        onPress={() => navigation.navigate(config.routes.ADDTASK)}
      >
        <Entypo name="add-to-list" size={24} color="black" />
      </Pressable>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A2130",
  },

  itemContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#FFF078",
  },
  itemText: {
    fontSize: 18,
  },
  removeButton: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: "green",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "white",
  },
  editButtonText: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "50%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
  },
  markBox: {
    width: 25,
    height: 25,
    borderWidth: 3,
    position: "relative",
    top: 30,
    left: 150,
    justifyContent: "center",
    alignContent: "center",
  },
  markBoxText: {
    textAlign: "center",
    position: "absolute",
  },
  completedText: {
    top: 20,
    fontSize: 20,
    color: "#219C90",
  },
  containerSearch: {
    height: 50,
    width: "100%",
    marginTop: 10,
    borderWidth: 3,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  subcontainerSearch: {
    width: "33%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  markBoxSearch: {
    height: 25,
    width: 25,
    borderWidth: 2,
    justifyContent: "center",
  },
  addTask: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    bottom: 70,
  },
  listContainer: {
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
});
