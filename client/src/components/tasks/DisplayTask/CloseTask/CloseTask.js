import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./CloseTask.module.scss";
import CloseTaskFromApi from "./CloseTaskFromApi";
import CloseTaskDumm from "./CloseTaskDumm";
import { connect } from "react-redux";

const CloseTask = ({
  match,
  tasks: { data, isFetching, errors, taskConfig },
}) => {
  return (
    <div className={styles.root}>
      {Object.keys(taskConfig).length > 0 ? (
        <CloseTaskFromApi match={match} />
      ) : (
        <CloseTaskDumm match={match} />
      )}
    </div>
  );
};

CloseTask.propTypes = {};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

export default connect(mapStateToProps)(CloseTask);
