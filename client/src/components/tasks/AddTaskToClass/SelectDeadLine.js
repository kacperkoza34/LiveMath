import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDeadLine } from '../../../redux/actions/taskToClass';
import DateTimePicker from 'react-datetime-picker';

class SelectDeadLine extends React.Component {
  state = {
    date: new Date(),
    rawDate: new Date().toISOString()
  }

  onChange = async date =>{
   await this.setState({ date: date, rawDate: date.toISOString()});
   this.props.setDeadLine(this.state.rawDate);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <DateTimePicker
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default connect(null,{setDeadLine})(SelectDeadLine);
