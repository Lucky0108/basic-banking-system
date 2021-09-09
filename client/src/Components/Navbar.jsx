import React from 'react'
import { NavLink } from 'react-router-dom'
/**
* @author
* @function Navbar
**/

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 fixed-top">
            <div className="container-fluid">
            <NavLink exact to="/" className="navbar-brand"> MERN Banking </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink exact to="/" className="nav-link" activeClassName="active"> Home </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to="/customers" className="nav-link" activeClassName="active"> All Customers </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to="/transactions" className="nav-link" activeClassName="active"> Transaction History </NavLink>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    )
}

export default Navbar