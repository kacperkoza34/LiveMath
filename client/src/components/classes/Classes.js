import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClasses } from '../../redux/actions/classes';
import Spinner from '../layout/Spinner';
import AddClass from './AddClass.js';
import StudentsList from './StudentsList.js';
import ClassStatus from './ClassStatus.js';
import {Link} from 'react-router-dom';
import './Classes.css';

const Classes = ({ fetching, getClasses, classes: { isFetching, data: classes }, myId}) =>{
  useEffect(()=>{
    getClasses();
  },[]);

  const [activeClass, setActiveClass] = useState(null);
  const [activePage, setActivePage] = useState(1);

  return(
      <>
      {isFetching? <Spinner/>:
        <div className='wrapper'>
          <div className='select-class'>
            <h2>Klasy</h2>
            <ul>
              {classes.map(({title,_id})=><li onClick={()=>{
                setActiveClass(_id)
              }}>{title}</li>)}
            </ul>
            <AddClass />
          </div>
          <div className='students-view bg-dark'>
            <div>
              <span onClick={()=>setActivePage(1)}>Uczniowie</span>
              <span onClick={()=>setActivePage(2)}>Zadania</span>
            </div>
            <ul>
              { activeClass == null ? <h5>Wybierz klase</h5> :
                <>
                  {activePage === 1 ? <>
                    {classes.map(({_id,students, tasks, open, title, maxStudentsAmount})=>(
                      _id == activeClass ? (
                      <>
                        <h2>{title}</h2>
                        {students.length === maxStudentsAmount ? <h5>Klasa jest pełna</h5> :
                          <ClassStatus myId={myId} classId={_id} open={open}/>}
                        <StudentsList students={students} />
                      </>
                      ) : ''
                    ))
                  }</>
                    : <>zadania</>}
                </>
              }
            </ul>
          </div>
        </div>
      }
    </>
  )
}

Classes.propTypes = {
}

const mapStateToProps = state => ({
  classes: state.classes,
  myId: state.user.data._id
});

export default connect(mapStateToProps, {getClasses})(Classes);
