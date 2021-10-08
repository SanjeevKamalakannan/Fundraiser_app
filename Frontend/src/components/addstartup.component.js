import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UserService from "../services/user.service";

export default class AddStartup extends Component {

  constructor(props) {
    super(props);
    this.onChangeStartupName = this.onChangeStartupName.bind(this);
    this.onChangeStartupSummary = this.onChangeStartupSummary.bind(this);
    this.onChangeStartupDesc= this.onChangeStartupDesc.bind(this);
    this.onChangeStartupFunds= this.onChangeStartupFunds.bind(this);
    this.saveStartup = this.saveStartup.bind(this);
    this.newStartup = this.newStartup.bind(this);

    this.state = {
        startupName: "",
        startupSummary: "",
        startupDesc : "",
        startupFunds : 0,
        submitted: false
  };
}

  onChangeStartupName(e) {
    this.setState({
        startupName: e.target.value
    });
  }
  onChangeStartupSummary(e) {
    this.setState({
        startupSummary: e.target.value
    });
  }
  onChangeStartupDesc(e) {
    this.setState({
        startupDesc: e.target.value
    });
  }
  onChangeStartupFunds(e) {
    this.setState({
        startupFunds: e.target.value
    });
  }
  saveStartup() {
    var user = JSON.parse(localStorage.getItem('user'));
    UserService.addstartup(this.state , user.id)
      .then(response => {
        console.log(response.data);
        this.setState({
            submitted: true
        });
      })
      .catch(e => {
        console.log(e);
      });
      this.props.history.push('/profile')
      window.location.reload();
  }

  newStartup() {
    this.setState({
        startupName: "",
        startupSummary: "",
        startupDesc : "",
        startupFunds : 0
    });
  }

  
  render(){
    const { currentStartup } = this.state;
    return (
      <div className="container">
        <header className="jumbotron mt-4">
            <h4>Add Your Startup For Funding</h4>
        </header>
        <Form onSubmit={this.saveStartup}>
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-dark" onClick={this.newStartup}>
                Add
              </button>
            </div>
          ) : (
          <div>
          <div className="form-group">
          <label className="my-2" htmlFor="startupname"><i>Startup Name</i></label>
          <Input
              type="text"
              className="form-control"
              name="startupname"
              value={this.state.startupName}
              onChange={this.onChangeStartupName}
              required
          />
          </div>

          <div className="form-group">
          <label className="my-2" htmlFor="startupsummary"><i>Summary</i></label>
          <textarea
              rows="3"
              type="text"
              className="form-control"
              name="startupsummary"
              value={this.state.startupSummary}
              onChange={this.onChangeStartupSummary}
              required
          />
          </div>
          
          <div className="form-group">
          <label className="my-2" htmlFor="startupdesc"><i>Description</i></label>
          <textarea
              rows="8"
              type="text"
              className="form-control"
              name="startupdesc"
              value={this.state.startupDesc}
              onChange={this.onChangeStartupDesc}
              required
          />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div className="form-group col-3">
            <label className="my-2" htmlFor="startupfunds"><i>Target Funds</i></label>
            <Input
                type="text"
                className="form-control"
                name="startupfunds"
                value={this.state.startupFunds}
                onChange={this.onChangeStartupFunds}
                required
            />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-dark my-4 mx-2" type="submit">Add Your Startup</button>
            <Link to="/profile" className="btn btn-light my-4 mx-2">Cancel</Link>
          </div>
          </div>
      )}
        </Form>
      </div>
    )
  }
}

    
