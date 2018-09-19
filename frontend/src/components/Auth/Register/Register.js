import React, {Component} from 'react';
import Navbar from "../../Navbar/Navbar";
import ReactAux from "../../ReactAux/ReactAux";
import connect from "react-redux/es/connect/connect";
import * as actions from "../../../store/actions";
import './Register.css';
import {Redirect, withRouter} from "react-router-dom";
import Spinner from "../../Spinner/Spinner";

class Register extends Component {
    state = {
        name: '',
        username: '',
        email: '',
        password: '',
        nameValidation: true,
        usernameValidation: true,
        emailValidation: true,
        passwordValidation: true
    };

    componentWillUnmount() {
        if (this.props.registerError === true || this.props.registerError === false) {
            this.props.resetRegisterError();
        }
    }

    nameChangeHandler = (event) => {
        this.setState({name: event.target.value});
    };

    usernameChangeHandler = (event) => {
        this.setState({username: event.target.value});
    };

    emailChangeHandler = (event) => {
        this.setState({email: event.target.value});
    };

    passwordChangeHandler = (event) => {
        this.setState({password: event.target.value});
    };

    submitHandler = (event) => {
        event.preventDefault();
        let isFormValid = this.validateFormFields(this.state.name, this.state.username, this.state.email, this.state.password);
        if (isFormValid) {
            this.props.onRegister(this.state.name, this.state.username, this.state.email, this.state.password);
        }
    };

    validateFormFields(name, username, email, password) {
        let isValidName = name.length >= 3;
        if (isValidName) {
            this.setState({nameValidation: true});
        } else {
            this.setState({nameValidation: false});
        }

        let isValidUsername = username.length >= 5;
        if (isValidUsername) {
            this.setState({usernameValidation: true});
        } else {
            this.setState({usernameValidation: false});
        }

        const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        let isValidEmail = emailPattern.test(email);
        if (isValidEmail) {
            this.setState({emailValidation: true});
        } else {
            this.setState({emailValidation: false});
        }

        let isValidPassword = password.length >= 6;
        if (isValidPassword) {
            this.setState({passwordValidation: true});
        } else {
            this.setState({passwordValidation: false});
        }

        return isValidName && isValidUsername && isValidEmail && isValidPassword;
    };

    render() {
        let form = (<div className="row">
            <div className="col-xs-6 col-xs-offset-3 form-wrapper">
                <h3 className="text-center">Register</h3>
                <hr/>
                {this.props.registerError === true ? <h4 className="text-danger text-center">Username or Email is Taken.</h4>: null}
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter name"
                               name="name" value={this.state.name} onChange={this.nameChangeHandler}/>
                        {!this.state.nameValidation ? <p className="text-danger"><b>Name should be at least 3 characters</b></p> : null }
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter username"
                               name="username" value={this.state.username} onChange={this.usernameChangeHandler}/>
                        {!this.state.usernameValidation ? <p className="text-danger"><b>Username should be at least 5 characters</b></p> : null }
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="text" className="form-control" id="email" placeholder="Enter email"
                               name="email" value={this.state.email} onChange={this.emailChangeHandler}/>
                        {!this.state.emailValidation ? <p className="text-danger"><b>Invalid Email</b></p> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter password"
                               name="password" value={this.state.password} onChange={this.passwordChangeHandler}/>
                        {!this.state.passwordValidation ? <p className="text-danger"><b>Password should be at least 6 characters</b></p> : null }
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success">Register</button>
                    </div>
                    <br/>
                </form>
            </div>
        </div>);

        if (this.props.loading) {
            form = <Spinner />
        }

        let authRedirect = null;
        if (this.props.registerError === false) {
            authRedirect = <Redirect to="/login"/>
        }

        return (
            <ReactAux>
                <Navbar/>
                <div className="container">
                    {authRedirect}
                    {form}
                </div>
            </ReactAux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.accessToken !== null,
        registerError: state.registerError,
        loading: state.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (name, username, email, password) => dispatch(actions.register(name, username, email, password)),
        resetRegisterError: () => dispatch(actions.resetRegisterError()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));