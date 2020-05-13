import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h3>Nie ma takiej strony</h3>
      <Link to={"/"}>Wróc do strony głównej</Link>
    </div>
  );
};

export default NotFound;
