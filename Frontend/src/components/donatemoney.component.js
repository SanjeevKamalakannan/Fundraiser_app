import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UserService from "../services/user.service";

export default class Donatemoney extends Component {

  constructor(props) {
    super(props);
    this.onChangeStartupName = this.onChangeStartupName.bind(this);
    this.onChangeStartupSummary = this.onChangeStartupSummary.bind(this);
    this.onChangeStartupDesc= this.onChangeStartupDesc.bind(this);
    this.onChangeAddFunds= this.onChangeAddFunds.bind(this);
    this.getStartup = this.getStartup.bind(this);
    this.updateStartup = this.updateStartup.bind(this);

    this.state = {
      currentStartup: {
        startupId: null,
        startupName: "",
        startupSummary: "",
        startupDesc : "",
        startupFunds : 0,
        fundsRaised : 0,
        yourfund : 0
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
  onChangeAddFunds(e) {
    const yourfund = e.target.value;
    this.setState(function(prevState) {
      return {
        currentStartup: {
          ...prevState.currentStartup,
          yourfund:yourfund
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

  updateStartup() {
    console.log("inside update startup")
    console.log(this.state.currentStartup.yourfund)
    UserService.update(
      this.state.currentStartup.startupId,
      this.state.currentStartup,
      this.state.currentStartup.yourfund
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "You Invested Successfully" 
        });
      })
      .catch(e => {
        console.log(e);
      });
      this.props.history.push('/user')
      window.location.reload();
  }
  render(){
    const { currentStartup } = this.state;
    return (
      <div className="row">
        <header className="jumbotron mt-4">
          <h3>Invest Funds</h3>
        </header>
        <div className="col-12">
        <Form onSubmit={this.updateStartup}>
          <div className="row">
            <div className="col-6">
            <div className="form-group">
            <label className="my-2" htmlFor="startupname"><i>Startup Name</i></label>
            <Input
                type="text"
                className="form-control"
                name="startupname"
                value={currentStartup.startupName}
                onChange={this.onChangeStartupName}
                required
                disabled
            />
            </div>
            </div>

            <div className="col-6">
            <div className="form-group">
            <label className="my-2" htmlFor="startupfunds"><i>Target Funds</i></label>
            <Input
                type="text"
                className="form-control"
                name="startupfunds"
                value={currentStartup.startupFunds}
                disabled
            />
            </div>
            
            </div>
          </div>
          <div className="form-group">
            <label className="my-2" htmlFor="startupsummary"><i>Summary</i></label>
            <Input
                type="text"
                className="form-control"
                name="startupsummary"
                value={currentStartup.startupSummary}
                onChange={this.onChangeStartupSummary}
                required
                disabled
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
              disabled
          />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div className="form-group col-3">
            <label className="my-2" htmlFor="fundsraised"><i>Funds Raised</i></label>
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
            <label className="my-2" htmlFor="addfunds"><i>Your Investment</i></label>
            <Input
                type="number"
                className="form-control"
                name="addfunds"
                value={currentStartup.yourfund}
                onChange={this.onChangeAddFunds}
                required
            />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-dark my-4 mx-2" type="submit">Invest Funds</button>
            <Link to="/user" className="btn btn-light my-4 mx-2">Cancel</Link>
          </div>
        </Form>
        </div>
      </div>
      
    )
  }
}

    
