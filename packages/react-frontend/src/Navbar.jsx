import { useState } from "react";
import PropTypes from "prop-types";
import "./Navbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = ({ isLoggedIn, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <nav className="navbar">
            <h1 className="navbar-logo">Inner Bloom</h1>

            <ul className="navbar-links">
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/support">Support</a>
                </li>
                <li className="dropdown">
                    <div className="profile-icon" onClick={toggleDropdown}>
                        <AccountCircleIcon />
                    </div>

                    {isDropdownOpen && (
                        <ul className="dropdown-menu">
                            <li>
                                <a href="/analytics">Analytics</a>
                            </li>
                            <li>
                                <a href="/calendar">Calendar</a>
                            </li>
                            {!isLoggedIn ? (
                                <li>
                                    <a href="/login">Login</a>
                                </li>
                            ) : (
                                <li>
                                    <button
                                        className="logout-button"
                                        onClick={onLogout}>
                                        Logout
                                    </button>
                                </li>
                            )}
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
};

Navbar.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired
};
export default Navbar;
