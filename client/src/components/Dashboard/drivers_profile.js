import { Box, Paper, Typography, Card, Avatar,Container,
     Grid, Divider, ThemeProvider, createTheme, Tabs, Tab } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import EditCarDetails from './edit-car-details';
import EditPassword from './edit-password';
import EditPersonalDetails from './edit-personal-details';

const axios = require("axios");
const mdTheme = createTheme();

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return(
        <Paper maxWidth="sm" sx={{ mb: 4 }}
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
        </Paper>
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
const DriversProfile = () => {
    const [value, setValue ] = React.useState(0);
    const location = useLocation();
    const dId = useParams();
    const [responseData, setResponseData] = useState(null)
    const handleChange = (event, newValue ) => {
        setValue(newValue);
    }
    const config = {
        header: {
            "Content-Type": "application/json",
        },
      };
    useEffect(async () => {
        await axios.post(
            "http://localhost:5000/dId",
            config
          )
          .then(function (response){
            setResponseData(response);
          })
          .catch(function (error) {
            console.log(error);
          })
    },[responseData])
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
                <Container maxWidth="xl" sx={{ mt:4, mb: 4, }}>
                    <Grid item md={12} lg={12} xl={12} sx={{ justifyContent: 'center'}}>
                        <Paper
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography component="h1" variant="h5" sx={{ mt: 4,mb: 4,textAlign: 'center'}}>
                                Profile Page
                            </Typography>  
                        </Paper>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item md={3} lg={3} xl={3}
                            sx={{
                                height: '80vh',
                            }}
                        >
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '77vh',
                                    mt: 2,
                                    mb: 4, 
                                    pl: 2
                                }}
                            >
                                {console.log(responseData)}
                                {(responseData && responseData.drivers_photo) ? 
                                (<Avatar 
                                sx={{ width: 150, height: 150, ml: 11, my: 4 }}
                                alt="Driver Photo" 
                                src={responseData.drivers_photo}
                                />) :
                                (<Avatar 
                                sx={{ width: 150, height: 150, ml: 11, my: 4 }}
                                src="/broken-image.jpg" 
                                />) 
                                } 
                                
                                
                                <Divider sx={{ my: 1, mr: 2 }}/>
                                <Tabs
                                    orientation='vertical'
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="Vertical Tabs"
                                    sx={{ borderRight: 1, borderColor: 'divider' }}
                                >
                                    <Tab label="Change Personal Details" {...tabProps(0)}/>
                                    <Tab label="Change Password" {...tabProps(1)}/>
                                    <Tab label="Change Car Details" {...tabProps(2)}/>
                                </Tabs>
                                
                            </Card>
                        </Grid>
                        <Grid item xs={9} md={9} lg={9}
                            sx={{
                                height: '80vh',
                            }}
                        >
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '77vh',
                                    mt: 2,
                                    mb: 4, 
                                }}
                            >
                                <TabPanel value={value} index={0}>
                                    <EditPersonalDetails response={responseData}/>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <EditPassword />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <EditCarDetails response={responseData}/>
                                </TabPanel>
                            </Card> 
                        </Grid>
                    </Grid>
                </Container>
                
                
            </Box>
        </ThemeProvider>
    );
};

export default DriversProfile;