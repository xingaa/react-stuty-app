import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import {HashRouter as Router,Route,Link, Switch} from "react-router-dom"


export default class Initpage extends Component {
  render() {
    return (
      <Router>
        <div className="initPage">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            
              <Link
                className="App-link"
                // href="https://reactjs.org"
                // target="_blank"
                // rel="noopener noreferrer"
                to="/home"
              >
                入口
              </Link>
          </header>
        </div>
    </Router>
    )
  }
}


