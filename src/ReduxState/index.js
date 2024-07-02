import { combineReducers } from "@reduxjs/toolkit";
import * as TaskState from "./mainState";

const reducers = combineReducers({
  task: TaskState.taskSliceReducer,
});

export { reducers, TaskState };
