import React from 'react';
import { Link } from "react-router-dom";
const ViewAdminUser = (props) => {
    return (
            <div className="col-md-4">
            <div className="card m-4 shadow-sm border-0">
            <div className="card-body">
                <h6 className="card-title strong pb-2">User Name : {props.username}</h6>
                <h6 className="card-subtitle text-muted">Email : {props.email}</h6>
            </div>
            </div>
            </div>
    )
}

export default ViewAdminUser
