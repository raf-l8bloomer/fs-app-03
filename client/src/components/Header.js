/**
 * displays top menu bar
 * includes "sign in" and "sign up" buttons IF THERE'S NOT an Auth User
 * OR user's name + button for "signing out" w/ Auth User
 */

import { NavLink, Link } from "react-router-dom";
const Header = () => {

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link href="/">Courses</Link></h1>
                <nav>
                {/**TERNARY OPERATOR FOR AUTH USER HERE  */}
                    <ul className="header--signedout">
                        <li><NavLink to="/signup">Sign Up</NavLink></li>
                        <li><NavLink href="/signin">Sign In</NavLink></li>
                    </ul>
                    {/**
                ORRRRR
                    <ul class="header--signedin">
                        <li>Welcome, Joe Smith!</li>
                        <li><a href="sign-out.html">Sign Out</a></li>
                    </ul> */}
                </nav>
            </div>
        </header>
    )
}

export default Header;