import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./SelectSection.module.scss";
import BtnPrimary from "../../features/BtnPrimary/BtnPrimary";

const SelectSection = ({ activePage, setActivePage }) => {
  return (
    <div className={styles.root}>
      <Link to={"/tasks"}>
        <BtnPrimary size={12} border={2}>
          Dodaj zadanie
        </BtnPrimary>
      </Link>

      <div>
        <span
          className={activePage === 1 ? styles.btnListActive : styles.btnList}
          onClick={() => setActivePage(1)}
        >
          Uczniowie
        </span>
        <span
          className={activePage === 2 ? styles.btnListActive : styles.btnList}
          onClick={() => setActivePage(2)}
        >
          Zadania
        </span>
      </div>
    </div>
  );
};

SelectSection.propTypes = {
  activePage: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired
};

export default SelectSection;
