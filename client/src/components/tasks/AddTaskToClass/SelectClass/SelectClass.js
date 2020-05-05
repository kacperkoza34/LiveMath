import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./SelectClass.module.scss";
import BeatLoader from "react-spinners/BeatLoader";
import { connect } from "react-redux";
import { getClasses } from "../../../../redux/actions/classes";
import { updateClasses } from "../../../../redux/actions/taskToClass";

const SelectClass = ({ getClasses, classes, updateClasses }) => {
  const { isFetching, data } = classes;

  useEffect(() => {
    getClasses();
  }, [getClasses]);

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

  return isFetching ? (
    <BeatLoader size={15} />
  ) : (
    <div className={styles.root}>
      <h4>Wybierz klasy</h4>
      <div className={styles.classList}>
        {data.map(({ title, _id }, index) => (
          <div key={index} className={styles.itemList}>
            <input onClick={() => addClass(_id)} type="checkbox" name={title} />
            <label>{title}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

SelectClass.propTypes = {
  getClasses: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  updateClasses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  classes: state.classes,
});

export default connect(mapStateToProps, {
  getClasses,
  updateClasses,
})(SelectClass);
