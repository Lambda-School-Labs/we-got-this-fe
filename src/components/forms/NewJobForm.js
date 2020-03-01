import React, { useState, useEffect } from 'react';
import { useStateValue, withState } from '../../state';
import { styled, makeStyles, withTheme } from '@material-ui/core/styles';
import MuiTextAreaInput from '../formItems/MuiTextAreaInput';
import {
    Grid,
    TextField,
    MenuItem,
    Paper,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Divider,
    Box,
    Typography,
} from '@material-ui/core';
import { actions as customerActions } from '../../state/customer/customerActions';
import { actions as jobActions } from '../../state/jobs/jobsActions';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import zipcodes from '../../constants/zipcodes';
import { createTimes, durations } from '../../constants/times';
import SplashLoading from '../loading/SplashLoading';

import MuiTextInput from '../formItems/MuiTextInput';
import MuiPhoneInput from '../formItems/MuiPhoneInput';
import MuiSingleSelectInput from '../formItems/MuiSingleSelectInput';

import paymentOptions from '../../constants/paymentOptions';
import referralOptions from '../../constants/referralOptions';

import moment from 'moment';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles({
    column: {
        display: 'flex',
        flexDirection: 'column',
    },
});

const SelectedTime = styled(withTheme(Paper))(props => ({
    padding: props.theme.spacing(1),
    margin: props.theme.spacing(1),
}));

const NewJobForm = ({ handleClose }) => {
    const [loading, setLoading] = useState(true);
    const [{ customers, jobs }, dispatch] = useStateValue();
    const [selectedCustomer, setSelectedCustomer] = useState();
    const classes = useStyles();

    //
    //If there are no customers, get the customers from the database
    //So they're available for the form
    useEffect(() => {
        if (!customers.customers.length) {
            customerActions.getCustomers(dispatch).then(res => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [customers.customers.length, dispatch]);

    const formatSlotEvent = slotEvent => {
        //So it doesn't break on mount while slotEvent is being added to global
        if (!slotEvent.start) {
            return 'Loading...';
        }

        //Give me the date
        let date = moment(slotEvent.start).format('LL');

        //Give me the start time
        let startTime = moment(slotEvent.start).format('LT');

        //Give me the end time
        let endTime = moment(slotEvent.end).format('LT');

        //Check if a day was selected or the individual time slot was selected
        if (startTime == '12:00 AM' || endTime == '12:00 AM') {
            //TODO: finish
        }
        return (
            <Box>
                <h4>Selected Slot</h4>
                <p>Date: {date}</p>
                <p>Start Time: {startTime}</p>
                <p>End Time: {endTime}</p>
            </Box>
        );
    };

    const handleExistingCustomerSubmit = e => {
        e.preventDefault();

        if (selectedCustomer) {
            jobActions.setNewJobCustomer(dispatch, selectedCustomer);
        }
    };

    return (
        <>
            <DialogContent>
                <Grid container spacing={1}>
                    {/* Dialog Header */}
                    <Grid item xs={12}>
                        <h2>Create New Job</h2>
                        <SelectedTime>
                            {formatSlotEvent(jobs.newJob.slotEvent)}
                        </SelectedTime>
                    </Grid>

                    {/* Select Customer Form Option */}
                    <Grid item xs={12}>
                        <form onSubmit={handleExistingCustomerSubmit}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <h3>Select Existing Customer</h3>
                                </Grid>
                                <Grid item xs={6}>
                                    <Autocomplete
                                        options={customers.customers}
                                        getOptionLabel={customer =>
                                            customer.name
                                        }
                                        onChange={(_, customer) =>
                                            setSelectedCustomer(customer)
                                        }
                                        filterOptions={(customers, state) =>
                                            customers.filter(customer =>
                                                customer.name
                                                    .toLowerCase()
                                                    .includes(
                                                        state.inputValue.toLowerCase()
                                                    )
                                            )
                                        }
                                        renderInput={params => (
                                            <TextField
                                                name="customer"
                                                {...params}
                                                variant="standard"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid
                                        container
                                        justify="center"
                                        alignItems="center"
                                        style={{ height: '100%' }}
                                    >
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Next ->
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>

                    {/* New Customer Form */}
                    <Grid item xs={12}>
                        <Formik
                            initialValues={{
                                docId: '',
                                name: '',
                                phoneNumber: '',
                                email: '',
                                street: '',
                                region: 'ID',
                                city: '',
                                zipcode: '',
                                hearabout: '',
                                payment: '',
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().required(),
                                phoneNumber: Yup.string().required(),
                                email: Yup.string().required().email(),
                                street: Yup.string().required(),
                                city: Yup.string().required(),
                                region: Yup.string().required(),
                                zipcode: Yup.number().required(),
                                hearabout: Yup.string().required(),
                                payment: Yup.string().required(),
                            })}
                            onSubmit={(values, { resetForm }) => {
                                console.log(values);
                                jobActions.setNewJobCustomer(dispatch, values);
                            }}
                        >
                            <Form>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <h3 style={{ marginTop: 20 }}>
                                            OR Create New Customer
                                        </h3>
                                    </Grid>

                                    <Grid item xs={5}>
                                        <MuiTextInput
                                            name="name"
                                            label="Name"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <MuiTextInput
                                            name="email"
                                            label="Email"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={7}>
                                        <MuiPhoneInput
                                            name="phoneNumber"
                                            label="Phone"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MuiTextInput
                                            name="street"
                                            label="Street Address"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <MuiTextInput
                                            name="city"
                                            label="City"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <MuiTextInput
                                            name="region"
                                            label="State"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <MuiTextInput
                                            name="zipcode"
                                            label="Zipcode"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item className={classes.column} xs={12}>
                        <MuiSingleSelectInput
                            name="payment"
                            label="Payment Method"
                            data={paymentOptions}
                        />
                        <MuiSingleSelectInput
                            name="hearabout"
                            label="How did you hear about us?"
                            data={referralOptions}
                        />
                        <MuiTextAreaInput
                            name="notes"
                            label="Notes"
                            type="text"
                        />
                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        marginTop: 20,
                                        float: 'right',
                                    }}
                                >
                                    Next ->
                                </Button>
                            </Form>
                        </Formik>
                    </Grid>
                </Grid>
            </DialogContent>
        </>
    );
};

export default NewJobForm;
