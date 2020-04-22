import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BeatLoader from "react-spinners/BeatLoader";
import TeacherProfile from '../profile/TeacherProfile';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfile } from '../../redux/actions/profile';

const DashboardTeacher = ({
  getProfile,
  profile: { isFetching, data: { invitedByMe, inviter }, errors },
  user: { name, _id }
}) => {
  useEffect(()=>{
    getProfile()
  },[]);
  const [ teacher, setTeacher ] = useState(null);
  return (
    <>
      <h3 className="large text-primary">
        Panel nauczyciela
      </h3>
      <p className="lead">Witaj {name}</p>

      { isFetching ? <BeatLoader size={50}/> :
        <>
          <h3>Link do twojej grupy:</h3>
          <h5>{`${window.location.origin}/register/${_id}`}</h5>
          <h4>Zaproszeni przez Ciebie</h4>
          <ul>
            { invitedByMe.length > 0 && invitedByMe.map(({user}) =>(
              <li className="posts">
                <a onClick={()=>setTeacher(user._id)}>{user.name}</a>
              </li>
            ))}
          </ul>
          { _id !== inviter._id ?
            <>
              <h4>Twój szef</h4>
              <h5>
                <a onClick={()=>setTeacher(inviter._id)}>{inviter.name}</a>
              </h5>
            </> : <h4>Jesteś pierwszy w naszej strukturze</h4>
          }
          {
            teacher == null ? '' :  <TeacherProfile id={teacher} />
          }
        </>
      }
    </>
  )
};

DashboardTeacher.propTypes = {
  user: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps,{ getProfile })(DashboardTeacher);
