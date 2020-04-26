import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BeatLoader from "react-spinners/BeatLoader";
import { connect } from "react-redux";
import { getClasses } from "../../../redux/actions/classes";
import { updateClasses } from "../../../redux/actions/taskToClass";

const SelectClass = ({ getClasses, classes, updateClasses }) => {
  const { isFetching, errors, data } = classes;

  useEffect(() => {
    getClasses();
  }, []);

  const [selectedClasses, setSelectedClasses] = useState([]);

  const addClass = (_id) => {
    if (selectedClasses.includes(_id)) {
      setSelectedClasses([...selectedClasses.filter((item) => item !== _id)]);
      updateClasses([...selectedClasses.filter((item) => item !== _id)]);
    } else {
      setSelectedClasses([...selectedClasses, _id]);
      updateClasses([...selectedClasses, _id]);
    }
  };

  const addToClasses = () => {};
  return isFetching ? (
    <BeatLoader size={15} />
  ) : (
    <>
      <h4>Dodaj zadanie do klasy</h4>
      <div>
        {data.map(({ title, _id }) => (
          <>
            <input type="checkbox" onClick={() => addClass(_id)} name={title} />
            <label for={title}>{title}</label>
          </>
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  classes: state.classes,
});

export default connect(mapStateToProps, {
  getClasses,
  updateClasses,
})(SelectClass);
