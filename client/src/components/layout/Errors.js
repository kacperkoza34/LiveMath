import React from "react";
import PropTypes from "prop-types";

const Errors = ({ errors }) => {
  const uniqueErrors = [...new Set(errors)];
  return (
    <>
      {uniqueErrors.map(({ msg }, index) => (
        <div key={index} className="alert alert-danger">
          {msg}
        </div>
      ))}
    </>
  );
};

Errors.propTypes = {
  errors: PropTypes.array.isRequired,
};

export default Errors;
