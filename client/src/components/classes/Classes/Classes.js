import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Classes.module.scss";
import BeatLoader from "react-spinners/BeatLoader";
import AddClass from "../AddClass/AddClass.js";
import ClassView from "../ClassView/ClassView";
import Aside from "../../layout/Aside/Aside";
import ContentWrapper from "../../layout/ContentWrapper/ContentWrapper";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import {
  getClasses,
  setCurrentClass,
  openClass,
  closeClass
} from "../../../redux/actions/classes";

const Classes = ({
  getClasses,
  classes: { isFetching, data: classes, errors, currentClass },
  myId,
  setCurrentClass,
  openClass,
  closeClass
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
          <ContentWrapper border={1}>
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
                        maxStudentsAmount
                      },
                      index
                    ) =>
                      _id === currentClass && (
                        <ClassView
                          index={index}
                          title={title}
                          open={open}
                          maxStudentsAmount={maxStudentsAmount}
                          closeClass={closeClass}
                          openClass={openClass}
                          students={students}
                          myId={myId}
                          _id={_id}
                          activePage={activePage}
                          setActivePage={setActivePage}
                          tasksOpen={tasksOpen}
                          tasksClose={tasksClose}
                          tasksBoolean={tasksBoolean}
                        />
                      )
                  )}
                </>
              )}
            </div>
          </ContentWrapper>
        </div>
      )}
    </>
  );
};

Classes.propTypes = {
  getClasses: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  myId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  classes: state.classes,
  myId: state.user.data._id
});

export default connect(mapStateToProps, {
  getClasses,
  setCurrentClass,
  openClass,
  closeClass
})(Classes);
