import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  //here auth is an object that will hold the latest context
  /*
    const auth: {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}
    */
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
          </li>
        {auth.isLoggedIn && (
      <li>
        <NavLink to="/u1/places">My Places</NavLink>
      </li>)}
        {auth.isLoggedIn && ( <li>
        <NavLink to="/places/new">Add Places</NavLink>
      </li>)}
          { !auth.isLoggedIn && ( <li>
              <NavLink to="/auth">Authentication</NavLink>
          </li> ) }
    </ul>
  );
};

export default NavLinks;
