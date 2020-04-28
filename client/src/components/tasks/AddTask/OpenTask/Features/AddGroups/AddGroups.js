import React, { useState } from "react";
import styles from "./AddGroups.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import MathJax from "../../../../MathJax";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { addGroup, deleteGroup } from "../../../../../../redux/actions/newTask";

const AddGroups = ({ variables, content, addGroup, deleteGroup, groups }) => {
  const mockVars = {};
  variables.forEach(({ variable }, index) => {
    mockVars[variable] = "";
  });

  const [formData, setFormData] = useState({ ...mockVars, answer: "" });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addGroup({ ...formData, id: uuidv4() });
    setFormData({ ...mockVars, answer: "" });
  };
  const displayGroup = (item) => {
    const listItems = [];
    for (let i in item) {
      if (i != "id") {
        listItems.push(
          <li className={styles.readyGroupView}>
            <span>{i == "answer" ? "Odpowiedz =  " : `${i} =  `}</span>
            <span>
              <MathJax content={"`" + item[i] + "`"} />
            </span>
          </li>
        );
      }
    }
    const list = <ul>{listItems}</ul>;

    return list;
  };
  return (
    <div className={styles.root}>
      {variables.length > 0 && (
        <form className={styles.addGroup} onSubmit={(e) => onSubmit(e)}>
          <h3>Zdefinuj wartości dla grup</h3>
          {variables.map(({ variable }) => (
            <div className={styles.box}>
              <h5>{variable + "  =  "}</h5>
              <input
                autocomplete="off"
                placeholder="Wartość"
                name={variable}
                value={formData[variable]}
                onChange={(e) => onChange(e)}
                required
              />
              {" =  "}
              <MathJax
                content={
                  formData[variable] ? "`" + formData[variable] + "`" : " "
                }
              />
            </div>
          ))}
          <div className={styles.box}>
            <h5>Wynik:</h5>
            <input
              autocomplete="off"
              placeholder="Odpowiedz"
              name="answer"
              value={formData.answer}
              onChange={(e) => onChange(e)}
              required
            />
            {" =  "}
            <MathJax content={"`" + formData.answer + "`"} />
          </div>
          {<button>Dodaj</button>}
        </form>
      )}
      {groups.length > 0 && (
        <ul className={styles.groups}>
          {groups.map((item, index) => (
            <li className={styles.singleGroup} styles="display: block">
              <h4>{`Grupa ${index + 1}`}</h4>
              {displayGroup(item)}
              <button onClick={() => deleteGroup(item.id)}>Usun grupe</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  variables: state.newTask.data.variables,
  content: state.newTask.data.content,
  groups: state.newTask.data.groups,
});

export default connect(mapStateToProps, { addGroup, deleteGroup })(AddGroups);
