import { Box, Paper, Typography, Card, Avatar,Container,
     Grid, Divider, ThemeProvider, createTheme, Tabs, Tab } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';
import EditCarDetails from './edit-car-details';
import EditPassword from './edit-password';
import EditPersonalDetails from './edit-personal-details';

const mdTheme = createTheme();

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
const DriversProfile = () => {
    const [value, setValue ] = React.useState(0);
    const location = useLocation();
    const handleChange = (event, newValue ) => {
        setValue(newValue);
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
                <Container maxWidth="xl" sx={{ mt:4, mb: 4, }}>
                    <Grid item md={10} lg={10} xl={12} sx={{ justifyContent: 'center'}}>
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
                        <Grid item md={8} lg={8} xl={2}
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
                                {(location.state.user.profile_photo) ? 
                                (<Avatar 
                                sx={{ m: 4, width: 150, height: 150, }}
                                alt="Driver Photo" src={location.state.user.profile_photo}
                                />) :
                                <Avatar 
                                sx={{ m: 4, width: 150, height: 150, }}
                                src="/broken-image.jpg" 
                                />
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
                        <Grid item md={4} lg={4} xl={10}
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
                                    <EditPersonalDetails />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <EditPassword />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <EditCarDetails />
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