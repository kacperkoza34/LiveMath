import React from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./VariabelsList.module.scss";
import { connect } from "react-redux";
import {
  addTaskData,
  addVarDescription,
} from "../../../../../../redux/actions/newTask";

class VariabelsList extends React.Component {
  state = {
    variablesInput: "",
    activeForm: 0,
    addingType: "",
    varsExist: false,
    varsOneLetter: false,
  };

  getCode() {
    const { taskContent: task } = this.props;
    let subString = "";
    let start = false;
    const code = [];
    for (let i in task) {
      if (task[i] === "}") {
        if (subString.length) {
          if (!code.some(({ variable }) => variable === subString.trim())) {
            code.push({ variable: subString.trim(), description: "" });
          }
        }
        subString = "";
        start = false;
      }
      if (start) subString = subString + task[i];
      if (task[i] === "{") {
        start = true;
        i++;
      }
    }
    if (code.length) {
      this.setState({ varsExist: false });
      if (code.some(({ variable }) => variable.length !== 1)) {
        this.setState({ varsOneLetter: true });
        return [];
      } else {
        this.setState({ varsOneLetter: false });
        return code;
      }
    } else {
      this.setState({ varsExist: true });
      return code;
    }
  }

  addDescription(e, variable) {
    const { addVarDescription } = this.props;
    addVarDescription(e.target.value, variable);
  }

  render() {
    const { addTaskData, taskData } = this.props;
    return (
      <div className={styles.root}>
        <button onClick={() => addTaskData(this.getCode())}>
          Ustal zmienne
        </button>
        {this.state.varsExist && (
          <h4 className={styles.warning}>Nie podano zmiennych</h4>
        )}
        {this.state.varsOneLetter && (
          <h4 className={styles.warning}>
            Nazwy zmiennych powinny zawierać jedną litere
          </h4>
        )}

        {Array.from(taskData).length > 0 && (
          <div className={styles.varList}>
            <h3>Zmienne zdefiniowane w treści</h3>
            <ul>
              <li>
                <table>
                  <thead>
                    <tr>
                      <td className={styles.variable}>Nazwa</td>
                      <td>Opis</td>
                    </tr>
                  </thead>
                </table>
              </li>
              {Array.from(taskData).map(({ variable, description }) => (
                <li key={variable}>
                  <table>
                    <tbody>
                      <tr>
                        <td className={styles.variable}>{variable}</td>
                        <td>
                          <TextareaAutosize
                            value={description}
                            placeholder="Opis"
                            onChange={(e) => this.addDescription(e, variable)}
                            name="title"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

VariabelsList.propTypes = {
  taskContent: PropTypes.string.isRequired,
  addVarDescription: PropTypes.func.isRequired,
  addTaskData: PropTypes.func.isRequired,
  taskData: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  taskContent: state.newTask.data.content,
  taskData: state.newTask.data.variables,
});

export default connect(mapStateToProps, { addTaskData, addVarDescription })(
  VariabelsList
);
