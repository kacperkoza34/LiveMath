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
        value={model}
        onChange={e =>{
          addTaskModel(e.target.value);
          setModel(e.target.value);
        }}
      />
      <MathJax content={model}/>
    </div>
  );
}

const mapStateToProps = state =>({
  modelFromState: state.newTask.model,
  variables: state.newTask.variables
})

export default connect(mapStateToProps,{addTaskModel})(Model);
