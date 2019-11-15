import React, {useEffect, useState} from "react";
import {useStateValue} from "../../state";
import CompanyCard from "./CompanyCard"
import {actions} from "../../state/auth/authActions";
import EditAdminForm from "./EditAdminForm";

const CompanyList = () => {
    const [{auth}, dispatch] = useStateValue();

    useEffect(() => {
        actions.getCompany(dispatch, auth.currentUser.company)
    },[]);
    return (
        <div>{auth.currentCompany && <CompanyCard company={auth.currentCompany}/>}
        <EditAdminForm/>
        </div>
    );
}

export default CompanyList;