import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./MainLayout.module.scss";
import Nav from "../Nav/Nav";
import { Route, useLocation } from "react-router-dom";
import { matchPath } from "react-router";
import Landing from "../Landing/Landing";
import Login from "../../auth/Login/Login";
import Register from "../../auth/Register/Register";

const MainLayout = props => {
  const { children } = props;

  return (
    <main>
      <Nav />
      <section className={styles.root}>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register/:teacher/:class" component={Register} />
        <Route exact path="/register/:teacher" component={Register} />
        <div className={styles.wrapper}>{children}</div>
      </section>
    </main>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;
