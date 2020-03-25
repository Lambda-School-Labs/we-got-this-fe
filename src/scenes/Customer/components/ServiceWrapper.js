import React, { useState, useEffect } from 'react';
import ServiceTable from './ServiceTable';
import { useStateValue } from '../../../state';
import { actions } from '../../../state/customer/customerActions';
import { withRouter } from 'react-router-dom';

const ServiceWrapper = ({ jobPaths, customer, location, match }) => {
    const [loading, setLoading] = useState(true);
    const [{ customers }, dispatch] = useStateValue();

    useEffect(() => {
        console.log('Getting customer Jobs');
        actions.getCustomerJobs(dispatch, jobPaths).then(res => {
            console.log('Resolution', res);
            if (res === true) {
                setLoading(false);
            }
        });
    }, [location.pathname, dispatch, jobPaths]);

    let renderServices = () => {
        if (loading) {
            return <h2>Loading...</h2>;
        } else if (
            !customers.customerJobs ||
            customers.customerJobs.length == 0
        ) {
            return <h2>No Services Performed</h2>;
        } else {
            return (
                <ServiceTable 
                    jobs={customers.customerJobs}
                    match={match}
                    location={location}
                />
            );
        }
    };
    return (
        <div>
            <h2>Service History</h2>
            {renderServices()}
        </div>
    );
};

export default withRouter(ServiceWrapper);
