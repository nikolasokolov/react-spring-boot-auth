import React, { Component } from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import * as actions from '../../store/actions/index';

class Navbar extends Component {
    logoutHandler = () => {
        this.props.onLogout();
        this.props.history.replace("/");
    };

    render() {
        let user = <a><i className="fas fa-user"></i> Welcome {localStorage.getItem("loggedUser")}</a>;
        let login = <NavLink to="/login" exact><i className="fas fa-sign-in-alt"></i> Login</NavLink>;
        let logout = null;
        let register = <NavLink to="/register" exact><i className="fas fa-user-plus"></i> Register</NavLink>;
        if (this.props.isAuthenticated) {
            login = null;
            register = null;
            logout = <a style={{cursor: 'pointer'}} onClick={this.logoutHandler}><i className="fas fa-sign-out-alt"></i> Logout</a>;
        } else {
            user = null;
            logout = null;
            register = <NavLink to="/register" exact><i className="fas fa-user-plus"></i> Register</NavLink>;
            login = <NavLink to="/login" exact><i className="fas fa-sign-in-alt"></i> Login</NavLink>;
        }

        return (
            <div className="App">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <ul className="nav navbar-nav navbar-left">
                                <li><NavLink to="/" className="navbar-brand">Home</NavLink></li>
                            </ul>
                        </div>
                        <div>
                            <ul className="nav navbar-nav navbar-right">
                                <li>{user}</li>
                                <li>{logout}</li>
                                <li>{login}</li>
                                <li>{register}</li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.accessToken,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
        displayLoggedUser: () => dispatch(actions.displayLoggedUser()),
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
