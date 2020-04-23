import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { addTaskData, addVarDescription } from '../../../../redux/actions/newTask';

class VariabelsList extends React.Component {

  state = {
    variablesInput: '',
    activeForm: 0,
    addingType: '',
    varsExist: false,
    varsOneLetter: false
  }

  getCode(){
    const { taskContent: task } = this.props;
    let subString = '';
    let start = false;
    const code = [];
    for(let i in task){
      if(task[i] === '}'){
        if(subString.length){
          if(!code.some(({variable}) => variable == subString.trim())){
            code.push({variable: subString.trim(), description: ''});
          }
        };
        subString = '';
        start = false;
      };
      if(start) subString = subString + task[i];
      if( task[i] === '{'){
         start = true;
         i++;
      }
    }
    if(code.length){
      this.setState({varsExist: false});
      if(code.some(({variable}) => variable.length !== 1)){
        this.setState({varsOneLetter: true});
        return [];
      }
      else {
        this.setState({varsOneLetter: false});
        return code
      }
    }
    else {
      this.setState({varsExist: true});
      return code;
    };
  }

  addDescription(e,variable){
    const { addVarDescription } = this.props;
    addVarDescription(e.target.value, variable);
  }

  render(){
    const { addTaskData, taskData } = this.props;
    return (
      <div>
        <button
          onClick={() => addTaskData(this.getCode())}>
          Ustal zmienne
        </button>
        { this.state.varsExist && <h4>Nie podałeś zmiennych</h4>}
        { this.state.varsOneLetter && <h4>Nazwy zmiennych powinny zawierać jedną litere</h4>}

        <ul>
          { Array.from(taskData).length >0 && <li>
              <span>Nazwa</span>
              <span>Opis</span>
            </li>}
          {Array.from(taskData).map( ({variable, description}) =>
            <li key={variable}>
              <span>{variable}</span>
              <span>
              <TextareaAutosize
                value={description}
                placeholder="Opis"
                onChange={e =>  this.addDescription(e,variable)}
                name="title"
              />
              </span>
            </li>
          )
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  taskContent: state.newTask.data.content,
  taskData: state.newTask.data.variables
});

export default connect(
  mapStateToProps,
 {addTaskData,addVarDescription})
 (VariabelsList);
