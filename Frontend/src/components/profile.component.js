import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import ViewMyArticle from "../components/ViewMyArticle"
import {Link } from "react-router-dom";
class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startups : []
    };
  }

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    UserService.getUserStartups(user.id).then(
      response => {
        console.log(response.data.startups)
        this.setState({
          startups: response.data.startups
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
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
        <React.Fragment>
          
           {/*<p>
            <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
          </p>
          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>  */}
          { currentUser.roles[0] == "ROLE_ADMIN" && 
            <div className="container ">
            <h2>You are the admin</h2>
            <h5 className="mx-4 mt-4">
              <strong>{currentUser.username}</strong> Profile
            </h5>
            <p className="mx-4">
              <strong>Email:</strong> {currentUser.email}
            </p>
            </div>
          }
          { currentUser.roles[0] == "ROLE_USER" && 
            <div className="container ">
            <h5 className="mx-4 mt-4">
              <strong>{currentUser.username}</strong> Profile
            </h5>
            <p className="mx-4">
              <strong>Email:</strong> {currentUser.email}
            </p>
            <header className="jumbotron mx-4 mt-4">
              <h4>Your Startups</h4>
            </header>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to={"/add"} className="btn btn-dark m-2 px-4">
                    Add Your Startup
              </Link>
            </div>
            <div className="row">
            {this.state.startups.length > 0 ? (
            <>
            {this.state.startups.map(startup=>(
            <ViewMyArticle key={startup.id} id={startup.id} startupname={startup.startupname} startupsummary={startup.startupsummary} startupdesc={startup.startupdesc} startupfunds={startup.startupfunds} fundsraised={startup.fundsraised}></ViewMyArticle>
                ))}
            </>
            ): (
                <h4 className="text-center my-4">You Have No Startups</h4>
            )}
            </div>
            </div>
            
          }

          
        </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
