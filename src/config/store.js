import { configureStore } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ReduxStates from "../ReduxState";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const sagaMiddleware = createSagaMiddleware();

/* create a middleware with default middleware and saga middleware */
const middleware = [sagaMiddleware];

/* configuring store with reducer, middleware, devTools enable and enhancers */
const store = configureStore({
  reducer: persistReducer(persistConfig, ReduxStates.reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

/* run the saga middleware with root saga */
const persistor = persistStore(store);

export { store, persistor };
