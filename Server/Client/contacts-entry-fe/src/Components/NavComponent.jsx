import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const NavComponent = ({ loggedIn, setUser, setLoggedIn, user }) => {
  const clickHandlerSignOut = () => {
    setUser(null);
    setLoggedIn(false);
    window.localStorage.removeItem("loggedAppUser");
  };
  return (
    <ul>
      {loggedIn && (
        <li>
          logged-in as <b>{user.name}</b>
        </li>
      )}
      <li>
        {loggedIn ? (
          <Link to="/add-contact">Add New Contact</Link>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </li>
      {loggedIn && (
        <li>
          <Link onClick={clickHandlerSignOut}>Sign out</Link>
        </li>
      )}
    </ul>
  );
};

NavComponent.propTypes = {
  loggedIn: PropTypes.bool,
  setUser: PropTypes.func,
  setLoggedIn: PropTypes.func,
  user: PropTypes.object,
};
