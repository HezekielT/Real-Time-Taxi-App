import React, { useState } from "react";
import { AppBar, Button, Container, CssBaseline, Link, Paper, Step, StepLabel, Stepper, Toolbar, Typography, Box } from "@mui/material";
import Account from "./account";
import PersonalInfo from "./personal_details";
import CarInfo from "./car_info";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const axios = require('axios');

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="www.goal.com">
                TAXI App
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ["Create Account","Personal Details", "Car's Details"];



const theme = createTheme();

export default function SignUp() {
    const [activeStep, setActiveStep] = useState(0);
    const [form, setForm] = useState({

        email: "",
        phoneno: "",
        password: "",
        confirm_password: "",
        fname: "",
        lname: "",
        driver_photo_url: undefined,
        driver_licence_no: "",
        cars_model: "",
        cars_plate_no: "",
        cars_insurance_company: "",
        isError: false,
        message: "",
        //current_location: [],
    });

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Account form={form} onChange={(value) => updateForm(value)}/>;
            case 1:
                return <PersonalInfo form={form} onChange={(value) => updateForm(value)}/>;
            case 2:
                return <CarInfo form={form} onChange={(value) => updateForm(value)}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    function updateForm(value){
        return setForm((prev) => {
            return { ...prev, ...value};
        });
    }

    const handleNext = (e) => {
        setActiveStep(activeStep + 1);
        if(activeStep === steps.length - 1) {
            onSubmit(e);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    async function onSubmit(e){
        console.log("Good Job man")
        e.preventDefault();
        const config = {
            header: {
                "Content-Type": "application/json",
                cors: {
                    origin: ['http://localhost:3000']
                }
            },
        };
        
        await axios.post(
            "http://localhost:5000/register",
            {
                first_name: form.fname,
                last_name: form.lname,
                drivers_licence_no: form.driver_licence_no,
                drivers_photo: form.driver_photo_url,
                email: form.email,
                phoneno: form.phoneno,
                password: form.password,
                model: form.cars_model,
                plate_number: form.cars_plate_no,
                insurance_company: form.cars_insurance_company,
            },
            config
        )
        
        // try{
        //     await fetch(
        //     "http://localhost:5000/register/",{
        //     method: "POST",
        //     config,
        //     body:JSON.stringify(
        //     { 
        //         first_name:form.fname, 
        //         last_name: form.lname, 
        //         email: form.email, 
        //         password: form.password, 
        //         drivers_licence_no: form.driver_licence_no 
        //     }),}
        // )}catch(error){ console.log(error);}
        
        
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>Izzy Ride</Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6}, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Sign Up
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank You for signing up!
                                    
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1}}>
                                            Back
                                        </Button>
                                    )}

                                    <Button
                                        //type="submit"
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                <Copyright />
            </Container>
        </ThemeProvider>
    )

}