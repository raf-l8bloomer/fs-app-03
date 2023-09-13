/**
 * displays top menu bar
 * includes "sign in" and "sign up" buttons IF THERE'S NOT an Auth User
 * OR user's name + button for "signing out" w/ Auth User
 */

const Header = () => {

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="index.html">Courses</a></h1>
                <nav>
                    <ul className="header--signedout">
                        <li><a href="sign-up.html">Sign Up</a></li>
                        <li><a href="sign-in.html">Sign In</a></li>
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