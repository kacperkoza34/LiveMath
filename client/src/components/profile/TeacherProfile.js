import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTeacher } from '../../redux/actions/teacher';
import Spinner from '../layout/Spinner';

const TeacherProfile = ({id, teacher: { isFetching, data } , getTeacher}) =>{
  useEffect(()=>{
    getTeacher(id)
  },[id])
  return(
    <>
      {isFetching ? <Spinner/>:
        <>
          <h3>{data.name}</h3>
          <h3>Ilość zaproszonych nauczycieli: {data.invited}</h3>
          <h3>Ilość uczniów: {data.students}</h3>
          <h3>Ilość klass: {data.classes}</h3>
        </>
      }
    </>
  )
}

TeacherProfile.propTypes = {
  id: PropTypes.string.isRequired,
  teacher: PropTypes.object.isRequired,
  getTeacher: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  teacher: state.teacher
});

export default connect(mapStateToProps, {getTeacher})(TeacherProfile);
