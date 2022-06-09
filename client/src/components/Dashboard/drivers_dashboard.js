import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation} from 'react-router-dom'
import Socketio from "../../contexts/SocketProvider";
import { Box, Button, Container, createTheme, 
    Grid, Paper, ThemeProvider, Typography } from '@mui/material';
import useLocalStorage from '../../hooks/useLocalStorage';
import { List, ListItem } from '@mui/material';
import { v4 as uuidV4 } from "uuid";
import { useResponses } from "../../contexts/ResponsesProvider";
import { useRequests } from "../../contexts/RequestsProvider"
import { useSocket } from '../../contexts/SocketProvider';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardActions } from '@mui/material';
import { CardHeader } from '@mui/material';
import { response } from 'express';

const mdTheme = createTheme();
const idHolder = uuidV4();
// const socket = Socketio();;
// socket.on("connect", () => {
//     console.log("your Socket id of dashboard ", socket.id)
// })


function Dashboard(props) {
    const navigate = useNavigate();
    const { responses, createResponses } = useResponses();
    const { socket, getId } = useSocket();
    //const { createResponses } = useResponses();
    const { requests, createRequests } = useRequests();
    const location = useLocation();
    const [driversId, setDriversId] = useLocalStorage('driver-id');

    // const [ availableRequests, setAvailableRequests ] = useLocalStorage('Available-Requests', []);
    
    
    useEffect(() => {
        setDriversId(idHolder)
        getId(idHolder)
    },[])
    
    const [soctIo, setSoctIo] = useState(null)
    const [acceptFlag, setAcceptFlag] = useState(false)
    const [ newRequest, setNewRequest] = useState({
        id: '',
        from: '',
        to: '',
    });
    function updateRequest (id, from, to){
        return setNewRequest(() => { 
            return {id, from, to}
        })
        
    }
    
    // const txt="alright I'm gonna be there"
    // socket.on("connect", () => {
    //     //console.log(socket.id)
    //     if(acceptFlag){
    //         socket.emit('Accept-Request', txt)
    //         setAcceptFlag(false);
    //     }
    // })
    // socket.on("Ride-Request", (message, obj) => {
    //     //console.log(socket.id);
    //     //createRequest()
    //     createRequests(message, obj.pickUp, obj.destination);
    //     console.log("is",message)
    // })

    // Here is the right one
    
    useEffect(() => {
        if (socket != null) {
            socket.on('get-request', (id, start, end, accepted) => {
                console.log(start," here")
                createRequests(id, start, end , accepted)
            })

            socket.on('get-myDriver', (passengerId, id, driversPhoto, driversName, carsPlateNo, completed) => {
                if(id != driversId) {
                    requests.map(request => {
                        const newResponses = requests.filter(r => r !== id)
                        localStorage.setItem('requests', newResponses)
                    }) 
                    // remove request of id id from the local storage
                }
            })

            return () => socket.removeAllListeners();
        }
        
    },[socket])

    // socket.on('get-request', (id, start, end, accepted) => {
    //     console.log("got me", id)
    //     //createRequests(id, start, end , accepted)
    // })
    // socket.on("delete-request-from-the-rest", () => { 
    //     delete passengers data from the local storage
    // })
    

    function acceptRequest (passengerId) {
        socket.emit("request-accepted", driversId, passengerId, location.state.user.profile_photo, location.state.user.first_name, location.state.user.plate_no)
        createResponses(driversId, passengerId, location.state.user.profile_photo, location.state.user.first_name, location.state.user.plate_no)
        //setAcceptFlag(true);
        // Here is the right one
        // createResponses(passengersId, driversId, location.state.user.profile_photo, location.state.user.first_name, location.state.user.plate_no, messages)
        // add a 
    }
    
    const printRequests = () => {
        return (
            <Grid container spacing={3}>
                {requests.map(request => (
                
                    <Grid item key={request.id} xs={12} md={6} lg={6}>
                        <Card elevation={1}>
                            <CardContent>
                            <Typography variant="h6">
                                From: {request.start}
                            </Typography>
                            <Typography variant="h6" component="div">
                                To: {request.end}
                            </Typography>
                            </CardContent>
                            <CardHeader
                                action={
                                    <Button value={request.id} variant='outlined' onClick={() => acceptRequest(request.id)} >Accept and Drive to Pickup</Button>
                                }

                            ></CardHeader>
                        </Card>
                    </Grid>
                ))}
{/*                 
                <Typography variant="h5" sx={{ mt: 4, mb: 4, ml: 4 }}>
                    From: {newRequest.from}
                </Typography>
                <Typography variant="h5" sx={{ mb:4, ml: 4}}>
                    To: {newRequest.to}
                </Typography>
                <Box sx={{ mt: 4,display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type="submit"
                        onClick={acceptRequest}
                        variant="contained"
                        sx={{ mt: -4, mb: 4, }}
                    >
                        Accept
                    </Button>
                </Box> */}
            </Grid>
        )
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
                    <Grid item md={8} lg={9}>
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            mt:4, mb: 4,
                        }}
                    >
                        <Typography component="h1" variant="h5" sx={{ mt: 4,mb: 4,textAlign: 'center'}}>
                            Ride Requests
                        </Typography>  
                    </Paper>
                    {requests ? (printRequests()) : (
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            mt:4, mb: 4,
                        }}
                    >
                        <Typography component="h1" variant="h5" sx={{ mt: 4,mb: 4,textAlign: 'center'}}>
                            No Nearby Request for Ride yet!
                        </Typography>
                    </Paper>
                    
                    )}
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 4 }}>
                <Button
                    //type="submit"
                    variant="contained"
                    //onClick={() => {navigate('/editProfile/'+location.state._id, {state:{user: response.data.user}})}}
                >
                    Submit
                </Button>
            </Box>
                </Container>
            </Box>
        </ThemeProvider>
        
    );
}

export default Dashboard;