import { Typography, Grid, TextField, Button } from "@mui/material"
import React from "react";
import { useState } from "react";
import storage from "../../firebase";

const PersonalInfo = (props) => {

    const [userImg, setUserImg] = useState(undefined);

    function uploadToFirebase(value) {
        const uploadTask = storage.ref(`images/${value.name}`).put(value);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                var percent = snapshot.bytesTransferred / snapshot.totalbytes * 100 ;
                console.log(percent + "%");
            },
            (error) => {console.log(error)},
            async () => {
                await storage
                    .ref("images").child(value.name).getDownloadURL().then((urls) => {
                    props.form.driver_photo_url = urls;
                })
            }
        )
    }

    return (
        <React.Fragment>
            <Typography>Personal Details</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        // id="fname"
                        // name="fname"
                        label="First Name"
                        fullWidth
                        autoComplete="first name"
                        variant="standard"
                        value={props.form.fname}
                        onChange={(e) => props.onChange([props.form.fname = e.target.value])}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        // id="lname"
                        // name="lname"
                        label="Last Name"
                        fullWidth
                        autoComplete="last name"
                        variant="standard"
                        value={props.form.lname}
                        onChange={(e) => props.onChange([props.form.lname = e.target.value])}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        // id="licenceNo"
                        // name="licenceNo"
                        label="Licence Number"
                        fullWidth
                        autoComplete="Licence Number"
                        variant="standard"
                        value={props.form.driver_licence_no}
                        onChange={(e) => props.onChange([props.form.driver_licence_no = e.target.value])}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Typography>
                        Choose Profile Picture
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <label htmlFor="driImg">
                        <input 
                            id="driImg"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => uploadToFirebase(e.target.files[0])}
                        />
                        <Button
                            variant="outlined"
                            component="span"
                            fullWidth>
                            Choose Image
                        </Button>
                    </label>
                </Grid>
                
                {/* <Grid item xs={12}>
                    <Button
                        variant="contained"
                        component="span"
                        fullWidth>
                        Upload Image
                    </Button>
                </Grid> */}
            </Grid>
        </React.Fragment>
    )
};

export default PersonalInfo;