import React from 'react'
import { Link } from "react-router-dom"

const Notfound = () => {
    return (
        <div>
            <h1>Page Not Found</h1>
            <Link className='btn btn-primary' to="/">Go Back</Link>
        </div>
    )
}

export default Notfound
