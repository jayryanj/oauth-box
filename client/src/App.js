import './App.css';
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Intro from "./pages/Intro";
import Simulation from './pages/Simulation';
import Confirmation from './components/Confirmation';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/simulation" component={Simulation} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/login/authenticated" component={Confirmation} />
          <Route exact path="/about/intro" component={Intro} />
        </Router>
      </div>
    );
  }
}

export default App;
