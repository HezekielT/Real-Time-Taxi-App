import { Box, Button, Container, createTheme, 
    Grid, Paper, TextField, ThemeProvider, Toolbar, Typography } from '@mui/material';

import { Timeline, TimelineItem, TimelineSeparator, 
    TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';

import React from 'react';

const mdTheme = createTheme();
function Home() {
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
                                                fullWidth
                                                id="pickUp"
                                                label="Pick Up Location: "
                                                name="pickuplocation"
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
                                                fullWidth
                                                id="destination"
                                                label="Destination Location: "
                                                name="dest_location"
                                            />
                                        </TimelineContent>
                                    </TimelineItem>
                                </Timeline>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        type="submit"
                                        
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