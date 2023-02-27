import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    // Redirect to Login page
    navigate("/login");
  };

  return (
    // fixed navbar
    <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4 fixed top-0">
      <div className="flex items-center">
        <h1 className="font-bold text-lg mr-4">
          <Link to="/">Library</Link>
        </h1>
        <ul className="flex items-center">
          <li className="mx-2">
            <Link to="/">Home</Link>
          </li>
          {/* <li className="mx-2">
            <Link to="/about">About</Link>
          </li>
          <li className="mx-2">
            <Link to="/contact">Contact</Link>
          </li> */}
        </ul>
      </div>
      <div className="flex items-center">
        <ul className="flex items">
          {user && (
            <>
              <li className="mx-2">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="mx-2 cursor-pointer" onClick={handleLogout}>
                Logout
              </li>
            </>
          )}

          {!user && (
            <>
              <li className="mx-2">
                <Link to="/login">Login</Link>
              </li>
              <li className="mx-2">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
