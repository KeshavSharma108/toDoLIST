import React from "react";
import { RootNavigation } from './src/Navigations';
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/lib/integration/react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import config from "./src/config";
export default function App() {
  return (
    <View style={{flex:1}}>
      <StatusBar style='auto'/>
  <Provider store={config.store}>
      <PersistGate  persistor={config.persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
    </View>
  
  );
}
