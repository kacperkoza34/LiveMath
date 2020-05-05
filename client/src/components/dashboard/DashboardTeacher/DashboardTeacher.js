import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./DashboardTeacher.module.scss";
import BeatLoader from "react-spinners/BeatLoader";
import TeacherProfile from "../../profile/TeacherProfile/TeacherProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getProfile } from "../../../redux/actions/profile";

const DashboardTeacher = ({
  getProfile,
  profile: {
    isFetching,
    data: { invitedByMe, inviter },
    errors,
  },
  user: { name, _id },
}) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  const [teacher, setTeacher] = useState(_id);
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h3>Panel nauczyciela</h3>
        <p>
          Witaj{" "}
          <span className={styles.myProfile} onClick={() => setTeacher(_id)}>
            {name}
          </span>
        </p>

        {!isFetching &&
          (_id !== inviter._id ? (
            <div className={styles.box}>
              <h4>Twój szef</h4>
              <h5
                className={styles.btnUser}
                onClick={() => setTeacher(inviter._id)}
              >
                {inviter.name}
              </h5>
            </div>
          ) : (
            <div className={styles.box}>
              Jesteś pierwszy w naszej strukturze
            </div>
          ))}

        {isFetching ? (
          <BeatLoader size={50} />
        ) : (
          <div className={styles.groups}>
            <div className={styles.groupData}>
              <h3>Twoja grupa</h3>
              <div className={styles.copy}>
                <h5>Link do twojej grupy</h5>
                <span>
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/register/${_id}`
                      );
                    }}
                  />
                </span>
              </div>
              <h5
                className={styles.link}
              >{`${window.location.origin}/register/${_id}`}</h5>
              {invitedByMe.length > 0 ? (
                <div className={styles.list}>
                  <h4>Zaproszeni przez Ciebie</h4>
                  <ul>
                    {invitedByMe.map(({ user }, index) => (
                      <li
                        key={index}
                        className={
                          index % 2 !== 0
                            ? [styles.btnList, styles.student].join(" ")
                            : [
                                styles.btnList,
                                styles.student,
                                styles.light,
                              ].join(" ")
                        }
                        onClick={() => setTeacher(user._id)}
                      >
                        {user.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                "Nie zaprosiłeś nikogo"
              )}
            </div>
            <div className={styles.teacherProfile}>
              {teacher == null ? (
                <h5>Wybierz nauczyciela...</h5>
              ) : (
                <TeacherProfile id={teacher} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

DashboardTeacher.propTypes = {
  user: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(DashboardTeacher);
