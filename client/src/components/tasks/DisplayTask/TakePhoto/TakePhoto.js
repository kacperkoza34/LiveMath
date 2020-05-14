import React, { useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

function App(props) {
  const [active, setActive] = useState(false);
  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto: ");
  }

  return (
    <>
      <button onClick={() => setActive(!active)}>Zrób zdjęcie</button>
      {active && (
        <Camera
          onTakePhoto={(dataUri) => {
            handleTakePhoto(dataUri);
          }}
        />
      )}
    </>
  );
}

export default App;
