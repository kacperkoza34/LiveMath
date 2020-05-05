import React from "react";
import styles from "./Nav.module.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";
import { connect } from "react-redux";
import { logout } from "../../../redux/actions/auth";

const Nav = ({
  fetching,
  user: {
    isFetching,
    data: { accountType },
  },
  auth: { isAuthenticated },
  logout,
}) => {
  const authLinks =
    accountType === "teacher" ? (
      <ul className={styles.navLinks}>
        <li>
          <Link to="/classes">Klasy</Link>
        </li>
        <li>
          <Link to="/tasks">Zadania</Link>
        </li>
        <li>
          <Link to="/dashboard">Konto</Link>
        </li>
        <li>
          <Link onClick={logout} to="/login">
            Wyloguj{" "}
          </Link>
        </li>
      </ul>
    ) : (
      <ul className={styles.navLinks}>
        <li>
          <Link to="/class">Moja klasa</Link>
        </li>
        <li>
          <Link to="/dashboard">Konto</Link>
        </li>
        <li>
          <Link onClick={logout} to="/login">
            Wyloguj{" "}
          </Link>
        </li>
      </ul>
    );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className={styles.root}>
      <h1>
        <Link to="/">LiveMath</Link>
        {fetching && <ClipLoader size={25} />}
      </h1>
      {isFetching ? "" : isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  fetching: state.smallLoading,
});

export default connect(mapStateToProps, { logout })(Nav);
