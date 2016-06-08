import React from 'react';
import {render} from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import App from './components/App';
import MapsApp from './components/MapsApp'
// ReactDOM.render(<App />, document.getElementById('app'));

render((
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="maps" component={MapsApp} />
  </Router>
  ), document.getElementById('app'))
