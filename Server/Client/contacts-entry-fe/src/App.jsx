import { useState, useEffect } from "react";
import { getAllPersons, setToken } from "./Services/Persons";
import { loginService } from "./Services/Login";

import { CreatePerson } from "./Components/CreatePerson";
import { AllPersons } from "./Components/AllPersons";
import { Route, Routes } from "react-router-dom";
import { SingleUser } from "./Components/SingleUser";
import { Login } from "./Components/Pages/login";
import { useNavigate } from "react-router-dom";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
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

  useEffect(() => {
    const loggedAppUserJSON = window.localStorage.getItem("loggedAppUser");
    if (loggedAppUserJSON) {
      const user = JSON.parse(loggedAppUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService({ username, password });
      window.localStorage.setItem(
        "loggedAppUser",
        JSON.stringify(user, null, 2)
      );
      setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setLoggedIn(true);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

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
              loggedIn={loggedIn}
              setUser={setUser}
              setLoggedIn={setLoggedIn}
              user={user}
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
        <Route
          path="/login"
          element={
            <Login
              handleLogin={handleLogin}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
