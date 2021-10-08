import React, { Component } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import ViewAdminStartup from "./viewadminstartups.component";
import ViewAdminUser from "./viewadminusers.components";
export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      startups : []
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        console.log(response)
        this.setState({
          users: response.data[0],
          startups : response.data[1]
        });
        console.log(this.state.users)
        console.log(this.state.startups)
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <header className="jumbotron mx-4 mt-4">
          <h3>All Users : {this.state.users.length}</h3>
        </header>
        <div className="row">
        {this.state.users.length > 0 ? (
        <>
        {this.state.users.map(user=>(
        <ViewAdminUser key={user.id} id={user.id} username={user.username} email={user.email}></ViewAdminUser>
            )
            )}
        </>
        ): (
            <h4 className="text-center">No Users</h4>
        )}
        </div>
        <header className="jumbotron mx-4 mt-4">
          <h3>All Startups : {this.state.startups.length}</h3>
        </header>
        <div className="row">
        {this.state.startups.length > 0 ? (
        <>
        {this.state.startups.map(startup=>(
        <ViewAdminStartup key={startup.id} id={startup.id} startupname={startup.startupname} startupsummary={startup.startupsummary} startupdesc={startup.startupdesc} startupfunds={startup.startupfunds} fundsraised={startup.fundsraised}></ViewAdminStartup>
            )
            )}
        </>
        ): (
            <h4 className="text-center">No Startups</h4>
        )}
        </div>
      </React.Fragment>
    );
  }
}
