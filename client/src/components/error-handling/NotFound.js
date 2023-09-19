import React from 'react';

/**
 * 
 * @returns NotFound page when url slug doesn't match an availabe course in the database
 */
const NotFound = () => {

    return (
        <div className="wrap">
            <h2>Not Found</h2>
            <p>Sorry! We couldn't find the page you're looking for.</p>
        </div>
    )
}

export default NotFound;