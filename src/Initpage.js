import React, { Component } from 'react'
import logo from './assets/images/datouhuahua.jpg';
import logo2 from './assets/images/image3.jpg';
import './App.css';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom"
import sakuraFn from "./utils/sakura"

export default class Initpage extends Component {
  render() {
    return (
      <Router>
        <canvas id="sakura" class="sakura" />
        <div className="initPage">

          <header className="App-header">
            <div className="App-logo">
              <img src={logo2} alt="logo" class="app-photo" />
            </div>
            <p>
              {/* Edit <code>src/App.js</code> and save to reload. */}
              This is my project created on 2021.01.20
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

  componentDidMount() {
    const sakuraDom = document.getElementById("sakura")
    sakuraFn(sakuraDom)
  }
}


