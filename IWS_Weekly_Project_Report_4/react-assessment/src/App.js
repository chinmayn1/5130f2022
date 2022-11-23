import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Paths from "./routes/Path";

import AppRoute from "./routes/AppRoute";

function App() {
  return (
    <div className="p-1">
      <Router>
        <Switch>
          {
            Paths.map((element, index) => <AppRoute key={index} path={element.path} component={element.component} exact={element.isExact} isRestricted={element.isRestricted} redirectTo={element.redirectTo} />)
          }
        </Switch>
      </Router>
    </div >
  );
}

export default App;
