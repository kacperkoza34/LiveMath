import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SelectDeadLine.module.scss";
import { connect } from "react-redux";
import { setDeadLine } from "../../../../redux/actions/taskToClass";
import DateTimePicker from "react-datetime-picker";

class SelectDeadLine extends React.Component {
  state = {
    date: new Date(),
    rawDate: new Date().toISOString(),
  };

  onChange = (date) => {
    if (date) {
      this.setState({ date: date, rawDate: date.toISOString() });
      this.props.setDeadLine(date.toISOString());
    }
  };

  render() {
    return (
      <div className={styles.root}>
        <h4 className={styles.title}>Wybierz termin wykonania</h4>
        <DateTimePicker onChange={this.onChange} value={this.state.date} />
      </div>
    );
  }
}

export default connect(null, { setDeadLine })(SelectDeadLine);
