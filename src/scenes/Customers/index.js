import React, { useState, useEffect } from 'react';
import { Toolbar, Tooltip, IconButton } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import CustomerTable from './components/Table';
import { useStateValue } from '../../state';
import { actions } from '../../state/customer/customerActions';
import NewCustomer from '../../components/dialogs/NewCustomer';

const Customers = () => {
    const [loading, setLoading] = useState(true);
    const [{ customers }, dispatch] = useStateValue();

    useEffect(() => {
        //Check if the customers in State is there
        if (customers.customers.length == 0) {
            console.log('asking for customers');
            actions.getCustomers(dispatch).then(res => {
                if (res) setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [customers.customers.length, dispatch]);

    return (
        <div>
            {/* BS Styling the puts the title 
            and button in a row... needs to be it's own component */}
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h1>Customers</h1>
                <Tooltip title="Filter">
                    <IconButton onClick={() => alert('Clicked')}>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>{' '}
                <NewCustomer />
            </div>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <CustomerTable customers={customers.customers} />
            )}
        </div>
    );
};

export default Customers;
