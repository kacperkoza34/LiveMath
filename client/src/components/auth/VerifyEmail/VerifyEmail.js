import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Errors from "../../layout/Errors/Errors";
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from "react-router-dom";
import styles from "./VerifyEmail.module.scss";
import { connect } from "react-redux";
import { verifyEmail } from "../../../redux/actions/auth";

const VerifyEmail = ({ match, verifyEmail, auth: { isFetching, errors } }) => {
  useEffect(() => {
    verifyEmail(match.params.token);
  }, [verifyEmail, match]);
  return (
    <div className={styles.root}>
      {isFetching ? (
        <BeatLoader size={30} />
      ) : (
        <div className={styles.wrapper}>
          {errors ? (
            <Errors errors={errors.data.err} />
          ) : (
            <>
              <h2>Zweryfikowano</h2>
              <Link to={"/login"}>Przejdź do logowania</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

VerifyEmail.propTypes = {
  match: PropTypes.object,
  verifyEmail: PropTypes.func,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { verifyEmail })(VerifyEmail);
