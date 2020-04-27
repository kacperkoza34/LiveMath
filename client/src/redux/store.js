import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { createLogger } from "redux-logger";
import { createPromise } from "redux-promise-middleware";

// reducers
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import profileReducer from "./reducers/profileReducer";
import teacherReducer from "./reducers/teacherReducer";
import classesReducer from "./reducers/classesReducer";
import smallLoadingReducer from "./reducers/smallLoadingReducer";
import studentReducer from "./reducers/studentReducer";
import tasksReducer from "./reducers/tasksReducer";
import newTasksReducer from "./reducers/newTasksReducer";
import taskToClassReducer from "./reducers/taskToClassReducer";

/// applyMiddleware
import auth from "./middleware/auth";
import user from "./middleware/user";
import profile from "./middleware/profile";
import teacher from "./middleware/teacher";
import classes from "./middleware/classes";
import student from "./middleware/student";
import tasks from "./middleware/tasks";
import newTask from "./middleware/newTask";
import taskToClass from "./middleware/taskToClass";
import apiRequest from "./middleware/apiRequest";

const initialState = {
  auth: {
    token: null,
    isAuthenticated: false,
    isFetching: false,
    errors: false,
  },
  user: {
    data: {},
    isFetching: true,
    errors: false,
  },
  profile: {
    data: {},
    isFetching: true,
    errors: false,
  },
  teacher: {
    data: {},
    isFetching: true,
    errors: false,
  },
  classes: {
    data: [],
    isFetching: true,
    errors: false,
  },
  smallLoading: false,
  student: {
    data: [],
    isFetching: true,
    errors: false,
  },
  tasks: {
    data: [],
    taskConfig: {},
    isFetching: false,
    errors: false,
  },
  newTask: {
    data: {
      content: "",
      name: "",
      variables: [],
      additionalVariables: [],
      model: "",
      groups: [],
      class: "",
      section: "",
    },
    isFetching: false,
    errors: {},
    success: {},
  },
  addTaskToClass: {
    data: {
      classes: [],
      deadLine: "",
      promptsAllowed: false,
      descriptionRequired: false,
    },
    isFetching: false,
    errors: false,
    success: false,
  },
};

const reducers = {
  auth: authReducer,
  user: userReducer,
  profile: profileReducer,
  teacher: teacherReducer,
  classes: classesReducer,
  smallLoading: smallLoadingReducer,
  student: studentReducer,
  tasks: tasksReducer,
  newTask: newTasksReducer,
  addTaskToClass: taskToClassReducer,
};

const combinedReducers = combineReducers(reducers);

const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(
      //createPromise(),
      thunk,
      //createLogger(),
      auth,
      user,
      profile,
      teacher,
      classes,
      student,
      tasks,
      newTask,
      taskToClass,
      apiRequest
    )
  )
);

export default store;
