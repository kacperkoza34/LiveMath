import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { addTaskContent } from '../../../../redux/actions/newTask';
import { connect } from 'react-redux';

const TaskContent = ({addTaskContent,content}) => {

  const [task, setTask] = useState('');

  return (
    <div >
      <div>
        <h2>Wpisz treść zadania</h2>
        <TextareaAutosize
          placeholder='Dodaj treść zadania'
          value={content}
          onChange={e =>{
            setTask(e.target.value);
            addTaskContent(e.target.value);
          }}
          value={task}
          name="title"
          maxRows="15"
          minRows="5"
         />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  content: state.newTask.content
})

export default connect(mapStateToProps,{addTaskContent})(TaskContent);
