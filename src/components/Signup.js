import React,{useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import Footer from './Footer';

const Signup = (props) => {

    const [creds, setCreds] = useState({name:'', email:'', password:'', cpassword:''});

    let navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        const {name, email, password, cpassword} = creds;

        if(password !== cpassword)
        {
            props.showAlert("password didn't matched","warn");
            return;
        }

        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });

        const json = await response.json();
        if(json.status === "success"){
            navigate("/login");
            props.showAlert("Account created successfully","success");
        }
        else{
            // alert(json.message);
            props.showAlert(json.message,"error");
        }
    }

    const handleOnChange = (e) => {
        setCreds({...creds, [e.target.name] : e.target.value})
    }

    return (
        <>
        <div className='container d-flex justify-content-center'>
            <div class="card rounded" style={{width: "25rem"}}>
                <div class="card-body">
                    <h5 class="card-title text-center my-2">Signup for iNotebook</h5>

                    <form onSubmit={handleSignup}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="name" name="name" value={creds.name} placeholder="Name" onChange={handleOnChange}/>
                            <label htmlFor="name">Name</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="email" name="email" value={creds.email} aria-describedby="emailHelp" placeholder="Email" onChange={handleOnChange}/>
                            <label htmlFor="email">Email address</label>
                        </div>
                        
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={handleOnChange}/>
                            <label htmlFor="password">Password</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Password" onChange={handleOnChange}/>
                            <label htmlFor="cpassword">Confirm Password</label>
                        </div>
                        
                        <div className="d-grid gap-2 col-10 mx-auto">
                            <button type="submit" className="btn btn-secondary">Signup</button>
                        </div>
                    </form>

                    <hr/>
                    <div className="text-sm-center my-3">
                        Already have account?<Link to="/login"> Login here</Link>
                    </div>
                </div>
            </div>
        </div>

        <Footer/>

        </>
    )
}

export default Signup
