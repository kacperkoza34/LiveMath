import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SelectPrompt.module.scss";
import { connect } from "react-redux";
import { setPrompts } from "../../../../redux/actions/taskToClass";

const SelectPropmt = ({ setPrompts }) => {
  const [formData, setFormData] = useState(false);

  const onClick = (name) => {
    setFormData(!formData);
    setPrompts(!formData);
  };
  return (
    <div className={styles.root}>
      <div>
        <input
          type="checkbox"
          onClick={(e) => onClick(e.target.name)}
          name="prompt"
        />
        <label>Dostępne podpowiedzi</label>
      </div>
    </div>
  );
};

SelectPropmt.propTypes = {
  setPrompts: PropTypes.func.isRequired,
};

export default connect(null, { setPrompts })(SelectPropmt);
