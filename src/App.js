import './App.css';
import 'antd/dist/antd.css';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom"
import functions from "./functionCode.json"
import Initpage from "./Initpage.js"

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {
            functions.map((item, index) => {
              return <Route key={index} path={item.hashUrl} component={require('./router/' + item.componentPath + '/index').default} exact></Route>
            })
          }
          <Route path="/" component={Initpage} exact></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
