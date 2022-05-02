import { Grid, Toolbar, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5001";
function Temp() {
    const location = useLocation();
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
            setResponse(data);
        });
    }, []);

    return (
        <Grid item xs={10}>
            <Toolbar />
            <Typography>It's <time dateTime={response}>{response}</time></Typography>
            {console.log(location.pathname)}
        </Grid>
    );
}

export default Temp;