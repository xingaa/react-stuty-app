import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom"
import Home from "./router/Home"
import MyForm from "./router/MyForm"
import MyTable from "./router/MyTable"
import DeepCopy from "./router/DeepCopy"
import Fireworks from "./router/Fireworks"
import ScrollBar from "./router/ScrollBar"
import Echarts from "./router/Echarts"
import LazyLoad from "./router/LazyLoad"
import Initpage from "./Initpage.js"

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home" component={Home} exact></Route>
          <Route path="/myForm" component={MyForm} exact></Route>
          <Route path="/fireworks" component={Fireworks} exact></Route>
          <Route path="/myTable" component={MyTable} exact></Route>
          <Route path="/deepCopy" component={DeepCopy} exact></Route>
          <Route path="/scrollBar" component={ScrollBar} exact></Route>
          <Route path="/echarts" component={Echarts} exact></Route>
          <Route path="/lazyLoad" component={LazyLoad} exact></Route>
          <Route path="/" component={Initpage} exact></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
