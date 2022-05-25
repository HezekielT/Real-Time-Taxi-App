import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './Dashboard/drivers_dashboard';
import Home from './Landing/landing_page';
import SignIn from './Login/login';
import NavBar from './NavBar';
import SignUp from './Registeration/driver_form';
import { RequestsProvider } from '../contexts/RequestsProvider'
import Footer from './Pages/footer';

function Navigator() {
    
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default Navigator;