import { Typography, Grid, TextField } from "@mui/material"
import React from "react"

const Account = (props) => {
    return (
        <React.Fragment>
            <Typography>Create Account</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    {props.form.message}
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        autoComplete="email"
                        variant="standard"
                        value={props.form.email}
                        onChange={(e) => props.onChange([props.form.email = e.target.value])}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        // id="phoneno"
                        // name="phoneno"
                        label="Phone Number"
                        fullWidth
                        autoComplete="Phone Number"
                        variant="standard"
                        value={props.form.phoneno}
                        onChange={(e) => props.onChange([props.form.phoneno = e.target.value])}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        // id="password"
                        // name="password"
                        label="Password"
                        fullWidth
                        autoComplete="password"
                        type="password"
                        variant="standard"
                        value={props.form.password}
                        onChange={(e) => props.onChange([props.form.password = e.target.value])}
                    />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        // id="confirm_psd"
                        // name="cpassword"
                        label="Confirm Password"
                        fullWidth
                        autoComplete="confirm password"
                        type="password"
                        variant="standard"
                        value={props.form.confirm_password}
                        onChange={(e) => props.onChange([props.form.confirm_password = e.target.value])}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
};

export default Account;