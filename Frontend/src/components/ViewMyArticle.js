import React from 'react';
import { Link } from "react-router-dom";
const ViewMyArticle = (props) => {
    return (
            <div className="col-md-6">
            <div className="card m-3 shadow-sm border-0" style={{minHeight : "340px"}}>
            <div className="card-body">
                <h3 className="card-title strong pb-3 text-uppercase">{props.startupname}</h3>
                <h6 className="card-subtitle mb-4 text-muted">{props.startupsummary}</h6>
                <h6 className="card-text strong">Startup Funds Required : {props.startupfunds}</h6>
                <h6 className="card-text strong">Funds Raised : {props.fundsraised}</h6>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to={`/editstartup/${props.id}`} className="btn btn-dark px-4">Edit</Link>
                </div>
            </div>
            </div>
            </div>
    )
}

export default ViewMyArticle
