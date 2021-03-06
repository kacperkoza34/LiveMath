import React, { useState } from "react";
import PropTypes from "prop-types";
import Errors from "../../layout/Errors/Errors";
import BtnPrimary from "../../features/BtnPrimary/BtnPrimary";
import { connect } from "react-redux";
import { addClass } from "../../../redux/actions/classes";

const AddClass = ({ addClass, errors }) => {
  const [formData, setFormData] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    addClass({ title: formData });
    setFormData("");
  };
  return (
    <>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <h5>Dodaj klase</h5>
        <div>
          <input
            placeholder="Nazwa klasy"
            name="title"
            value={formData}
            onChange={e => setFormData(e.target.value)}
            required
          />
        </div>
        <BtnPrimary font={12} border={2}>
          Dodaj
        </BtnPrimary>
        {errors && <Errors errors={errors.data.err} />}
      </form>
    </>
  );
};

AddClass.propTypes = {
  addClass: PropTypes.func.isRequired,
  errors: PropTypes.any.isRequired
};

const mapStateToProps = state => ({
  errors: state.classes.errors
});

export default connect(mapStateToProps, { addClass })(AddClass);
