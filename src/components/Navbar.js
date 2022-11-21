import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

    // let location = useLocation();

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                        </li> */}
                    </ul>
                    <ul>
                        {localStorage.getItem('token') && <div className="btn-group dropstart d-flex">
                            <Link className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg" width="40" height="40" className="rounded-circle" alt=""/>
                            </Link>
                                        
                            <ul className="dropdown-menu">
                                <li className="text-center">Welcome!</li>
                                <li className="text-center">{localStorage.getItem('username')}</li>
                                <hr/>
                                <li><Link className="dropdown-item" to="/profile"><i className="fa-solid fa-circle-user mx-1"></i>Edit Profile</Link></li>
                                <li><Link className="dropdown-item" to="/login" onClick={()=>{localStorage.clear();}}><i className="fa-solid fa-arrow-right-from-bracket mx-1"></i>Logout</Link></li>
                            </ul>
                        </div>}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
