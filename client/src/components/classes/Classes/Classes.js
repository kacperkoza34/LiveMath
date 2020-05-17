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
import Help from "../../features/Help/Help";
import Aside from "../../layout/Aside/Aside";
import { connect } from "react-redux";
import { getClasses, setCurrentClass } from "../../../redux/actions/classes";

const Classes = ({
  getClasses,
  classes: { isFetching, data: classes, errors, currentClass },
  myId,
  setCurrentClass,
}) => {
  useEffect(() => {
    getClasses();
  }, [getClasses]);

  const [activePage, setActivePage] = useState(1);

  return (
    <>
      {isFetching ? (
        <BeatLoader />
      ) : (
        <div className={styles.root}>
          <Aside>
            <h2>Klasy</h2>
            <ul>
              {classes.length > 0 ? (
                classes.map(({ title, _id }, index) => (
                  <li
                    key={index}
                    className={
                      currentClass === _id
                        ? styles.btnListActive
                        : styles.btnList
                    }
                    onClick={() => {
                      setCurrentClass(_id);
                    }}
                  >
                    {title}
                  </li>
                ))
              ) : (
                <li>Dodaj nową klase</li>
              )}
            </ul>
            <AddClass />
          </Aside>
          <div className={styles.contentWrapper}>
            <div>
              {currentClass == null ? (
                <h5>Wybierz klase...</h5>
              ) : (
                <>
                  {classes.map(
                    (
                      {
                        _id,
                        students,
                        tasksOpen,
                        tasksClose,
                        tasksBoolean,
                        open,
                        title,
                        maxStudentsAmount,
                      },
                      index
                    ) =>
                      _id === currentClass && (
                        <div key={index}>
                          <div className={styles.spaceBetween}>
                            <h3>{title}</h3>
                            <Help id={8} title={"Zobacz instrukcje"} />
                          </div>
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
                        </div>
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

Classes.propTypes = {
  getClasses: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  myId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  classes: state.classes,
  myId: state.user.data._id,
});

export default connect(mapStateToProps, { getClasses, setCurrentClass })(
  Classes
);
