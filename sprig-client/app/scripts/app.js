import React from 'react/addons';
import Router from 'react-router';
import { Route, Link, RouteHandler, DefaultRoute } from 'react-router';

import About from './components/about';
import CreateEvent from './components/create-event';
import Event from './components/event';
import Greeting from "./greeting";

let App = React.createClass({
  getInitialState() {
    return{renderStartButton: true, renderPanelGroup: false};
  },
  togglePanel(data) {
    this.setState({renderStartButton: data.display});
    this.setState({renderPanelGroup: data.start});
  },
  render() {
    return (
      <div>
        <div className='container'>
          <TitlePanel/>
        </div>
        <Sidebar/>
      </div>
    )
  }
});

let Sidebar = React.createClass({
  render() {
    return (
      <div>
        <div id="slideout">
          <a href="#" className='navbar-brand'></a>
          <button id='slider-btn' className="btn btn-lg btn-default  icon-large glyphicon glyphicon-align-justify" type="button"></button>
          <div id="slideout-inner">
            <div className="sidenav">
              <ul className='nav nav-sidebar'>
                <li><Link to='app'>Home</Link></li>
                <li><Link to="create-event">Create an Event</Link></li>
                <li><Link to="about">About</Link></li>
                <li><a href="http://127.0.0.1:3000/request_token">Sign In</a></li>
                <li><a target='blank' href="https://github.com/alanbsmith/sprig-react">View The Repo</a></li>
                <li><a target='blank' href="http://facebook.github.io/react/">Learn React</a></li>
                <li><a target='blank' href="https://twitter.com/_alanbsmith">Twitter</a></li>
              </ul>
            </div>
          </div>   
        </div>
        <RouteHandler/>
      </div>
    )
  }
});

let TitlePanel = React.createClass({
  render() {
    return (
      <div>
        <h1 id="logo">Sprig <img id="sprig" src="./app/images/leaf.png"/></h1>
        <p className='text-muted'>really easy scheduling</p>
      </div>
    )
  }
});

let routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="create-event" path='/events/create' handler={CreateEvent}/>
    <Route name="event" path='/events/:id' handler={Event}/>
    <Route name="about" path='/about' handler={About}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body);
});



