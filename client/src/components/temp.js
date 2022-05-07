import { Grid, Toolbar, Typography } from '@mui/material';
import React, {useState, useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5001";
function Temp() {
    const [response, setResponse] = useState("");
    const componentMounted = useRef(true);
    const worker = () => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
            if (componentMounted.current){
                setResponse(data);
            }
            return () => {
                componentMounted.current = false;
            }
        });
    }
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
            setResponse(data);
            
        });
        // worker();
        // return () => {
        //     setResponse(""); // This worked for me
        //   };
    });

    return (
        <Grid item xs={10}>
            <Toolbar />
            <Typography>It's <time dateTime={response}>{response}</time></Typography>
            {console.log(response)}
        </Grid>
    );
}

export default Temp;