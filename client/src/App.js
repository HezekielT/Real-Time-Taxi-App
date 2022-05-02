import React from "react";
import { BrowserRouter as BRouter, Outlet, Routes} from 'react-router-dom';
import SignUp from "./components/Registeration/driver_form";
import SignIn from "./components/login";
import Home from "./components/landing_page";
import NavBar from "./components/NavBar";
import Navigator from "./components/Navigator";
import { Container, Grid } from "@mui/material";

const App = () => {
  return (
    <Grid>
      <Navigator />
      <Outlet />
    </Grid>
    //<SignIn />
       
  );
}

export default App;
