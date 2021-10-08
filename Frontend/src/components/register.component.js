import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { register } from "../actions/auth";
import { Link } from "react-router-dom";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 6 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      usernameValid : false,
      emailValid : false,
      passwordValid : false,
      successful: false,
      submitDisabled : true
    };
  }

  onChangeUsername(e) {
    let usernameValid = e.target.value.length>6 ? true : false; 
    let submitValid = this.state.passwordValid && this.state.emailValid && usernameValid 
    this.setState({
      username: e.target.value,
      usernameValid: usernameValid, 
      submitDisabled: !submitValid
    });
  }

  onChangeEmail(e) {
    let emailValid = e.target.value ? true : false; 
    let submitValid = this.state.usernameValid && this.state.passwordValid && emailValid 
    this.setState({
      email: e.target.value,
      emailValid: emailValid, 
      submitDisabled: !submitValid
    });
  }

  onChangePassword(e) {
    let passwordValid = e.target.value.length>6 ? true : false; 
    let submitValid = this.state.emailValid && this.state.usernameValid && passwordValid 
    this.setState({
      password: e.target.value,
      passwordValid: passwordValid, 
      submitDisabled: !submitValid
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props.dispatch(register(this.state.username, this.state.email, this.state.password))
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .then(()=>{
          this.props.history.push('/login')
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  render() {
    const { message } = this.props;
    return (
      <div className="col-md-12">
        <div className="card card-container shadow-sm border-0">
          <img
            src = "https://www.shareicon.net/data/128x128/2016/08/05/806962_user_512x512.png"
            //src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'center' , padding : '5px'}}>
                    <button className="btn btn-dark btn-block my-3 mx-2" disabled={this.state.submitDisabled}>Sign Up</button>
                    <Link to="/login" className="btn btn-outline-dark my-3 mx-2">Login</Link>
                  </div>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);
