import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './drivers_dashboard';
import Home from './landing_page';
import SignIn from './login';
import MainNavBar from './NavBar';
import SignUp from './Registeration/driver_form';
import Temp from './temp';

function Navigator(props) {
    return (
        <Router>
            <MainNavBar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/test" element={<Temp />} />
            </Routes>
        </Router>
    );
}

export default Navigator;