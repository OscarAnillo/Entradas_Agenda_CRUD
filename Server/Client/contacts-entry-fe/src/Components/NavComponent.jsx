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
      <div className="div-nav-flex">
        <div>
          {loggedIn && (
            <li>
              Welcome <b>{user.name}!</b>
            </li>
          )}
        </div>
        <div>
          {loggedIn && (
            <li>
              <Link onClick={clickHandlerSignOut} className="sign-a">
                Sign out
              </Link>
            </li>
          )}
        </div>
      </div>
      <li>
        {loggedIn ? (
          <Link to="/add-contact" className="add-a">
            Add A New Contact +
          </Link>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </li>
    </ul>
  );
};

NavComponent.propTypes = {
  loggedIn: PropTypes.bool,
  setUser: PropTypes.func,
  setLoggedIn: PropTypes.func,
  user: PropTypes.object,
};
