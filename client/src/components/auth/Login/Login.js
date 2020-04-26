import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "./Login.module.scss";
import PropTypes from "prop-types";
import BeatLoader from "react-spinners/BeatLoader";
import { connect } from "react-redux";
import { login, alreadyLogged } from "../../../redux/actions/auth";

const Login = ({
  login,
  alreadyLogged,
  auth: { isAuthenticated, isFetching, errors },
}) => {
  useEffect(() => {
    if (localStorage.token) {
      alreadyLogged({ token: localStorage.token });
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    accountType: "teacher",
  });
  const { email, password, accountType } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password, accountType });
  };
  // Redirect if loged in
  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h1>Logowanie</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <h4>Email</h4>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div>
            <h4>Hasło</h4>
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <small>Wybierz rodzaj konta</small>
          <div>
            <select onChange={(e) => onChange(e)} name="accountType" required>
              <option value={"teacher"}>Nauczyciel</option>
              <option value={"student"}>Uczeń</option>
            </select>
          </div>
          {isFetching ? (
            <BeatLoader size={30} />
          ) : (
            <input type="submit" className="btn btn-primary" value="Login" />
          )}
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  alreadyLogged: PropTypes.func.isRequired,
  auht: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login, alreadyLogged })(Login);
