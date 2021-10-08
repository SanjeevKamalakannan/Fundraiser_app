import React, { Component } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import ViewArticle from './ViewArticle';
export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startups : []
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          startups: response.data
        });
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
          <h3>Public Startups</h3>
        </header>
        <div className="row">
        {this.state.startups.length > 0 ? (
        <>
        {this.state.startups.map(startup=>(
        <ViewArticle key={startup.id} id={startup.id} startupname={startup.startupname} startupsummary={startup.startupsummary} startupdesc={startup.startupdesc} startupfunds={startup.startupfunds} fundsraised={startup.fundsraised}></ViewArticle>
            ))}
        </>
        ): (
            <h4 className="text-center">No Startups</h4>
        )}
        </div>
      </React.Fragment>
    );
  }
}
