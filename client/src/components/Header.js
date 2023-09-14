/**
 * displays top menu bar
 * includes "sign in" and "sign up" buttons IF THERE'S NOT an Auth User
 * OR user's name + button for "signing out" w/ Auth User
 */

import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

const Header = () => {
    const { user } = useContext(UserContext);

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    {/**TERNARY OPERATOR FOR AUTH USER HERE  */}
                    {user ? (
                        <ul class="header--signedin">
                            <li>Welcome, {user}</li>
                            <li><Link to="sign-out.html">Sign Out</Link></li>
                        </ul>
                    ) : (
                        <ul className="header--signedout">
                            <li><Link to="/signup">Sign Up</Link></li>
                            <li><Link to="/signin">Sign In</Link></li>
                        </ul>)
                    }
                </nav>
            </div>
        </header>
    )
}

export default Header;