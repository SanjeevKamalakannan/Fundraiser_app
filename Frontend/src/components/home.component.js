import React, { Component } from "react";

import UserService from "../services/user.service";
import { confirm } from "../components/confirmation";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }
  render() {
    return (
      <div className="container text-center">
        <div className="row">
          <div className="col-md-12">
            <header className="jumbotron">
            {/* <h3>{this.state.content}</h3> */}
            <h3 className="m-50">Startup FundRaiser Application</h3>
            </header>
          </div>
        </div> 
      </div>
      
    );
  }
}
