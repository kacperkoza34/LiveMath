import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/layout/Nav';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import StudentRoute from './components/routing/StudentRoute';
import TeacherRoute from './components/routing/TeacherRoute';
import Students from './components/students/Students';
import Classes from './components/classes/Classes';
import StudentProfile from './components/profile/StundetProfile';
import TaskDashboard from './components/tasks/TaskDashboard';
import DisplayOpenTask from './components/tasks/DisplayTask/OpenTask/OpenTask';
import DisplayCloseTask from './components/tasks/DisplayTask/CloseTask/CloseTask';
import DisplayBooleanTask from './components/tasks/DisplayTask/BooleanTask/BooleanTask';
import AddOpenTask from './components/tasks/AddTask/OpenTask/OpenTask';
import AddCloseTask from './components/tasks/AddTask/CloseTask/CloseTask';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { connect } from 'react-redux';
import setAuthToken from './utils/setAuthToken';

const App = () => {
  return(<Provider store={store}>
    <Router>
      <>
        <Nav/>
        <Route exact path='/' component={Landing}/>
        <section className="container">
          <Switch>
            <Route exact path='/register/:teacher/:class' component={Register}/>
            <Route exact path='/register/:teacher' component={Register}/>
            <Route exact path='/login' component={Login}/>
            <PrivateRoute exact path='/dashboard' component={Dashboard}/>
            <TeacherRoute exact path='/classes' component={Classes}/>
            <TeacherRoute exact path='/student/:id' component={StudentProfile}/>
            <TeacherRoute exact path='/tasks' component={TaskDashboard}/>
            <PrivateRoute exact path='/display/openTask/:id' component={DisplayOpenTask}/>
            <PrivateRoute exact path='/display/closeTask/:id' component={DisplayCloseTask}/>
            <PrivateRoute exact path='/display/booleanTask/:id' component={DisplayBooleanTask}/>
            <TeacherRoute exact path='/add/openTask' component={AddOpenTask}/>
            <TeacherRoute exact path='/add/closeTask' component={AddCloseTask}/>
            <TeacherRoute exact path='/add/booleanTask' component={AddOpenTask}/>

          </Switch>
        </section>
      </>
    </Router>
  </Provider>)
};

export default App;
