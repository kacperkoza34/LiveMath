import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Classes.module.scss";
import BeatLoader from "react-spinners/BeatLoader";
import AddClass from "../AddClass/AddClass.js";
import StudentsList from "../StudentsList/StudentsList.js";
import ClassStatus from "../ClassStatus/ClassStatus.js";
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
          <div className={styles.classesWrapper}>
            <h2>Klasy</h2>
            <ul>
              {classes.map(({ title, _id }) => (
                <li
                  className={
                    activeClass == _id ? styles.btnClassActive : styles.btnClass
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
              <span
                className={
                  activePage == 1 ? styles.btnClassActive : styles.btnClass
                }
                onClick={() => setActivePage(1)}
              >
                Uczniowie
              </span>
              <span
                className={
                  activePage == 2 ? styles.btnClassActive : styles.btnClass
                }
                onClick={() => setActivePage(2)}
              >
                Zadania
              </span>
            </div>
            <div>
              {activeClass == null ? (
                <h5>Wybierz klase</h5>
              ) : (
                <>
                  {activePage === 1 ? (
                    <>
                      {classes.map(
                        ({
                          _id,
                          students,
                          tasks,
                          open,
                          title,
                          maxStudentsAmount,
                        }) =>
                          _id == activeClass ? (
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
                              <StudentsList students={students} />
                            </>
                          ) : (
                            ""
                          )
                      )}
                    </>
                  ) : (
                    <>zadania</>
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
