import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAddVariable, removeAddVariable } from '../../../../redux/actions/newTask';

const AdditionalVariables = ({
  addAddVariable,
  additionalVariables,
  variables,
  removeAddVariable
}) => {
  const [formData, setFormData] = useState({
    variable: '',
    description: ''
  });
  const [error, setError] = useState('');

  const onChange = e =>{
    if(e.target.name == 'variable' ){
      if(e.target.value.length > 1) setError('Zmienne nazywamy jedną literą');
      else {
        let alredyUsed = [...variables,...additionalVariables].some(({variable}) => variable == e.target.value);
        if(!alredyUsed){
          setFormData({...formData, [e.target.name]: e.target.value});
          setError('');
        }
        else {
          setError('Posiadasz już zmienną o tej nazwie');
          setFormData({...formData, [e.target.name]: ''});
        }
      };
    }
    else setFormData({...formData, [e.target.name]: e.target.value});
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addAddVariable(
      {variable: formData.variable, description: formData.description}
    );
    setFormData({variable: '',description: '' });
  };
  const remove = (name) =>{
    removeAddVariable(name);
  }
  return ( variables.length > 0 &&
    <>
      <h5>Dodaj pomocnicze zmienne</h5>
      <form onSubmit={(e)=>onSubmit(e)}>
        <h6>Nazwa</h6>
        <input
          name={'variable'}
          placeholder="Zmienna"
          value={formData.variable}
          onChange={e => onChange(e)}
          required
        />
        <h6>Opis</h6>
        <input
          name={'description'}
          placeholder="Opis"
          value={formData.description}
          onChange={e => onChange(e)}
          required
        />
        <input type="submit" value='Dodaj' />
      </form>
      { error.length > 0 && error }
      <ul>
        {additionalVariables.length > 0 &&
          additionalVariables.map(({variable, description})=>
          <li>{variable+'          '}{description}<button onClick={()=>remove(variable)}>Usuń</button></li>)
        }
      </ul>
    </>
  )
}

AdditionalVariables.propTypes = {
}

const mapStateToProps = state => ({
  additionalVariables: state.newTask.data.additionalVariables,
  variables: state.newTask.data.variables
});

export default connect(mapStateToProps,{addAddVariable, removeAddVariable})(AdditionalVariables);
