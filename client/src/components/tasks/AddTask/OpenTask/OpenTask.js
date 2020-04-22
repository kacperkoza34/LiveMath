import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TaskContent from './TaskContent.js';
import VariabelsList from './VariabelsList.js';
import Model from './Model.js';
import AdditionalVariables from './AdditionalVariables.js';
import AddGroups from './AddGroups.js';

const OpenTask = () => {


  return <>
    <TaskContent />
    <VariabelsList />
    <AdditionalVariables />
    <Model />
    <AddGroups />
  </>

}



export default OpenTask;
