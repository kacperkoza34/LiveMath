import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const Students = () =>{

  return(
    <>
      <ul>
        tu będą uczniowie
      </ul>
    </>
  )
}

Students.propTypes = {

}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Students);
