import React, {useEffect, useState} from "react";
import {useStateValue} from "../../state";
import CompanyCard from "./CompanyCard"
import {actions} from "../../state/auth/authActions";

const CompanyList = (values) => {
    const [{auth}, dispatch] = useStateValue();

    useEffect(() => {
        actions.getCompany(dispatch, auth.currentUser.company)
    },[]);
    return (
        <div>{auth.currentCompany && <CompanyCard company={auth.currentCompany}/>}
        </div>
    );
}

export default CompanyList;