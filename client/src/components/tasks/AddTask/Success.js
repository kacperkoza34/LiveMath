import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Success = ({success, clearTasks}) =>{
  const { taskType, _id, name } = success;
  return<>
      <h5>Dodano zadanie! Zobacz jak wygląda:</h5>
      <Link onClick={()=>clearTasks()} to={`/display/${taskType}/${_id}`}>
        {name}
      </Link>
  </>
}

export default Success;
