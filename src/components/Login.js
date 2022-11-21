import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import Footer from './Footer';

const Login = (props) => {

    const host = "http://localhost:5000";
    const [creds, setCreds] = useState({email:'',password:''});

    let navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const {name, email, password} = creds;

        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });

        const json = await response.json();
        if(json.status === "success"){
            // save the token and redirect
            localStorage.setItem('token', json.authToken);
            
            fetchUserDetails();

            navigate("/");
            props.showAlert("Login Successfully","success");
        }
        else{
            props.showAlert(json.message,"error");
        }
    }

    const handleOnChange = (e) => {
        setCreds({...creds, [e.target.name] : e.target.value})
    }

    // fetch user details
    const fetchUserDetails = async () => {
        // API CALL
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        localStorage.setItem('username', json.name);
    }
    
    return (
        <>
        <div className='container d-flex justify-content-center'>
            <div className="card rounded" style={{width: "25rem"}}>
                <div className="card-body">
                    <h5 className="card-title text-center">Login to iNotebook</h5>

                    <form onSubmit={handleLogin}>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="email" name="email" value={creds.email} aria-describedby="emailHelp" placeholder="Enter Email" onChange={handleOnChange}/>
                            <label htmlFor="email">Email address</label>
                        </div>
                
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="password" name="password" placeholder="Enter Password" onChange={handleOnChange} />
                            <label htmlFor="password">Password</label>
                        </div>

                        <p className=" text-sm-center">By signing up you accept our<Link to=""> Terms Of Use</Link></p>
                        <div className="d-grid gap-2 col-10 mx-auto">
                            <button type="submit" className="btn btn-secondary">login</button>
                        </div>
                    </form>
                    <hr/>
                    <div className="text-sm-center">
                        Don't have account?<Link to="/signup"> Sign up here</Link>
                    </div>
                </div>
            </div>
        </div>

        <Footer/>

        </>
    )
}

export default Login
