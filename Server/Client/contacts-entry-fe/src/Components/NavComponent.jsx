import { Link } from "react-router-dom";

export const NavComponent = () => {
  return (
    <ul>
      <li>
        <Link to="/add-contact">Add New Contact</Link>
      </li>
    </ul>
  );
};
