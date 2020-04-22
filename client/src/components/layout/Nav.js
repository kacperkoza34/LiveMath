import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ClipLoader from "react-spinners/ClipLoader";
import { logout } from '../../redux/actions/auth';

const Nav = ({ fetching, user: { isFetching, data: { accountType } } ,auth: { isAuthenticated,  }, logout }) => {
  const authLinks = (
    accountType == 'teacher' ? (
    <ul>
      <li>
        <Link to='/classes'>Klasy</Link>
      </li>
      <li>
        <Link to='/tasks'>Zadania</Link>
      </li>
      <li>
        <Link to='/dashboard'>Konto</Link>
      </li>
      <li>
        <Link onClick={logout} to='/login'>Wyloguj </Link>
      </li>
    </ul>) : (
      <ul>
        <li>
          <Link to='/class'>Moja klasa</Link>
        </li>
        <li>
          <Link to='/dashboard'>Konto</Link>
        </li>
        <li>
          <Link onClick={logout} to='/login'>Wyloguj </Link>
        </li>
      </ul>
    )
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (<nav className="navbar bg-dark">
    <h1>
      <Link to='/'><i className="fas fa-code"></i> DevConnector {fetching && <ClipLoader size={25}/> }</Link>
    </h1>
    { isFetching ? '' : (isAuthenticated ? authLinks : guestLinks) }
  </nav>)
};

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  fetching: state.smallLoading
})

export default connect(mapStateToProps, {logout})(Nav);
