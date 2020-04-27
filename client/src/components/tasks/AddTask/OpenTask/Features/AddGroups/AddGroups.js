import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { addGroup, deleteGroup } from "../../../../../../redux/actions/newTask";

const AddGroups = ({ variables, content, addGroup, deleteGroup, groups }) => {
  useEffect(() => {}, [variables, content]);

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
          <li styles="display: block">
            <span>{i == "answer" ? "Odpowiedz:  " : `${i}:  `}</span>
            <span>{item[i]}</span>
          </li>
        );
      }
    }
    const list = <ul>{listItems}</ul>;

    return list;
  };
  return (
    <>
      {variables.length > 0 && (
        <form onSubmit={(e) => onSubmit(e)}>
          <h5>Zdefinuj zmienne dla grup</h5>
          {variables.map(({ variable }) => (
            <div>
              <h5>{variable + "  =  "}</h5>
              <input
                placeholder="Wartość"
                name={variable}
                value={formData[variable]}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          ))}
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
        </form>
      )}
      <ul>
        {groups.map((item, index) => (
          <li styles="display: block">
            {`Grupa ${index + 1}`}
            {displayGroup(item)}
            <button onClick={() => deleteGroup(item.id)}>Usun grupe</button>
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = (state) => ({
  variables: state.newTask.data.variables,
  content: state.newTask.data.content,
  groups: state.newTask.data.groups,
});

export default connect(mapStateToProps, { addGroup, deleteGroup })(AddGroups);
