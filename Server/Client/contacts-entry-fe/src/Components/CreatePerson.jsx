import { useEffect } from "react";
import { createNewPerson, editNewPerson } from "../Services/Persons";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

export const CreatePerson = ({
  name,
  lastName,
  contact,
  email,
  userInput,
  setUserinput,
  setSubmitted,
  editing,
  setEditing,
}) => {
  const navigate = useNavigate();
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserinput({
      ...userInput,
      [name]: value,
    });
  };

  useEffect(() => {
    if (editing) {
      setUserinput({
        name: editing.name,
        lastName: editing.lastName,
        contact: editing.contact,
        email: editing.email,
      });
    } else {
      setUserinput({
        name: "",
        lastName: "",
        contact: "",
        email: "",
      });
    }
  }, [editing, setUserinput]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !contact) {
      return alert("Please fill all the required fields");
    }
    if (!editing) {
      createNewPerson({ name, lastName, contact, email });
      setUserinput({ name: "", lastName: "", contact: "", email: "" });
      setSubmitted(true);
      navigate("/");
    } else {
      editNewPerson(editing._id, { name, lastName, contact, email });
      setSubmitted(true);
      setEditing(null);
      setUserinput({ name: "", lastName: "", contact: "", email: "" });
      navigate("/");
    }
  };

  const clickHandlerBack = () => {
    setEditing(null);
    setUserinput({ name: "", lastName: "", contact: "", email: "" });
    navigate("/");
  };

  const clickHandlerCancel = () => {
    setEditing(null);
    setUserinput({ name: "", lastName: "", contact: "", email: "" });
    navigate("/");
  };

  return (
    <>
      <Link to={editing ? () => clickHandlerBack() : "/"}>
        See Your Contacts
      </Link>
      <form onSubmit={submitHandler} className="form">
        <h1>{editing ? "Edit Contact" : "Add Contact"}</h1>
        <div className="contact-div-photo">
          <img
            src="https://www.creativefabrica.com/wp-content/uploads/2020/04/23/Camera-Icon-Graphics-3939285-1-312x208.jpg"
            alt=""
          />
        </div>
        <p className="add-photo">Add Photo +</p>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={changeHandler}
        />
        <input
          type="text"
          placeholder="LastName"
          name="lastName"
          value={lastName}
          onChange={changeHandler}
        />
        <input
          type="text"
          placeholder="Contact #"
          name="contact"
          value={contact}
          onChange={changeHandler}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={changeHandler}
        />
        <button type="submit">{editing ? "Update" : "Submit"}</button>
        {editing && (
          <button
            type="submit"
            onClick={clickHandlerCancel}
            className="btn-cancel"
          >
            Cancel
          </button>
        )}
      </form>
    </>
  );
};

CreatePerson.propTypes = {
  userInput: PropTypes.object,
  name: PropTypes.string,
  lastName: PropTypes.string,
  contact: PropTypes.string,
  email: PropTypes.string,
  setUserinput: PropTypes.func,
  setSubmitted: PropTypes.func,
  editing: PropTypes.object,
  setEditing: PropTypes.func,
};
