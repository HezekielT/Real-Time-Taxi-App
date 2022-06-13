import { Typography, Box, Button, Grid, 
    TextField, Paper, Container, Divider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import React from 'react';

const EditCarDetails = (props) => {
    const location = useLocation();
    return (
        <React.Fragment>

        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6}, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
            <Typography
                // variant="h5"
                sx={{ textAlign: 'center', textDecoration: 'underline'}}
            >
                Car's Detail:
            </Typography>
            </Grid>

            <Divider sx={{ pt: 3}}/>
            <Grid item xs={12} md={6} lg={4}>

            <Typography sx={{ pt: 2}}>
                Car Model Name: 
            </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
                <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label={(props.response) ? (props.response.car.model) : ("Car's Model")}
                        //value={props.form.fname}
                        //onChange={(e) => props.onChange([props.form.fname = e.target.value])}
                    />
                </Grid>
            
            <Grid item xs={12} md={6} lg={4}>

            <Typography sx={{ pt: 2}}>
                Plate Number:
            </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
                <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label={(props.response) ? (props.response.car.plate_number) : ("Plate Number")}
                        //value={props.form.fname}
                        //onChange={(e) => props.onChange([props.form.fname = e.target.value])}
                    />
                </Grid>
            <Grid item xs={12} md={6} lg={4}>

            <Typography sx={{ pt: 2}}>
                Insurance Company Name:
            </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
                <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label={(props.response) ? (props.response.car.insurance_company) : ("Insurance Company")}
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
            </React.Fragment>
    );
};

export default EditCarDetails;