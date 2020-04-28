import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./AdditionalVariables.module.scss";
import { connect } from "react-redux";
import {
  addAddVariable,
  removeAddVariable,
} from "../../../../../../redux/actions/newTask";

const AdditionalVariables = ({
  addAddVariable,
  additionalVariables,
  variables,
  removeAddVariable,
}) => {
  const [formData, setFormData] = useState({
    variable: "",
    description: "",
  });
  const [error, setError] = useState("");

  const onChange = (e) => {
    if (e.target.name == "variable") {
      if (e.target.value.length > 1) setError("Zmienne nazywamy jedną literą");
      else {
        let alredyUsed = [...variables, ...additionalVariables].some(
          ({ variable }) => variable == e.target.value
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
  const onSubmit = (e) => {
    e.preventDefault();
    addAddVariable({
      variable: formData.variable,
      description: formData.description,
    });
    setFormData({ variable: "", description: "" });
  };
  const remove = (name) => {
    removeAddVariable(name);
  };
  return (
    variables.length > 0 && (
      <div className={styles.root}>
        <h3>Dodaj pomocnicze zmienne</h3>
        <form className={styles.addFrom} onSubmit={(e) => onSubmit(e)}>
          <table>
            <tr>
              <td className={styles.variable}>Nazwa</td>
              <td>Opis</td>
            </tr>
          </table>
          <table>
            <tr>
              <td className={styles.variable}>
                <input
                  className={styles.variable}
                  name={"variable"}
                  placeholder="Zmienna"
                  value={formData.variable}
                  onChange={(e) => onChange(e)}
                  required
                />
              </td>
              <td>
                {" "}
                <input
                  name={"description"}
                  placeholder="Opis"
                  value={formData.description}
                  onChange={(e) => onChange(e)}
                  required
                />
              </td>
            </tr>
          </table>
          <button>Dodaj</button>
        </form>
        {error.length > 0 && error}
        {additionalVariables.length > 0 && (
          <ul className={styles.varList}>
            <h3>Pomocnicze zmienne</h3>
            <table>
              <tr>
                <td className={styles.variable}>Nazwa</td>
                <td>Opis</td>
              </tr>
            </table>
            {additionalVariables.map(({ variable, description }) => (
              <>
                <div>
                  <li className={styles.listElement}>
                    <table>
                      <tr>
                        <td className={styles.variable}>{variable}</td>
                        <td className={styles.description}>{description}</td>
                      </tr>
                      <tr>
                        <button
                          className={styles.delete}
                          onClick={() => remove(variable)}
                        >
                          Usuń
                        </button>
                      </tr>
                    </table>
                  </li>
                </div>
              </>
            ))}
          </ul>
        )}
      </div>
    )
  );
};

AdditionalVariables.propTypes = {};

const mapStateToProps = (state) => ({
  additionalVariables: state.newTask.data.additionalVariables,
  variables: state.newTask.data.variables,
});

export default connect(mapStateToProps, { addAddVariable, removeAddVariable })(
  AdditionalVariables
);
