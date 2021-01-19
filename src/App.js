import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from './pages/Home';
import Quote from './pages/Quote';
import Login from './pages/Login';

import PrivateRoute from './components/PrivateRoute';

import './App.css';

function App() {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/">
                    <Home /> 
                </PrivateRoute>
                <PrivateRoute path="/quote">
                    <Quote />
                </PrivateRoute>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="*">
                    <h1 style={{ textAlign: 'center', margin: '50px' }}>PAGE NOT FOUND</h1>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
