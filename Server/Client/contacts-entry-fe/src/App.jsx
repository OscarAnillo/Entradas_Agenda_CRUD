import { useState, useEffect } from "react";
import { getAllPersons } from "./Services/Persons";

import { CreatePerson } from "./Components/CreatePerson";
import { AllPersons } from "./Components/AllPersons";
import { Route, Routes } from "react-router-dom";
import { SingleUser } from "./Components/SingleUser";
import "./App.css";

function App() {
  const [persons, setPersons] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [userInput, setUserinput] = useState({
    name: "",
    lastName: "",
    contact: "",
    email: "",
  });
  const [editing, setEditing] = useState(null);

  const { name, lastName, contact, email } = userInput;

  useEffect(() => {
    getAllPersons()
      .then((res) => {
        setPersons(res);
        setSubmitted(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [submitted]);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <AllPersons
              persons={persons}
              setSubmitted={setSubmitted}
              setEditing={setEditing}
            />
          }
        />
        <Route
          path="/add-contact"
          element={
            <CreatePerson
              setSubmitted={setSubmitted}
              name={name}
              lastName={lastName}
              contact={contact}
              email={email}
              userInput={userInput}
              setUserinput={setUserinput}
              editing={editing}
              setEditing={setEditing}
            />
          }
        />
        <Route path="/:id" element={<SingleUser />}></Route>
      </Routes>
    </div>
  );
}

export default App;
