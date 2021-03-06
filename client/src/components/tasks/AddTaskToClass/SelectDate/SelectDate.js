import React from "react";
import PropTypes from "prop-types";
import styles from "./SelectDate.module.scss";
import { connect } from "react-redux";
import { setDeadLine } from "../../../../redux/actions/taskToClass";
import DateTimePicker from "react-datetime-picker";

class SelectDeadLine extends React.Component {
  state = {
    date: new Date(),
    rawDate: new Date().toISOString()
  };

  onChange = date => {
    if (date) {
      this.setState({ date: date, rawDate: date.toISOString() });
      this.props.setDate(date.toISOString());
    }
  };

  render() {
    return (
      <div className={styles.root}>
        <h4 className={styles.title}>{this.props.message}</h4>
        <DateTimePicker
          minDate={new Date()}
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

SelectDeadLine.propTypes = {
  setDeadLine: PropTypes.func.isRequired
};

export default SelectDeadLine;
