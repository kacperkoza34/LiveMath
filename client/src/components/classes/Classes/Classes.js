import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Classes.module.scss";
import BeatLoader from "react-spinners/BeatLoader";
import AddClass from "../AddClass/AddClass.js";
import StudentsList from "../StudentsList/StudentsList.js";
import TasksList from "../TasksList/TasksList.js";
import ClassStatus from "../ClassStatus/ClassStatus.js";
import SelectSection from "../SelectSection/SelectSection.js";
import TaskTypeBox from "../../features/TaskTypeBox/TaskTypeBox";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getClasses } from "../../../redux/actions/classes";

const Classes = ({
  fetching,
  getClasses,
  classes: { isFetching, data: classes },
  myId,
}) => {
  useEffect(() => {
    getClasses();
  }, []);

  const [activeClass, setActiveClass] = useState(null);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      {isFetching ? (
        <BeatLoader />
      ) : (
        <div className={styles.root}>
          <div className={styles.asideWrapper}>
            <h2>Klasy</h2>
            <ul>
              {classes.map(({ title, _id }) => (
                <li
                  className={
                    activeClass == _id ? styles.btnListActive : styles.btnList
                  }
                  onClick={() => {
                    setActiveClass(_id);
                  }}
                >
                  {title}
                </li>
              ))}
            </ul>
            <AddClass />
          </div>
          <div className={styles.contentWrapper}>
            <div>
              {activeClass == null ? (
                <h5>Wybierz klase...</h5>
              ) : (
                <>
                  {classes.map(
                    ({
                      _id,
                      students,
                      tasksOpen,
                      tasksClose,
                      tasksBoolean,
                      open,
                      title,
                      maxStudentsAmount,
                    }) =>
                      _id == activeClass && (
                        <>
                          <h3>{title}</h3>
                          {students.length === maxStudentsAmount ? (
                            <h5>Klasa jest pełna</h5>
                          ) : (
                            <ClassStatus
                              myId={myId}
                              classId={_id}
                              open={open}
                            />
                          )}
                          <SelectSection
                            activePage={activePage}
                            setActivePage={setActivePage}
                          />
                          {activePage === 1 ? (
                            <StudentsList students={students} />
                          ) : (
                            <>
                              <TaskTypeBox />
                              <TasksList
                                tasks={[
                                  ...tasksOpen,
                                  ...tasksClose,
                                  ...tasksBoolean,
                                ]}
                              />
                            </>
                          )}
                        </>
                      )
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Classes.propTypes = {};

const mapStateToProps = (state) => ({
  classes: state.classes,
  myId: state.user.data._id,
});

export default connect(mapStateToProps, { getClasses })(Classes);
