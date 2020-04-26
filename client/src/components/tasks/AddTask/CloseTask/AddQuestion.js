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
  console.log(groups);
  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <h5>Wprowadz równanie</h5>
          <input
            placeholder="Równanie"
            name="content"
            value={formData.content}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <MathJax content={formData.content} />
        <div>
          <h5>Dodaj odpowiedz:</h5>
          <input
            placeholder="Odpowiedz"
            name="answer"
            value={formData.answer}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        {<input type="submit" value="Dodaj" />}
        {groups.map(({ content, answer, id }, index) => (
          <li styles="display: block">
            <span>{`${index + 1}). `}</span>
            <MathJax content={content} />
            <span>{`Odpowiedź: ${answer}`}</span>
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
