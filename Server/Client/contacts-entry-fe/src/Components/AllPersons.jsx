import { Link, useNavigate } from "react-router-dom";
import { deletePerson } from "../Services/Persons";
import { NavComponent } from "./NavComponent";
import PropTypes from "prop-types";

export const AllPersons = ({
  persons,
  setSubmitted,
  setEditing,
  loggedIn,
  setUser,
  setLoggedIn,
  user,
}) => {
  const navigate = useNavigate();
  const clickHandlerDelete = (id) => {
    deletePerson(id);
    setSubmitted(true);
  };

  const clickHandlerEdit = (id) => {
    const personToEdit = persons.find((person) => person._id === id);
    setEditing(personToEdit);
    navigate("/add-contact");
  };

  return (
    <>
      <NavComponent
        loggedIn={loggedIn}
        setUser={setUser}
        setLoggedIn={setLoggedIn}
        user={user}
      />
      {persons.length > 0 && user !== null && (
        <h1 className="contact-title">Contact List</h1>
      )}
      {user !== null && persons.length ? (
        <div className="all-persons-div">
          {persons.map((person) => (
            <div key={person._id} className="all-persons-div-map">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt=""
              />
              <div>
                <p>
                  <Link to={`/${person._id}`}>
                    {person.name} {person.lastName}
                  </Link>
                </p>
                <p>{person.contact}</p>
                <button
                  className="btn-delete"
                  onClick={() => clickHandlerDelete(person._id)}
                >
                  x
                </button>
                <button
                  onClick={() => clickHandlerEdit(person._id)}
                  className="btn-edit"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="no-contact-title">No Contacts yet</h1>
      )}
    </>
  );
};

AllPersons.propTypes = {
  persons: PropTypes.array,
  setSubmitted: PropTypes.func,
  name: PropTypes.string,
  contact: PropTypes.string,
  setUserinput: PropTypes.func,
  setEditing: PropTypes.func,
  loggedIn: PropTypes.bool,
  setUser: PropTypes.func,
  setLoggedIn: PropTypes.func,
  user: PropTypes.object,
};
