import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { addGroup } from '../../../../redux/actions/newTask';

const AddGroups = ({variables, addGroupRedux}) => {
  const [group, setGroup] = useState([]);
  const [noVars, setNoVarsError] = useState(false);
  const [noValues, setNoValuesError] = useState(false);

  const mockVars = {};

  variables.forEach(({variable},index) => {
    mockVars[variable] = null;
  });


  const addNewGroup = () => {
    if(variables.length){
      setNoVarsError(false);
      let allValuesAdded = false;
      group.forEach((item, i) => {
        allValuesAdded = variables.some(({variable}) => item[variable] == null);
        if(item.answer == null) allValuesAdded = true;
      });

      if(!allValuesAdded){
        setNoValuesError(false);
        setGroup(
          [...group,
            { id: uuidv4(),
              answer: null,
              ...mockVars
            }
          ]
        );
      }
      else setNoValuesError(true);
    }
    else setNoVarsError(true);
  };

  const addValues = (e, id, variable) =>{
    setNoValuesError(false);
    setGroup([...group.map( subitem => {
      if(id == subitem.id) return {...subitem, [variable]: e.target.value }
      else return {...subitem}
    })]);
  }

  const deleteItem = (id) =>{
    console.log()
    setGroup([...group.filter(removeItem => removeItem.id !== id )]);
  }
  return(
    <div>
      <h3>Dodaj grupy</h3>
      <button onClick={e => addNewGroup()}>Dodaj grupę</button>
      { noVars && <h4>Nie podano zmiennych</h4>}
      { noValues && <h4>Dodaj zmienne do porzedniej grupy</h4>}
      <ul>
        { group.length > 0 && group.map( (item, index) => (
          <li>
            <div>{`Grupa ${index+1}`}</div>
            {variables.map(({variable}) =>
              (<div>{variable}{' = '}
                 <input onChange={e => addValues(e,item.id, variable)} required></input>
               </div>
              )
            )}
            <div>Odpowiedz</div><input onChange={e => addValues(e,item.id, 'answer')} required></input>
            <span onClick={() => deleteItem(item.id)}>Delete</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = state =>({
  variables: state.newTask.variables
})

export default connect(mapStateToProps,{addGroup})(AddGroups);
