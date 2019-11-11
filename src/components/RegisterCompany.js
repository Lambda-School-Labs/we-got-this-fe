import React, {useState} from "react";


export default function RegisterCompany(props) {
    const [userCredentials, setCredentials] = useState({
        companyName: "",
        fullName: "",
        email: "",
        phone: "",
    });

    const submitHandler = event => {
        event.preventDefault();
    }

    const changeHandler = event => {
        setCredentials({ ...userCredentials, [event.target.name]: event.target.value})
    }

    return(
        <div className="containerCompany">
            <div>
                <div className="cardCompany">
                    <div className="headerCompany">
                        <h1>Register Your Company</h1>
                    </div>
                    <div className="cardCompany-body">
                        <form onSubmit={submitHandler}>
                            <div className="company-input">
                                <input
                                type="text"
                                name="companyName"
                                value={userCredentials.companyName}
                                onChange={changeHandler}
                                placeholder="Company Name"
                                required
                                />
                            </div>
                            <div className="company-input">
                                <input
                                type="text"
                                name="fullName"
                                value={userCredentials.fullName}
                                onChange={changeHandler}
                                placeholder="Full Name"
                                required
                                />
                            </div>

                            <div className="company-input">
                                <input
                                type="email"
                                name="email"
                                value={userCredentials.email}
                                onChange={changeHandler}
                                placeholder="Email"
                                required
                                />
                            </div>

                            <div className="company-input">
                                <input
                                type="text"
                                name="phone"
                                value={userCredentials.phone}
                                onChange={changeHandler}
                                placeholder="Phone Number"
                                required
                                />
                            </div>
                        
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )



}