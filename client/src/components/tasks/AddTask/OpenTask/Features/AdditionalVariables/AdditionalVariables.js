import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./AdditionalVariables.module.scss";
import MathJax from "../../../../MathJax";
import BtnPrimary from "../../../../../features/BtnPrimary/BtnPrimary";
import { connect } from "react-redux";
import {
  addAddVariable,
  removeAddVariable
} from "../../../../../../redux/actions/newTask";

const AdditionalVariables = ({
  addAddVariable,
  additionalVariables,
  variables,
  removeAddVariable
}) => {
  const [formData, setFormData] = useState({
    variable: "",
    description: ""
  });
  const [error, setError] = useState("");

  const onChange = e => {
    if (e.target.name === "variable") {
      if (e.target.value.length > 1) setError("Zmienne nazywamy jedną literą");
      else {
        let alredyUsed = [...variables, ...additionalVariables].some(
          ({ variable }) => variable === e.target.value
        );
        if (!alredyUsed) {
          setFormData({ ...formData, [e.target.name]: e.target.value });
          setError("");
        } else {
          setError("Posiadasz już zmienną o tej nazwie");
          setFormData({ ...formData, [e.target.name]: "" });
        }
      }
    } else setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    addAddVariable({
      variable: formData.variable,
      description: formData.description
    });
    setFormData({ variable: "", description: "" });
  };
  const remove = name => {
    removeAddVariable(name);
  };
  return (
    variables.length > 0 && (
      <div className={styles.root}>
        <h3>
          Dodaj pomocnicze zmienne{" "}
          <BtnPrimary
            border={2}
            font={12}
            onClick={() =>
              setFormData({
                ...formData,
                description: formData.description + "`" + "2/3+(3*3)/9" + "`"
              })
            }
          >
            Umieść wzór w opisie
          </BtnPrimary>
        </h3>
        <form className={styles.addFrom} onSubmit={e => onSubmit(e)}>
          <table>
            <thead>
              <tr>
                <td className={styles.variable}>Nazwa</td>
                <td>Opis</td>
              </tr>
            </thead>
          </table>
          <table>
            <thead>
              <tr>
                <td className={styles.variable}>
                  <input
                    name={"variable"}
                    placeholder="Zmienna"
                    value={formData.variable}
                    onChange={e => onChange(e)}
                    required
                  />
                </td>
                <td>
                  <input
                    name={"description"}
                    placeholder="Opis"
                    value={formData.description}
                    onChange={e => onChange(e)}
                    required
                  />
                </td>
              </tr>
            </thead>
          </table>
          {formData.description.length > 0 && (
            <div className={styles.varList}>
              <div className={styles.listElement}>
                <table>
                  <tbody>
                    <tr>
                      <td className={styles.variable}>{formData.variable}</td>
                      <td className={styles.description}>
                        <MathJax content={formData.description} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <BtnPrimary border={2} font={12}>
            Dodaj
          </BtnPrimary>
        </form>
        {error.length > 0 && error}
        {additionalVariables.length > 0 && (
          <ul className={styles.varList}>
            <h3>Pomocnicze zmienne</h3>
            <table>
              <thead>
                <tr>
                  <td className={styles.variable}>Nazwa</td>
                  <td>Opis</td>
                </tr>
              </thead>
            </table>
            {additionalVariables.map(({ variable, description }, index) => (
              <div key={index}>
                <li className={styles.listElement}>
                  <table>
                    <tbody>
                      <tr>
                        <td className={styles.variable}>{variable}</td>
                        <td>
                          <MathJax content={description} />
                        </td>
                      </tr>
                      <tr>
                        <BtnPrimary
                          border={2}
                          font={12}
                          onClick={() => remove(variable)}
                        >
                          Usuń
                        </BtnPrimary>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </div>
            ))}
          </ul>
        )}
      </div>
    )
  );
};

AdditionalVariables.propTypes = {
  addAddVariable: PropTypes.func.isRequired,
  additionalVariables: PropTypes.array.isRequired,
  variables: PropTypes.array.isRequired,
  removeAddVariable: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  additionalVariables: state.newTask.data.additionalVariables,
  variables: state.newTask.data.variables
});

export default connect(mapStateToProps, { addAddVariable, removeAddVariable })(
  AdditionalVariables
);
