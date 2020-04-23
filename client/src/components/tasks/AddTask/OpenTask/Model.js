import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import MathJax from '../../MathJax';
import { addTaskModel } from '../../../../redux/actions/newTask';
import { connect } from 'react-redux';

const Model = ({addTaskModel, variabels, modelFromState}) => {
  const [model, setModel] = useState('');

  return (
    <div>
      <h5>Wzór</h5>
      <TextareaAutosize
        placeholder='Podaj wzór'
        value={modelFromState}
        onChange={e =>{
          addTaskModel(e.target.value);
          setModel(e.target.value);
        }}
      />
      <MathJax content={modelFromState}/>
    </div>
  );
}

const mapStateToProps = state =>({
  modelFromState: state.newTask.data.model,
  variables: state.newTask.data.variables
})

export default connect(mapStateToProps,{addTaskModel})(Model);
