import React, { useState, useRef } from 'react';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
// import Footer from './components/Footer';


function App() {

    const[alert, setAlert] = useState(null);

    const alertRef = useRef();

    const showAlert = async (message, type) => {
        setAlert({
            msg : message,
            type : type
        });
        await alertRef.current.notify();
        setAlert(null);
    }

    return (
        <>
            <NoteState>
                <Router basename='/'>
                    {localStorage.getItem('token') && <Navbar/>}
                    <Alert alert={alert} ref={alertRef}/>
                    <div className="container my-3">
                        <Routes>
                            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
                            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
                            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
                            <Route exact path="/about" element={<About showAlert={showAlert}/>} />
                        </Routes>
                    </div>
                    {/* <Footer/> */}
                </Router>
            </NoteState>
        </>
    );
}

export default App;
