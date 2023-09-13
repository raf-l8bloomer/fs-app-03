/**
 * renders form to sign up w/ new account
 * renders "Sign Up" button that sends a POST request to API's /api/users 
 * and signs in user
 * renders "Cancel" button that returns user to list of courses
 */

const UserSignUp = () => {


    return (
        <div className="form--centered">
            <h2>Sign Up</h2>

            <form>
                <label for="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" value="" />
                <label for="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" value="" />
                <label for="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" value="" />
                <label for="password">Password</label>
                <input id="password" name="password" type="password" value="" />
                <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
            </form>
            <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
        </div>
    )
};

export default UserSignUp;