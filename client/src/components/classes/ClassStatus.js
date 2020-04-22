import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { openClass, closeClass } from '../../redux/actions/classes';

const ClassStatus = ({myId, classId,open, openClass, closeClass}) =>{
  return(
    <>
      {open ?
      <>
        <h5>Link do klasy</h5>
        <h6>{`${window.location.origin}/register/${myId}/${classId}`}</h6>
        <button onClick={()=> closeClass(classId)}>Zamknij klase</button>
      </> : <button onClick={()=> openClass(classId)}>Otwórz klase</button>
    }
    </>
  )
}

ClassStatus.propTypes = {
}


export default connect(null,{ openClass, closeClass })(ClassStatus);
