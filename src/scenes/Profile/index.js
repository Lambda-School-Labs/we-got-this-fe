import React from 'react';
import { useStateValue } from '../../state';
import CompanyList from "../AdminProfile/CompanyList";


const Me = () => {
    const [{ auth }] = useStateValue();
    return (
    <div><h1>Me is {auth.currentUser && auth.currentUser.displayName} </h1>
    <CompanyList/>
            
            </div>);
};

export default Me;
