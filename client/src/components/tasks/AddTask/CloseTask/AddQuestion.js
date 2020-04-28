import React, { useState } from "react";
import PropTypes from "prop-types";
import MathJax from "../../MathJax";
import styles from "./AddQuestion.module.scss";
import { connect } from "react-redux";
import { addGroup, deleteGroup } from "../../../../redux/actions/newTask";
import { v4 as uuidv4 } from "uuid";

const AddQuestion = ({ addGroup, deleteGroup, groups }) => {
  const [formData, setFormData] = useState({
    content: "",
    answer: "",
    id: uuidv4(),
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addGroup(formData);
    setFormData({
      content: "",
      answer: "",
      id: uuidv4(),
    });
  };
  return (
    <div className={styles.root}>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <h5>Wprowadz równanie</h5>
          <input
            autocomplete="off"
            placeholder="Równanie"
            name="content"
            value={formData.content}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <MathJax content={"`" + formData.content + "`"} />
        <div>
          <h5>Dodaj odpowiedz:</h5>
          <input
            autocomplete="off"
            placeholder="Odpowiedz"
            name="answer"
            value={formData.answer}
            onChange={(e) => onChange(e)}
            required
          />
          <MathJax content={"`" + formData.answer + "`"} />
        </div>
        <button>Dodaj</button>
        {groups.length > 0 && (
          <ul className={styles.groupList}>
            {groups.map(({ content, answer, id }, index) => (
              <li className={styles.listElement}>
                <span className={styles.order}>
                  <div>{`${index + 1}).   `}</div>
                  <div>
                    <MathJax content={"`" + content + "`"} />
                  </div>
                </span>
                <span className={styles.order}>
                  <div>{`Odpowiedź: `}</div>
                  <div>
                    <MathJax content={"`" + answer + "`"} />
                  </div>
                </span>
                <button onClick={() => deleteGroup(id)}>Usun grupe</button>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  groups: state.newTask.data.groups,
});

export default connect(mapStateToProps, { addGroup, deleteGroup })(AddQuestion);
