import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./CloseTask.module.scss";
import CloseTaskFromApi from "./CloseTaskFromApi";
import CloseTaskDumm from "./CloseTaskDumm";
import BackArrow from "../../../features/BackArrow/BackArrow";
import Help from "../../../features/Help/Help";
import { connect } from "react-redux";

const CloseTask = ({
  match,
  tasks: { data, isFetching, errors, taskConfig }
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.root}>
      <div className={styles.spaceBetween}>
        <BackArrow />
        <Help id={3} title={"Dowiedz się więcej"} />
      </div>
      {Object.keys(taskConfig).length > 0 ? (
        <CloseTaskFromApi match={match} />
      ) : (
        <CloseTaskDumm match={match} />
      )}
    </div>
  );
};

CloseTask.propTypes = {
  match: PropTypes.object.isRequired,
  task: PropTypes.object
};

const mapStateToProps = state => ({
  tasks: state.tasks
});

export default connect(mapStateToProps)(CloseTask);
