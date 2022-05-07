import { Box, Button, Container, createTheme, 
    Grid, Paper, TextField, ThemeProvider, Toolbar, Typography } from '@mui/material';

import { Timeline, TimelineItem, TimelineSeparator, 
    TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';

import React, {useState} from 'react';
import socketIOClient from "socket.io-client";
import { CssBaseline } from '@mui/material';

const ENDPOINT = "http://127.0.0.1:5001";
const mdTheme = createTheme();
// how to set 
function Home() {

    const [bothLocation, setBothLocation] = useState({
        pickUp: "",
        destination: ""
    })
    function getLocationInput(value) {
        return setBothLocation((prev) => {
            return {...prev, ...value}
        })
    }
    function handleRequest(e) {
        e.preventDefault();
        const socket = socketIOClient(ENDPOINT);
        const txt = "I want a ride";
        socket.on("connect", () => {
            console.log("Connected to blab")
            socket.emit("AvailableDriver", socket.id, bothLocation);
        })
    }
    return (
        <ThemeProvider theme={mdTheme}>
            <CssBaseline />
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
                    <Grid container spacing={3}>
                        <Grid item md={8} lg={9}>
                            <Paper
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mt:4, mb: 4,
                                }}
                            >
                                <Typography component="h1" variant="h5" sx={{ mt: 4,textAlign: 'center'}}>
                                    Request A Ride
                                </Typography>
                                <Timeline sx={{p: 4, mr: 30}}>
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot sx={{bgcolor: '#fdd835'}}/>
                                            <TimelineConnector sx={{height: '60px', bgcolor: '#fdd835' }} />
                                        </TimelineSeparator>
                                        <TimelineContent sx={{mt: -2}}>
                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                id="pickUp"
                                                label="Pick Up Location: "
                                                name="pickuplocation"
                                                value={bothLocation.pickUp}
                                                onChange={(e) => {getLocationInput({pickUp: e.target.value})}}
                                                autoFocus
                                            />
                                        </TimelineContent>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot sx={{bgcolor: '#fdd835'}}/>
                                        </TimelineSeparator>
                                        <TimelineContent sx={{mt: -2}}>
                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                id="destination"
                                                label="Destination Location: "
                                                name="dest_location"
                                                value={bothLocation.destination}
                                                onChange={(e) => {getLocationInput({destination: e.target.value})}}
                                            />
                                        </TimelineContent>
                                    </TimelineItem>
                                </Timeline>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        type="submit"
                                        onClick={handleRequest}
                                        variant="contained"
                                        sx={{ mt: -4, mb: 4, }}
                                    >
                                        Request
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default Home;