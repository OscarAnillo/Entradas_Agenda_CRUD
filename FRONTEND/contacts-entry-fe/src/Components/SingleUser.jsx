import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSinglePerson } from "../Services/Persons";
import { FaAddressBook, FaMobileAlt, FaEnvelope } from "react-icons/fa";

export const SingleUser = () => {
  const [singleUser, setSingleUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSinglePerson(id)
      .then((res) => {
        setSingleUser(res);
      })
      .catch(console.log);
  }, [id]);

  return (
    <div className="single-user-div">
      <h1>Contact</h1>
      <div className="single-user-div-image">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small_2x/user-profile-icon-free-vector.jpg"
          alt=""
        />
      </div>
      <div className="user-info">
        <div className="user-info-icon">
          <FaAddressBook />
        </div>
        <h1>
          {singleUser.name} {singleUser.lastName}
        </h1>
      </div>
      <div className="user-info">
        <div className="user-info-icon">
          <FaMobileAlt />
        </div>
        <h2>{singleUser.contact}</h2>
      </div>
      <div className="user-info">
        <div className="user-info-icon">
          <FaEnvelope />
        </div>
        {singleUser.email}
      </div>
      <button onClick={() => navigate("/")} className="back-btn">
        Back
      </button>
    </div>
  );
};
