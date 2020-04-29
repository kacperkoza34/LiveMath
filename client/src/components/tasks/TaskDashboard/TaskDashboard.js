import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./TaskDashboard.module.scss";
import TasksList from "../TasksList/TasksList";
import NewTask from "../NewTask/NewTask";
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
  const setList = (id) => {
    setActiveList(id);
    setActiveSection(null);
  };
  return (
    <div className={styles.root}>
      <NewTask />
      <div className={styles.wrapper}>
        <div className={styles.asideWrapper}>
          <h2>Zadania</h2>
          <ul>
            {availableClasses.map(({ name, id, sections }) => (
              <>
                <li
                  className={
                    id == activeList ? styles.btnListActive : styles.btnList
                  }
                  onClick={() => {
                    id == activeList ? hideSections() : setList(id);
                  }}
                >
                  <span>{name}</span>
                </li>
                {id == activeList && (
                  <ul className={styles.subList}>
                    {sections.map((section) => (
                      <li
                        className={
                          activeSection == section.id
                            ? styles.btnListActive
                            : styles.btnList
                        }
                        onClick={() => setActiveSection(section.id)}
                      >
                        {section.name}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ))}
          </ul>
        </div>
        <div className={styles.contentWrapper}>
          <TasksList classId={activeList} sectionId={activeSection} />
        </div>
      </div>
    </div>
  );
};

export default connect(null, { taskSuccess })(TaskDashboard);