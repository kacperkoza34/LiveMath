import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { register, alreadyLogged } from '../../redux/actions/auth';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Errors from '../layout/Errors';

const Register = ({ auth : { isAuthenticated, isFetching, errors }, register, alreadyLogged , match }) => {
  useEffect(()=>{
    if(localStorage.token){
      alreadyLogged({token:localStorage.token});
    }
  },[]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [passwordsErr, setPasswordErr] = useState([]);
  const { name,email,password,password2 } = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
  const onSubmit = async e =>{
    e.preventDefault();
    if(password !== password2){
      setPasswordErr([{msg: 'Hasła nie są takie same'}]);
    } else {
      setPasswordErr([]);
      register({name,email,password, params: match.params});
    }
  }

  if(isAuthenticated) return <Redirect to='/dashboard' />;

  return(
  <>
    <h1 className="large text-primary">Sign Up</h1>
    <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
    <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={e => onChange(e)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={e => onChange(e)}
          required
        />
        <small className="form-text"
          >This site uses Gravatar so if you want a profile image, use a
          Gravatar email</small
        >
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
        <input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          minLength="6"
          value={password2}
          onChange={e => onChange(e)}
          required
        />
      </div>
      {isFetching? <Spinner/> : <input type="submit" className="btn btn-primary" value="Register" />}
    </form>
    <p className="my-1">
      Already have an account? <Link to='/login'>Sign In</Link>
    </p>
  </>
);
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.array
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps,{ register, alreadyLogged })(Register);
