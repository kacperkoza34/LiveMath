import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SelectSection.module.scss";
import { connect } from "react-redux";
import { availableClasses } from "../../../../../data/TaskDashboardConfig.js";
import { addClass, addSection } from "../../../../../redux/actions/newTask";

const SelectSection = ({ addClass, addSection }) => {
  const [currentClass, setCurrentClass] = useState("");
  const [currentSection, setCurrentSection] = useState("");

  const setClass = (e) => {
    setCurrentSection("");
    addSection("");
    setCurrentClass(e.target.value);
    addClass(e.target.value);
  };

  const setSection = (e) => {
    setCurrentSection(e.target.value);
    addSection(e.target.value);
  };
  console.log(currentClass);
  console.log(currentSection);
  return (
    <div className={styles.root}>
      <h5>Wybierz klase i dział</h5>
      <select
        value={currentClass}
        onChange={(e) => {
          setClass(e);
        }}
      >
        <option value={""}>---</option>
        {availableClasses.map(({ name, id }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <select
        value={currentSection}
        onChange={(e) => {
          setSection(e);
        }}
      >
        <option value={""}>---</option>
        {currentClass &&
          availableClasses[currentClass].sections.map(({ name, id }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
      </select>
    </div>
  );
};

SelectSection.propTypes = {
  addClass: PropTypes.func.isRequired,
  addSection: PropTypes.func.isRequired,
};

export default connect(null, { addClass, addSection })(SelectSection);
