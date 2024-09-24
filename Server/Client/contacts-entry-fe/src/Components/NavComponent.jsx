import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const NavComponent = ({ loggedIn, setUser, setLoggedIn, user }) => {
  const clickHandlerSignOut = () => {
    setUser(null);
    setLoggedIn(false);
    window.localStorage.removeItem("loggedAppUser");
    window.localStorage.removeItem("loggedIn");
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
            New Contact +
          </Link>
        ) : (
          <div className="div-nav-flex-initial">
            <Link to="/login">Log In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </div>
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
