import React, {useState} from 'react';
import {useLocation} from 'react-router-dom'
import socketIOClient from "socket.io-client";
import { Box, Button, Container, createTheme, 
    Grid, Paper, TextField, ThemeProvider, Toolbar, Typography } from '@mui/material';

import { Timeline, TimelineItem, TimelineSeparator, 
    TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';

const mdTheme = createTheme();
const ENDPOINT = "http://127.0.0.1:5001";
function Dashboard(props) {
    const location = useLocation();
    const [ newRequest, setNewRequest] = useState({
        id: '',
        from: '',
        to: '',
    });
    const socket = socketIOClient(ENDPOINT)
    socket.on("Ride-Request", (message, obj) => {
        updateRequest(message, obj.pickUp, obj.destination);
    })

    function updateRequest (id, from, to){
        return setNewRequest(() => { 
            return {id, from, to}
        })
        
    }
    return (
        // <div>
        //     Hello {location.state.first_name}
        //     {console.log(location.state.first_name)}
        // </div>
        <ThemeProvider theme={mdTheme}>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto'
                }}
            >
                <Container maxWidth="lg" sx={{ mt:4, mb: 4, }}>
                        <Grid item md={8} lg={9}>
                            <Paper
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mt:4, mb: 4,
                                }}
                            >
                                <Typography component="h1" variant="h5" sx={{ mt: 4,textAlign: 'center'}}>
                                    Requested Ride
                                </Typography>
                                <Typography variant="h5" sx={{ mt: 4, mb: 4, ml: 4 }}>
                                    From: {newRequest.from}
                                </Typography>
                                <Typography variant="h5" sx={{ mb:4, ml: 4}}>
                                    To: {newRequest.to}
                                </Typography>
                                <Box sx={{ mt: 4,display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        type="submit"
                                        //onClick={handleRequest}
                                        variant="contained"
                                        sx={{ mt: -4, mb: 4, }}
                                    >
                                        Accept
                                    </Button>
                                </Box>
                            </Paper>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
        
    );
}

export default Dashboard;