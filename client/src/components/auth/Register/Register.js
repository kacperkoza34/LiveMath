import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "./Register.module.scss";
import PropTypes from "prop-types";
import BeatLoader from "react-spinners/BeatLoader";
import Errors from "../../layout/Errors/Errors";
import { connect } from "react-redux";
import {
  register,
  alreadyLogged,
  clearErrors,
} from "../../../redux/actions/auth";

const Register = ({
  auth: { isAuthenticated, isFetching, errors },
  register,
  alreadyLogged,
  match,
  clearErrors,
}) => {
  useEffect(() => {
    if (localStorage.token) {
      alreadyLogged({ token: localStorage.token });
    }
    return () => clearErrors();
  }, [alreadyLogged]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [passwordsErr, setPasswordErr] = useState([]);
  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setPasswordErr([]);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setPasswordErr([{ msg: "Hasła nie są takie same" }]);
    } else {
      setPasswordErr([]);
      register({ name, email, password, params: match.params });
    }
  };

  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h1 className="large text-primary">Stwórz konto</h1>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <h4>Podaj swoją nazwe</h4>
            <input
              autocomplete="off"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <h4>Email</h4>
            <input
              autocomplete="off"
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <h4>Hasło</h4>
            <input
              autocomplete="off"
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <h4>Potwierdź hasło</h4>
            <input
              autocomplete="off"
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          {isFetching ? <BeatLoader size={30} /> : <button>Zarejestruj</button>}
        </form>
        <p className="my-1">
          Masz juz konto?{" "}
          <Link to="/login" className={styles.btnRedirect}>
            Zaloguj się
          </Link>
        </p>
        {passwordsErr.length > 0 && <Errors errors={[...passwordsErr]} />}
        {errors && <Errors errors={[...errors.data.err]} />}
      </div>
    </div>
  );
};

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  alreadyLogged: PropTypes.object.isRequired,
  match: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  register,
  alreadyLogged,
  clearErrors,
})(Register);
