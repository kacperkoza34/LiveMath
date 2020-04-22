import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MathJax from '../../MathJax';

const DisplayPrompts = ({usedPrompts, model, variables}) => {
  const [prompts, addOne] = useState(usedPrompts);
  const [canAddPrompt, cantAddPrompt] = useState(true)
  const addPrompts = () => {
    if(prompts == 1) cantAddPrompt(false);
    if(prompts < 2) addOne(prompts+1);
  }
  return(
    <>
      { (canAddPrompt && usedPrompts != 2) && <button onClick={()=>addPrompts()}>Pokaż podpowiedz</button>}
      { prompts >= 1 &&
        <ul>
          {
            variables.map(({variable, description}, index) =>
          <li key={index}>{variable+'  -  '}{description}</li>)
          }
        </ul>
      }
      { prompts == 2 &&
        <MathJax content={model} />
      }
    </>
  )
}

DisplayPrompts.propTypes = {
}

const mapStateToProps = state => ({
});

export default DisplayPrompts;
