import React, {Component} from 'react';
import ReactAux from "../../ReactAux/ReactAux";
import Navbar from "../../Navbar/Navbar";
import * as actions from '../../../store/actions/index';
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import './Login.css';
import Spinner from "../../Spinner/Spinner";

class Login extends Component {
    state = {
        usernameOrEmail: '',
        password: '',
        usernameOrEmailValidation: true,
        passwordValidation: true
    };

    componentWillUnmount() {
        if (this.props.loginError === true || this.props.loginError === false)
        this.props.resetLoginError();
    }

    usernameOrEmailChangeHandler = (event) => {
        this.setState({usernameOrEmail: event.target.value});
    };

    passwordChangeHandler = (event) => {
        this.setState({password: event.target.value});
    };

    submitHandler = (event) => {
        event.preventDefault();
        if (this.validateFormFields(this.state.usernameOrEmail, this.state.password)) {
            this.props.onAuth(this.state.usernameOrEmail, this.state.password);
        }
    };

    validateFormFields(usernameOrEmail, password) {
        let isValidUsernameOrEmail = usernameOrEmail.length >= 5;
        if (isValidUsernameOrEmail) {
            this.setState({usernameOrEmailValidation: true});
        } else {
            this.setState({usernameOrEmailValidation: false});
        }

        let isValidPassword = password.length >= 6;
        if (isValidPassword) {
            this.setState({passwordValidation: true});
        } else {
            this.setState({passwordValidation: false});
        }

        return isValidUsernameOrEmail && isValidPassword;
    };

    render() {
        let form = (<div className="row">
            <div className="col-xs-6 col-xs-offset-3 form-wrapper">
                <h3 className="text-center">Login</h3>
                <hr/>
                {this.props.loginError === true ? <h4 className="text-danger text-center">Incorrect Credentials. Try Again!</h4> : null}
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor="usernameOrEmail">Username:</label>
                        <input type="text" required className="form-control" id="usernameOrEmail" placeholder="Enter username"
                               name="usernameOrEmail" value={this.state.usernameOrEmail} onChange={this.usernameOrEmailChangeHandler}/>
                        {!this.state.usernameOrEmailValidation ? <p className="text-danger"><b>Field should be at least 5 characters</b></p> : null }
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" required className="form-control" id="password" placeholder="Enter password"
                               name="password"  value={this.state.password} onChange={this.passwordChangeHandler}/>
                        {!this.state.passwordValidation ? <p className="text-danger"><b>Password should be at least 6 characters</b></p> : null }
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success">Login</button>
                    </div>
                    <br/>
                </form>
            </div>
        </div>);

        if (this.props.loading) {
            form = <Spinner />
        }

        let authRedirect = null;
        if (this.props.accessToken !== null) {
            authRedirect = <Redirect to="/"/>
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
        accessToken: state.accessToken,
        loginError: state.loginError,
        loading: state.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        resetLoginError: () => dispatch(actions.resetLoginError())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));