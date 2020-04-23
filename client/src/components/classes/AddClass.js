import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addClass } from '../../redux/actions/classes';
import Errors from '../layout/Errors';

const AddClass = ({addClass, errors})=>{
  const [formData, setFormData] = useState('');

  const onSubmit = (e) =>{
    e.preventDefault();
    addClass({title: formData});
    setFormData('');
  };
  return (
    <>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <h5>Dodaj klase</h5>
        <div>
          <input
            placeholder="Nazwa klasy"
            name="title"
            value={formData}
            onChange={e => setFormData(e.target.value)}
            required
          />
        </div>
        <input type="submit" className="btn-primary" value="Dodaj" />
      </form>
    </>
  )
}

AddClass.propTypes = {
}

const mapStateToProps = state =>({
  errors: state.classes.errors
});


export default connect(mapStateToProps, {addClass})(AddClass);
