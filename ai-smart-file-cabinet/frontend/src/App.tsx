import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
  <Route path="/" exact component={Dashboard} />
  <Route path="/onboarding" exact component={Onboarding} />
      </Switch>
    </Router>
  );
};

export default App;