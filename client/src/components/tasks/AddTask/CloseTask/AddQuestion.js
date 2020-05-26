import React, { useState } from "react";
import PropTypes from "prop-types";
import MathJax from "../../MathJax";
import CustomInput from "../../../features/CustomInput/CustomInput";
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
          <CustomInput
            autoComplete="off"
            placeholder="Równanie"
            name="content"
            state={formData.content}
            action={onChange}
            required
          />
        </div>
        <MathJax content={"`" + formData.content + "`"} />
        <div>
          <h5>Dodaj odpowiedz:</h5>
          <CustomInput
            autoComplete="off"
            placeholder="Odpowiedz"
            name="answer"
            state={formData.answer}
            action={onChange}
            required
          />
          <MathJax content={"`" + formData.answer + "`"} />
        </div>
        <button>Dodaj</button>
        {groups.length > 0 && (
          <ul className={styles.groupList}>
            {groups.map(({ content, answer, id }, index) => (
              <li key={index} className={styles.listElement}>
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

AddQuestion.propTypes = {
  addGroup: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  groups: state.newTask.data.groups,
});

export default connect(mapStateToProps, { addGroup, deleteGroup })(AddQuestion);
