import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudent } from '../../redux/actions/student';
import Spinner from '../layout/Spinner';

const StudentProfile = ({id, student: { isFetching, data } , getStudent, match}) =>{
  useEffect(()=>{
    getStudent(match.params.id)
  },[id])
  return(
    <>
      {isFetching ? <Spinner/>:
        <>
          asdasd
        </>
      }
    </>
  )
}

StudentProfile.propTypes = {

}

const mapStateToProps = state => ({
  student: state.student
});

export default connect(mapStateToProps, {getStudent})(StudentProfile);
