import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import config from "../config";
import AddTask from "../Screens/AddTask/addTask";
import HomeScreen from "../Screens/HomeScreen/homeScreen";
import EditTask from "../Screens/EditTask/editTask";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={config.routes.HOMESCREEN} component={HomeScreen} />
        <Stack.Screen name={config.routes.ADDTASK} component={AddTask} />
        <Stack.Screen name={config.routes.EDIT_TASK} component={EditTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
