import React from "react";
import PropTypes from "prop-types";
import styles from "./MainLayout.module.scss";
import Nav from "../Nav/Nav";
import { Route } from "react-router-dom";
import Landing from "../Landing/Landing";

const MainLayout = ({ children }) => (
  <main>
    <Nav />
    <Route exact path="/" component={Landing} />
    <section className={styles.root}>
      <div className={styles.wrapper}>{children}</div>
    </section>
  </main>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
