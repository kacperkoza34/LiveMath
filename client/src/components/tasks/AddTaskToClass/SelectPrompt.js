import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPrompts } from '../../../redux/actions/taskToClass';

const SelectPropmt = ({setPrompts}) =>{
  const [ formData, setFormData ] = useState({
    prompt: false,
    description: false
  });

  const onClick = (name) => {
    setFormData({...formData, [name]: !formData[name]});
    setPrompts({...formData, [name]: !formData[name]});
  }
  return <>
    <h4>Dodatkowe paramtery</h4>
      <div>
        <input type="checkbox" onClick={(e)=>onClick(e.target.name)}  name='prompt' />
        <label for="prompt">Dostępne podpowiedzi</label>
      </div>
      <div>
        <input type="checkbox" onClick={(e)=>onClick(e.target.name)} name='description' />
        <label for="description">Wymagany opis</label>
      </div>
  </>
}



export default connect(null,{setPrompts})(SelectPropmt);
