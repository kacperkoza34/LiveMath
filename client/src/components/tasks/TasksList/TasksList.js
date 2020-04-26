import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { connect } from "react-redux";
import { getTasks, clearTasks } from "../../../redux/actions/tasks";

const TasksList = ({
  classId,
  sectionId,
  getTasks,
  clearTasks,
  tasks: { data, isFetching, errors },
}) => {
  useEffect(() => {
    if (classId && sectionId) {
      getTasks({ classId, sectionId });
    }
  }, [sectionId]);

  const showTaskType = (type) => {
    switch (type) {
      case "openTask":
        return "Zadanie otwarte";
      case "closeTask":
        return "Zadanie zamknięte";
      case "booleanTask":
        return "Zadanie prawda fałsz";
      default:
        return "Zadanie";
    }
  };
  return (
    <>
      {isFetching ? (
        <BeatLoader size={20} />
      ) : (
        <>
          {classId && sectionId ? (
            <ul>
              {data.length > 0
                ? data.map(({ name, taskType, _id }) => (
                    <li>
                      <Link
                        onClick={() => clearTasks()}
                        to={`/display/${taskType}/${_id}`}
                      >
                        <span>{name}</span>
                        <span>{showTaskType(taskType)}</span>
                      </Link>
                    </li>
                  ))
                : "Nie ma zadań z tego działu"}
            </ul>
          ) : (
            "Wybierz dział"
          )}
        </>
      )}
    </>
  );
};

TasksList.propTypes = {
  classId: PropTypes.string,
  sectionId: PropTypes.string,
  getTasks: PropTypes.func,
  tasks: PropTypes.object,
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

export default connect(mapStateToProps, { getTasks, clearTasks })(TasksList);
