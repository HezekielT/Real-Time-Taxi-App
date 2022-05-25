import { Box, Button, Card, CardContent, CardMedia, Container, createTheme, 
    Grid, Paper, Stack, TextField, ThemeProvider, CssBaseline , Typography, } from '@mui/material';

import { Timeline, TimelineItem, TimelineSeparator, 
    TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';

import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useSocket } from "../../contexts/SocketProvider";
import {v4 as uuidV4} from "uuid";
import useLocalStorage from '../../hooks/useLocalStorage';
import { useRequests } from '../../contexts/RequestsProvider';
import LinearProgressWithLabel from '../Landing/driversProgress';

const mdTheme = createTheme();
// var socket = Socketio();
// socket.on("connect", () => {
//     console.log("socket id of landing ", socket.id)
// })

function Home() {
    const location = useLocation();
    const { createRequests } = useRequests();
    const { socket, getId} = useSocket();
    const [requestId, setRequestId] = useLocalStorage('passenger-id');
    const [driversInfos, setdriversInfos] = useLocalStorage('my-driver');
    const [progress, setProgress] = useState(10);
    const [status, setStatus] = useState(false)
    const [inputLocation, setInputLocation] = useState({
        pickUp: "",
        destination: ""
    })
    function getLocationInput(value) {
        return setInputLocation((prev) => {
            return {...prev, ...value}
        })
    }
    useEffect(() => {
        if(socket != null) {
            socket.on('get-myDriver', (passengerId, id, driversPhoto, driversName, carsPlateNo) => {
                setdriversInfos(
                    prevResponse => {
                        if(prevResponse != null) {
                            return [ ...prevResponse, { passengerId, id, driversPhoto, driversName, carsPlateNo }];
                        } else {
                            return [{ passengerId, id, driversPhoto, driversName, carsPlateNo }];
                        }
                    }
                )
            })
            return () => socket.off('get-myDriver');
        }
    }, [ socket ])

    useEffect(() => {
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 10));
        }, 800);
        return () => {
          clearInterval(timer);
        };
      }, []);
      
    function LinearWithValueLabel() {
             
          return (
            <Box sx={{ width: '100%' }}>
              <LinearProgressWithLabel value={progress} />
            </Box>
          );
    }

    function handleRequest(e) {
        var accepted ='false'
        e.preventDefault();
        if(!requestId){
            
            const idHolder = uuidV4();
            getId(idHolder);
            setRequestId(idHolder);
            createRequests(idHolder, inputLocation.pickUp, inputLocation.destination );
            socket.emit("send-request", idHolder, inputLocation.pickUp, inputLocation.destination );
            // socket.on("get-request", (id, start, end, accepted) => {
            //     console.log(start);
            // })
            // console.log(typeof socket)
        } else  {
            createRequests(requestId, inputLocation.pickUp, inputLocation.destination );
            socket.emit("send-request", requestId, inputLocation.pickUp, inputLocation.destination );
        }
    }
    
    const driverPaper = () => {
            if(driversInfos != null && !status) {
                const driversInfo = driversInfos[driversInfos.length - 1]
                return (
                    
                    <Card
                        sx={{
                            display: 'flex',
                            mt:4, mb: 4,
                        }}
                    >
                        <CardMedia 
                            component="img"
                            sx={{ width: 160, display: { xs: 'none', sm: 'block'},
                            borderRadius: '10%',
                            margin: '28px'}}
                            image={driversInfo.driversPhoto}
                            alt={driversInfo.driversName}
                            
                        />
                        <CardContent sx={{ flex:1 }}>
                            <Typography component="h1" variant="h5" sx={{ mt: 4,textAlign: 'center'}}>
                                Your Taxi Driver
                            </Typography>
                            <Typography>
                                Driver's Name: {driversInfo.driversName}
                            </Typography>
                            <Typography>
                                Car's Plate Number: {driversInfo.carsPlateNo}
                            </Typography>
                                {LinearWithValueLabel()}
                        </CardContent>
                        
                    </Card>
                )
            } else {
                return (
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
                    <Timeline sx={{p: 4, ml: "0%", mr: "30%"}}>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot sx={{bgcolor: '#fdd835'}}/>
                                <TimelineConnector sx={{height: '60px', bgcolor: '#fdd835' }} />
                            </TimelineSeparator>
                            <TimelineContent sx={{mt: -2 }}>
                                <TextField
                                    margin="none"
                                    fullWidth
                                    id="pickUp"
                                    label="Pick Up Location: "
                                    name="pickuplocation"
                                    value={inputLocation.pickUp}
                                    onChange={(e) => {getLocationInput({pickUp: e.target.value})}}
                                    autoFocus
                                />
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot sx={{bgcolor: '#fdd835'}}/>
                            </TimelineSeparator>
                            <TimelineContent sx={{ mt: -4 }}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="destination"
                                    label="Destination Location: "
                                    name="dest_location"
                                    value={inputLocation.destination}
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
                )
            }
        }
    
    return (
        <ThemeProvider theme={mdTheme}>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '83.6vh',
                    overflow: 'auto'
                }}
            >
                <Container maxWidth="lg" sx={{ mt:4, mb: 4, }}>
                    <Grid>    
                            {driverPaper()}
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}



export default Home;