import React, { useState } from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "react-textarea-autosize";
import { connect } from "react-redux";
import { setMessage } from "../../../../redux/actions/taskToClass";
import ReactHtmlParser from "react-html-parser";

const SetDescription = ({ setMessage }) => {
  const [formData, setFormData] = useState(false);

  return (
    <div>
      <div>
        <h4>Dodatkowy opis zadania</h4>
        <TextareaAutosize
          styles="white-space: pre-line;"
          onChange={e => {
            setFormData(e.target.value);
            setMessage(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

SetDescription.propTypes = {
  setMessage: PropTypes.func.isRequired
};

export default connect(null, { setMessage })(SetDescription);
