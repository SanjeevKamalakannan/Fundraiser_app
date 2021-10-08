import React from 'react';
import { Link } from "react-router-dom";
const ViewAdminStartup = (props) => {
    return (
            <div className="col-md-6">
            <div className="card m-4 shadow-sm border-0" style={{minHeight : "340px"}}>
            <div className="card-body">
                <h3 className="card-title strong pb-3 text-uppercase">{props.startupname}</h3>
                <h6 className="card-subtitle mb-4 text-muted">{props.startupsummary}</h6>
                <h6 className="card-text strong">Startup Funds Required : {props.startupfunds}</h6>
                <h6 className="card-text strong">Funds Raised : {props.fundsraised}</h6>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to={`/deletestartup/${props.id}`} className="btn btn-dark mt-2 px-4">Delete</Link>
                </div>
            </div>
            </div>
            </div>
    )
}

export default ViewAdminStartup
