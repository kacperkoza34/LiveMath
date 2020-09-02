import React from "react";
import PropTypes from "prop-types";
import LockClasses from "../../features/LockClasses/LockClasses";
import Help from "../../features/Help/Help";
import TaskTypeBox from "../../features/TaskTypeBox/TaskTypeBox";
import ClassStatus from "../ClassStatus/ClassStatus";
import SelectSection from "../SelectSection/SelectSection";
import StudentsList from "../StudentsList/StudentsList";
import TasksList from "../TasksList/TasksList";
import { faLockOpen, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./ClassView.module.scss";

const ClassView = ({
  index,
  title,
  open,
  closeClass,
  openClass,
  students,
  maxStudentsAmount,
  myId,
  _id,
  activePage,
  setActivePage,
  tasksOpen,
  tasksClose,
  tasksBoolean
}) => {
  return (
    <div className={styles.root} key={index}>
      <div className={styles.spaceBetween}>
        <span className={styles.titleWithIcon}>
          <h3>{title}</h3>
          {open ? (
            <LockClasses icon={faLockOpen} onClick={() => closeClass(_id)} />
          ) : (
            <LockClasses icon={faLock} onClick={() => openClass(_id)} />
          )}
        </span>
        <Help id={8} title={"Zobacz instrukcje"} />
      </div>
      {students.length === maxStudentsAmount ? (
        <h5>Klasa jest pełna</h5>
      ) : (
        <ClassStatus myId={myId} classId={_id} open={open} />
      )}
      <div className={styles.wrapper}>
        <SelectSection activePage={activePage} setActivePage={setActivePage} />
        {activePage === 1 ? (
          <StudentsList students={students} />
        ) : (
          <>
            <TaskTypeBox />
            <TasksList tasks={[...tasksOpen, ...tasksClose, ...tasksBoolean]} />
          </>
        )}
      </div>
    </div>
  );
};

ClassView.propTypes = {};

export default ClassView;
