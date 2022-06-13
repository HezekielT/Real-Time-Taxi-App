import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { Box, Button, Container, createTheme, 
    Grid, Link, Paper, ThemeProvider, Typography, Avatar, Divider, Tabs, Tab } from '@mui/material';
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
import PropTypes from 'prop-types';

const mdTheme = createTheme();
const idHolder = uuidV4();
// const socket = Socketio();;
// socket.on("connect", () => {
//     console.log("your Socket id of dashboard ", socket.id)
// })

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return(
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

function tabProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function Dashboard(props) {
    const [value, setValue ] = React.useState(0);
    
    const navigate = useNavigate();
    const { responses, createResponses } = useResponses();
    const { socket, getId } = useSocket();
    //const { createResponses } = useResponses();
    const { requests, createRequests } = useRequests();
    const location = useLocation();
    const data = location.state.user;
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
    const handleChange = (event, newValue ) => {
        setValue(newValue);
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
        socket.emit("request-accepted", driversId, passengerId, location.state.user.drivers_photo, location.state.user.first_name, location.state.user.car.plate_number)
        createResponses(driversId, passengerId, location.state.user.drivers_photo, location.state.user.first_name, location.state.user.car.plate_number)
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
                    <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={9}>
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
                    <Grid item md={3} lg={3} xl={3}
                            sx={{
                                height: '80vh',
                            }}
                        >
                            <Card 
                                sx={{
                                    display: {xs: 'none', lg:'flex', xl: 'flex'},
                                    flexDirection: 'column',
                                    height: '76vh',
                                    mt: 4,
                                    mb: 4, 
                                    ml: 4,
                                }}
                            >
                                <Button 
                                    variant="h5" 
                                    sx={{textAlign: 'center', display: 'flex', flexDirection: 'column', mx: 2, my: 2}}
                                    clickable="true"
                                    onClick={() => navigate(`/editProfile/${location.state.user._id}`)}
                                >
                                {(location.state.user.drivers_photo) ? 
                                (<Avatar 
                                sx={{ m: 4, width: 150, height: 150, }}
                                alt="Driver Photo" src={location.state.user.drivers_photo}
                                />) : (
                                <Avatar 
                                sx={{ m: 4, width: 150, height: 150, }}
                                src="/broken-image.jpg" 
                                />
                                )}
                                
                                    <Link
                                        onClick={() => navigate(`/editProfile/${location.state.user._id}`)}
                                    >
                                        {location.state.user.first_name + " "+location.state.user.last_name}
                                    </Link>
                                </Button>
                                <Typography variant="secondary" sx={{textAlign: 'center'}}>Rating: N/A</Typography>
                                <Divider sx={{ my: 1, mr: 2 }}/>
                                <Tabs
                                    orientation='vertical'
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="Vertical Tabs"
                                    sx={{ borderRight: 1, borderColor: 'divider' }}
                                >
                                    <Tab label="Nearby Requests" {...tabProps(0)}/>
                                    <Tab label="My Ride History" {...tabProps(0)}/>
                                </Tabs>
                            </Card>
                        </Grid></Grid>
                </Container>
            </Box>
        </ThemeProvider>
        
    );
}

export default Dashboard;