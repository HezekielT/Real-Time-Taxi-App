import { Typography, Grid, TextField } from "@mui/material"
import React from "react"

const CarInfo = (props) => {
    
    return (
        <React.Fragment>
            <Typography>About Your Car</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        // id="cmodel"
                        // name="carmodel"
                        label="Car's Model"
                        fullWidth
                        autoComplete="car's model"
                        variant="standard"
                        value={props.form.cars_model}
                        onChange={(e) => props.onChange([props.form.cars_model = e.target.value])}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        // id="plateno"
                        // name="plateno"
                        label="Plate Number"
                        fullWidth
                        autoComplete="plate no"
                        variant="standard"
                        value={props.form.cars_plate_no}
                        onChange={(e) => props.onChange([props.form.cars_plate_no = e.target.value])}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        // id="insurance"
                        // name="insurance"
                        label="Insurance Company Name"
                        fullWidth
                        autoComplete="Insurance Company"
                        variant="standard"
                        value={props.form.cars_insurance_company}
                        onChange={(e) => props.onChange([props.form.cars_insurance_company = e.target.value])}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
};

export default CarInfo;