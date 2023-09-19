import React from 'react';

/**
 * 
 * @returns UnhandledError in all 500 status responses
 */

const UnhandledError = () => {

    return (
        <div className="wrap">
            <h2>Error</h2>
            <p>Sorry! We just encountered an unexpected error.</p>
        </div>
    )
}

export default UnhandledError;