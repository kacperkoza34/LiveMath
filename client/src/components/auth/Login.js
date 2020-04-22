import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, alreadyLogged } from '../../redux/actions/auth';
import Spinner from '../layout/Spinner';
import Errors from '../layout/Errors';

const Login = ({ login, alreadyLogged, auth:{ isAuthenticated, isFetching, errors } }) => {
  useEffect(()=>{
    if(localStorage.token){
      alreadyLogged({token:localStorage.token});
    }
  },[]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    accountType: 'teacher'
  });
  const { email,password,accountType } = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
  const onSubmit = async e =>{
    e.preventDefault();
    login({email,password, accountType});
  }
  // Redirect if loged in
  if(isAuthenticated) return <Redirect to='/dashboard' />;

  return(
  <>
    <h1 className="large text-primary">Sign In</h1>
    <p className="lead"><i className="fas fa-user"></i> Logowanie</p>
    <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={e => onChange(e)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
          minLength="6"
          value={password}
          onChange={e => onChange(e)}
          required
        />
      </div>
      <div className="form-group">
        <select onChange={e => onChange(e)} name="accountType" required>
          <option value={'teacher'}>Nauczyciel</option>
          <option value={'student'}>Uczeń</option>
        </select>
        <small className="form-text"
          >Wybierz rodzaj konta</small
        >
      </div>
      {isFetching? <Spinner/> : <input type="submit" className="btn btn-primary" value="Login" />}
    </form>
  </>
);
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {login, alreadyLogged}
)(Login);
