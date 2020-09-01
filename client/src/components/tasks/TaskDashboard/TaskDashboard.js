import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./TaskDashboard.module.scss";
import TasksList from "../TasksList/TasksList";
import NewTask from "../NewTask/NewTask";
import Aside from "../../layout/Aside/Aside";
import ContentWrapper from "../../layout/ContentWrapper/ContentWrapper";
import { availableClasses } from "../../../data/TaskDashboardConfig.js";
import { connect } from "react-redux";
import {
  taskSuccess,
  setCurrentClass,
  setCurrentSection
} from "../../../redux/actions/tasks";

const TaskDashboard = ({
  taskSuccess,
  currentSection,
  currentClass,
  setCurrentClass,
  setCurrentSection
}) => {
  useEffect(() => {
    taskSuccess({});
  }, [taskSuccess]);

  const hideSections = () => {
    setCurrentClass(null);
    setCurrentSection(null);
  };

  const setList = id => {
    setCurrentClass(id);
    setCurrentSection(null);
  };
  return (
    <div className={styles.root}>
      <NewTask />
      <div className={styles.wrapper}>
        <Aside>
          <h2>Zadania</h2>
          <ul>
            {availableClasses.map(({ name, id, sections }, index) => (
              <div key={index}>
                <li
                  className={
                    id === currentClass ? styles.btnListActive : styles.btnList
                  }
                  onClick={() => {
                    id === currentClass ? hideSections() : setList(id);
                  }}
                >
                  <span>{name}</span>
                </li>
                {id === currentClass && (
                  <ul className={styles.subList}>
                    {sections.map((section, index) => (
                      <li
                        key={index}
                        className={
                          currentSection === section.id
                            ? styles.btnListActive
                            : styles.btnList
                        }
                        onClick={() => setCurrentSection(section.id)}
                      >
                        {section.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </ul>
        </Aside>
        <ContentWrapper border={1}>
          <TasksList classId={currentClass} sectionId={currentSection} />
        </ContentWrapper>
      </div>
    </div>
  );
};

TaskDashboard.propTypes = {
  taskSuccess: PropTypes.func.isRequired,
  currentClass: PropTypes.string,
  currentSection: PropTypes.string
};

const mapStateToProps = state => ({
  currentSection: state.tasks.currentTasks.section,
  currentClass: state.tasks.currentTasks.class
});

export default connect(mapStateToProps, {
  taskSuccess,
  setCurrentClass,
  setCurrentSection
})(TaskDashboard);
