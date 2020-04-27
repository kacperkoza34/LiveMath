import React, { useState } from "react";
import PropTypes from "prop-types";
import MathJax from "../../MathJax";
import { connect } from "react-redux";
import { addGroup, deleteGroup } from "../../../../redux/actions/newTask";
import { v4 as uuidv4 } from "uuid";

const AddQuestion = ({ addGroup, deleteGroup, groups }) => {
  const [formData, setFormData] = useState({
    content: "",
    answer: "",
    id: uuidv4(),
  });

  const [noAnswer, setNoAnswer] = useState(false);

  const onChange = (e) => {
    if (e.target.name === "answer") {
      if (e.target.value === "")
        setFormData({ ...formData, [e.target.name]: "" });
      else
        setFormData({
          ...formData,
          [e.target.name]: e.target.value === "true" ? true : false,
        });
    } else setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.answer !== "") {
      addGroup(formData);
      setFormData({
        content: "",
        answer: "",
        id: uuidv4(),
      });
      setNoAnswer(false);
    } else setNoAnswer(true);
  };
  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <h5>Podaj teze</h5>
          <input
            placeholder="Teza"
            name="content"
            value={formData.content}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <h5>Dodaj odpowiedz:</h5>
          <select
            name="answer"
            value={formData.answer}
            onChange={(e) => onChange(e)}
          >
            <option value={""}>---</option>
            <option value={true}>Prawda</option>
            <option value={false}>Fałsz</option>
          </select>
        </div>
        {noAnswer && <h5>Podaj odpowiedz</h5>}
        {<input type="submit" value="Dodaj" />}
        {groups.map(({ content, answer, id }, index) => (
          <li styles="display: block">
            <span>{`${index + 1}). `}</span>
            <span>{content}</span>
            <span>{`Odpowiedź: ${answer ? "Prawda" : "Fałsz"}`}</span>
            <button onClick={() => deleteGroup(id)}>Usun grupe</button>
          </li>
        ))}
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  groups: state.newTask.data.groups,
});

export default connect(mapStateToProps, { addGroup, deleteGroup })(AddQuestion);
