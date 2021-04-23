import React from 'react'
import {Link} from 'react-router-dom'

export default function navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
            <Link to="/" className="navbar-brand">Logo</Link>
            <div className="collapse navbar-collapse" >
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Exercise</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/creates">Create Exercise</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/users">Create User</Link>
                    </li>
                </ul>
            </div>
        </nav> 
    )
}
