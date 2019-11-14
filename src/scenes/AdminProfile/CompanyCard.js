import React from "react";

export default function CompanyCard({company}) {
    return (
        <div>
            <h1>Company: {company.company}</h1>
            <h1>First Name: {company.firstName}</h1>
            <h1>Last Name: {company.lastName}</h1>
            <h1>Email: {company.email}</h1>
            <h1>Phone Number: {company.phoneNumber}</h1>
        </div>
    );
}