import React from "react";
import PropTypes from "prop-types";
import styles from "./Points.module.scss";
import { connect } from "react-redux";
import { updatePoints } from "../../../../../../redux/actions/newTask";

const Success = ({ updatePoints, points }) => {
  return (
    <div className={styles.root}>
      <h5>Wybierz ilość punktów za zadanie</h5>
      <input
        type="number"
        value={points}
        onChange={(e) => updatePoints(e.target.value)}
        min="0"
        max="8"
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  points: state.newTask.data.points,
});

export default connect(mapStateToProps, { updatePoints })(Success);
