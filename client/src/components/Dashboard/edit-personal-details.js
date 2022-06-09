import { Divider } from '@mui/material';
import { Paper, Grid } from '@mui/material';
import { Typography, Box, Button, Container, TextField } from '@mui/material';
import React from 'react';

import { useLocation } from 'react-router-dom';
function EditPersonalDetails(props) {

    const location = useLocation()
    return (
        <Container maxWidth="sm" sx={{ mb: 4 }}>

        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6}, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>

            <Typography
                variant="h5"
                sx={{ textAlign: 'center', textDecoration: 'underline'}}
                >
                Personal Details
            </Typography>
                    </Grid>

            <Divider sx={{ pt: 3}}/>
                <Grid item xs={12} md={6} lg={4}>
            <Typography sx={{ pt: 3}}>
                First Name:
            </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label={location.state.user.first_name}
                        //value={props.form.fname}
                        //onChange={(e) => props.onChange([props.form.fname = e.target.value])}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>

            <Typography sx={{ pt: 3}}>
                Last Name:
            </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label={location.state.user.last_name}
                        //value={props.form.fname}
                        //onChange={(e) => props.onChange([props.form.fname = e.target.value])}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>

            <Typography sx={{ pt: 3}}>
                Email:
            </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label={location.state.user.email}
                        //value={props.form.fname}
                        //onChange={(e) => props.onChange([props.form.fname = e.target.value])}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>

            <Typography sx={{ pt: 3}}>
                Licence Number:
            </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label={location.state.user.drivers_licence_no}
                        //value={props.form.fname}
                        //onChange={(e) => props.onChange([props.form.fname = e.target.value])}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>

            <Typography sx={{ pt: 3}}>
                Phone Number:
            </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label={location.state.user.phoneno}
                        //value={props.form.fname}
                        //onChange={(e) => props.onChange([props.form.fname = e.target.value])}
                    />
                </Grid>
                
            </Grid>
            <Divider sx={{ pt: 3}}/>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 4 }}>
                <Button
                    //type="submit"
                    variant="contained"
                    //onClick={handleNext}
                >
                    Submit
                </Button>
            </Box>
        </Paper>
        </Container>
    );
}

export default EditPersonalDetails;