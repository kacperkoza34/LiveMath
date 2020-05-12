import React, { useEffect, useState } from "react";
import styles from "./Nav.module.scss";
import MobileNav from "./MobileNav";
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
  const [mobileNav, setMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) setMobile(true);
    else setMobile(false);
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) setMobile(true);
      else setMobile(false);
    });
  }, []);

  const authLinks =
    accountType === "teacher" ? (
      <>
        <li>
          <Link to="/about/1">Pomoc</Link>
        </li>
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
      </>
    ) : (
      <>
        <li>
          <Link to="/about/1">Pomoc</Link>
        </li>
        <li>
          <Link to="/dashboard">Zadania </Link>
        </li>
        <li>
          <Link onClick={logout} to="/login">
            Wyloguj{" "}
          </Link>
        </li>
      </>
    );

  const guestLinks = (
    <>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );

  const logo = (
    <>
      <Link to="/">
        <img src={"/liveMathLogo.png"} />
      </Link>
      {fetching && <ClipLoader size={25} />}
    </>
  );
  return (
    <>
      {mobileNav ? (
        <MobileNav
          logo={logo}
          navLinks={isAuthenticated ? authLinks : guestLinks}
        />
      ) : (
        <nav className={styles.root}>
          <div className={styles.logo}>{logo}</div>
          {isFetching ? (
            ""
          ) : isAuthenticated ? (
            <ul className={styles.navLinks}>{authLinks}</ul>
          ) : (
            <ul className={styles.navLinks}>{guestLinks}</ul>
          )}
        </nav>
      )}
    </>
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
