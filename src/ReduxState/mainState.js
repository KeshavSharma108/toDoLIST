import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskList: [],
};

const updatetaskListReducer = (state, action) => {
  state.taskList = [...state.taskList, action.payload];
};

const updateRemoveListReducer = (state, action) => {
  // console.log(action.payload)
  state.taskList = state.taskList.filter((_, i) => i !== action.payload);
  // console.log('remove',state.taskList)
};

const updateEditListReducer = (state, action) => {
  const { index, newName } = action.payload;
  state.taskList[index] = { title: newName.title, desc: newName.desc };
  // console.log(index)
  //console.log(newName.title)
};

//Reducer

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updatetaskList: updatetaskListReducer,
    updateRemoveList: updateRemoveListReducer,
    updateEditList: updateEditListReducer,
  },
});

//Actions

const { updatetaskList, updateRemoveList, updateEditList } = taskSlice.actions;

const selectTaskList = ({ task }) => {
  return task.taskList;
};

const selectTaskRemoveList = ({ task }) => {
  return task.taskList;
};

const selectTaskEditList = ({ task }) => {
  return task.taskList;
};

const taskSliceReducer = taskSlice.reducer;

export {
  updatetaskList,
  selectTaskList,
  taskSliceReducer,
  updateRemoveList,
  selectTaskRemoveList,
  updateEditList,
  selectTaskEditList,
};
