import React from 'react';
import spinner from './spinner.gif';
import BeatLoader from "react-spinners/BeatLoader";

const Spinner = ({size}) => {
  const override = `
    position: relative;
    top: 0;
    bottom: 0;
    left:0;
    rigth:0;
  `;
  return(
    <>
      <BeatLoader size={size}/>
    </>
  )
}

export default Spinner;
