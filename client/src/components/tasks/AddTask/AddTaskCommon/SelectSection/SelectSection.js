import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { availableClasses } from "../../../../../data/TaskDashboardConfig.js";
import { addClass, addSection } from "../../../../../redux/actions/newTask";

const SelectSection = ({ addClass, addSection }) => {
  const [currentClass, setCurrentClass] = useState("");
  const [currentSection, setCurrentSection] = useState("");

  const setClass = (e) => {
    setCurrentClass(e.target.value);
    addClass(e.target.value);
    setCurrentSection("");
    addSection("");
  };

  const setSection = (e) => {
    setCurrentSection(e.target.value);
    addSection(e.target.value);
  };

  return (
    <>
      <h5>Wybierz klase i dział</h5>
      <select
        value={currentClass}
        onChange={(e) => {
          setClass(e);
        }}
      >
        <option value={""}>---</option>
        {availableClasses.map(({ name, id }) => (
          <option value={id}>{name}</option>
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
          availableClasses[currentClass - 1].sections.map(({ name, id }) => (
            <option value={id}>{name}</option>
          ))}
      </select>
    </>
  );
};

export default connect(null, { addClass, addSection })(SelectSection);
