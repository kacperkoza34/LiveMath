import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SelectDescription.module.scss";
import { connect } from "react-redux";
import { setDescription } from "../../../../redux/actions/taskToClass";

const SelectDescription = ({ setDescription }) => {
  const [formData, setFormData] = useState(false);

  const onClick = (name) => {
    setFormData(!formData);
    setDescription(!formData);
  };
  return (
    <div className={styles.root}>
      <div>
        <input
          type="checkbox"
          onClick={(e) => onClick(e.target.name)}
          name="description"
        />
        <label>Wymagany opis</label>
      </div>
    </div>
  );
};

SelectDescription.propTypes = {
  setDescription: PropTypes.func.isRequired,
};

export default connect(null, { setDescription })(SelectDescription);
