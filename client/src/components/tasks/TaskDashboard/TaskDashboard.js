import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TasksList from "../TasksList/TasksList";
import NewTask from "../NewTask/NewTask";
import "./TaskDashboard.css";
import { availableClasses } from "../../../data/TaskDashboardConfig.js";
import { taskSuccess } from "../../../redux/actions/tasks";
import { connect } from "react-redux";

const TaskDashboard = ({ taskSuccess }) => {
  useEffect(() => {
    taskSuccess({});
  }, []);

  const [activeList, setActiveList] = useState(null);
  const [title, setTitle] = useState("Wybierz klase");
  const [activeSection, setActiveSection] = useState(null);

  const hideSections = () => {
    setActiveList(null);
    setActiveSection(null);
  };
  const showSections = (id) => {
    setActiveList(id);
    setActiveSection(null);
  };
  return (
    <>
      <NewTask />
      <div className="wrapper">
        <div className="select-class-width">
          <h2>Zadania</h2>
          <ul>
            {availableClasses.map(({ name, id, sections }) => (
              <>
                <li
                  onClick={() => {
                    id == activeList ? hideSections() : setActiveList(id);
                  }}
                >
                  <span>{name}</span>
                </li>
                {id == activeList ? (
                  <ul className="sublist">
                    {sections.map((section) => (
                      <li
                        className="list-el"
                        onClick={() => setActiveSection(section.id)}
                      >
                        {section.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </>
            ))}
          </ul>
        </div>
        <div className="students-view bg-dark">
          <TasksList classId={activeList} sectionId={activeSection} />
        </div>
      </div>
    </>
  );
};

export default connect(null, { taskSuccess })(TaskDashboard);
