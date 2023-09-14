/**
 * renders a form for sign in 
 * renders "Sign In" button that signs in user
 * renders "Cancel" button that returns user to list of courses
 */

const UserSignIn = () => {

    return (
        <div className="form--centered">
            <h2>Sign In</h2>
            <form>
                <label for="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" />
                <label for="password">Password</label>
                <input id="password" name="password" type="password" />
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
            </form>
            <p>Don't have a user account? Click here to <a href="sign-up.html">sign up</a>!</p>

        </div>
    )
};

export default UserSignIn;