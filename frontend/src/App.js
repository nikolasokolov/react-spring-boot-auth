import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Navbar from "./components/Navbar/Navbar";



class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/" exact component={Navbar} />
            </div>
        </BrowserRouter>
    );
  }
}

export default withRouter(App);
