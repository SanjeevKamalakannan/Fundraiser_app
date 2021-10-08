import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UserService from "../services/user.service";

export default class EditStartup extends Component {

  constructor(props) {
    super(props);
    this.onChangeStartupName = this.onChangeStartupName.bind(this);
    this.onChangeStartupSummary = this.onChangeStartupSummary.bind(this);
    this.onChangeStartupDesc= this.onChangeStartupDesc.bind(this);
    this.onChangeStartupFunds= this.onChangeStartupFunds.bind(this);
    this.getStartup = this.getStartup.bind(this);
    this.updateStartupDetails = this.updateStartupDetails.bind(this);

    this.state = {
      currentStartup: {
        startupId: null,
        startupName: "",
        startupSummary: "",
        startupDesc : "",
        startupFunds : 0,
        fundsRaised : 0
      },
      message: ""
    };
  }
  componentDidMount() {
    this.getStartup(this.props.match.params.id);
  }

  onChangeStartupName(e) {
    const startupName = e.target.value;

    this.setState(function(prevState) {
      return {
        currentStartup: {
          ...prevState.currentStartup,
          startupName: startupName
        }
      };
    });
  }
  onChangeStartupSummary(e) {
    const startupSummary = e.target.value;

    this.setState(function(prevState) {
      return {
        currentStartup: {
          ...prevState.currentStartup,
          startupSummary: startupSummary
        }
      };
    });
  }
  onChangeStartupDesc(e) {
    const startupDesc = e.target.value;

    this.setState(function(prevState) {
      return {
        currentStartup: {
          ...prevState.currentStartup,
          startupDesc: startupDesc
        }
      };
    });
  }
  onChangeStartupFunds(e) {
    const startupFunds = e.target.value;
    this.setState(function(prevState) {
      return {
        currentStartup: {
          ...prevState.currentStartup,
          startupFunds:startupFunds
        }
      };
    });
  }
  
  getStartup(id) {
    UserService.fetchStartup(id)
      .then(response => {
        this.setState({
          currentStartup : response.data
        });
        console.log(response.data);
        console.log(this.state.currentStartup)
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateStartupDetails() {
    console.log("inside update startup")
    console.log(this.state.currentStartup.yourfund)
    UserService.editstartup(
      this.state.currentStartup.startupId,
      this.state.currentStartup
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "You Edited Successfully" 
        });
      })
      .catch(e => {
        console.log(e);
      });
      this.props.history.push('/profile')
      window.location.reload();
  }
  render(){
    const { currentStartup } = this.state;
    return (
      <div className="container">
        <header className="jumbotron mt-4 mb-4">
            <h4>Edit Your Startup</h4>
        </header>
        <Form onSubmit={this.updateStartupDetails}>
          <div className="form-group">
          <label className="my-2" htmlFor="startupname"><i>Startup Name</i></label>
          <Input
              type="text"
              className="form-control"
              name="startupname"
              value={currentStartup.startupName}
              onChange={this.onChangeStartupName}
              required
          />
          </div>

          <div className="form-group">
          <label className="my-2"htmlFor="startupsummary"><i>Summary</i></label>
          <Input
              type="text"
              className="form-control"
              name="startupsummary"
              value={currentStartup.startupSummary}
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
              value={currentStartup.startupDesc}
              onChange={this.onChangeStartupDesc}
              required
          />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div className="form-group col-3">
          <label className="my-3" htmlFor="fundsraised"><i>Funds Raised</i></label>
          <Input
              type="text"
              className="form-control"
              name="fundsraised"
              value={currentStartup.fundsRaised}
              disabled
          />
          </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div className="form-group col-3">
            <label className="my-3" htmlFor="startupfunds"><i>Target Funds</i></label>
            <Input
                type="text"
                className="form-control"
                name="startupfunds"
                value={currentStartup.startupFunds}
                onChange={this.onChangeStartupFunds}
                required
            />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-dark my-4 mx-2" type="submit">Edit Your Startup</button>
          <Link to="/profile" className="btn btn-light my-4 mx-2">Cancel</Link>
          </div>
        </Form>
      </div>
    )
  }
}

    
