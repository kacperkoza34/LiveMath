import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import Dashboard from "./components/dashboard/Dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute/PrivateRoute";
import TeacherRoute from "./components/routing/TeacherRoute/TeacherRoute";
import Classes from "./components/classes/Classes/Classes";
import StudentProfile from "./components/profile/StudentProfile/StudentProfile";
import TaskDashboard from "./components/tasks/TaskDashboard/TaskDashboard";
import DisplayOpenTask from "./components/tasks/DisplayTask/OpenTask/OpenTask";
import DisplayCloseTask from "./components/tasks/DisplayTask/CloseTask/CloseTask";
import DisplayBooleanTask from "./components/tasks/DisplayTask/BooleanTask/BooleanTask";
import AddOpenTask from "./components/tasks/AddTask/OpenTask/OpenTask";
import AddCloseTask from "./components/tasks/AddTask/CloseTask/CloseTask";
import AddBooleanTask from "./components/tasks/AddTask/BooleanTask/BooleanTask";
import AboutDashboard from "./components/about/AboutDashboard/AboutDashboard";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Switch>
            <Route
              exact
              path="/register/:teacher/:class"
              component={Register}
            />
            <Route exact path="/register/:teacher" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/about" component={AboutDashboard} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <TeacherRoute exact path="/classes" component={Classes} />
            <TeacherRoute
              exact
              path="/student/:id"
              component={StudentProfile}
            />
            <TeacherRoute exact path="/tasks" component={TaskDashboard} />
            <PrivateRoute
              exact
              path="/display/openTask/:id"
              component={DisplayOpenTask}
            />
            <PrivateRoute
              exact
              path="/display/closeTask/:id"
              component={DisplayCloseTask}
            />
            <PrivateRoute
              exact
              path="/display/booleanTask/:id"
              component={DisplayBooleanTask}
            />
            <TeacherRoute exact path="/add/openTask" component={AddOpenTask} />
            <TeacherRoute
              exact
              path="/add/closeTask"
              component={AddCloseTask}
            />
            <TeacherRoute
              exact
              path="/add/booleanTask"
              component={AddBooleanTask}
            />
          </Switch>
        </MainLayout>
      </Router>
    </Provider>
  );
};

export default App;
