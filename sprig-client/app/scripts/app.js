import React from 'react/addons';
import Router from 'react-router';
import { Route, Link, RouteHandler, DefaultRoute } from 'react-router';
import Uri from 'jsuri';

import About from './components/about';
import CreateEvent from './components/create-event';
import Event from './components/event';
import Greeting from "./greeting";

let App = React.createClass({
  getInitialState() {
    return{signedIn: false, currentUser: {handle: ''}};
  },
  componentWillMount() {
    var jwt = new Uri(location.search).getQueryParamValue('jwt');
    if (!!jwt) {sessionStorage.setItem('jwt', jwt);}
  },
  componentDidMount() {
    if (!!sessionStorage.getItem('jwt')) {this.currentUserFromAPI();}
  },
  currentUserFromAPI() {
    this.readFromAPI('http://127.0.0.1:3000/current_user', function(user) {
      this.setState({signedIn: true, currentUser: user});
    }.bind(this));
  },
  getDefaultProps() {
    return {origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''};
  },
  readFromAPI(url, successFunction) {
    $.ajax({
      url: url,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      headers: {'Authorization': sessionStorage.getItem('jwt')},
      success: successFunction,
      error: function(error) {
        console.error(url, error['response']);
        location = '/#/';
      }
    });
  },
  render() {
    return (
      <div>
        <div className='container'>
          <TitlePanel/>
        </div>
        <Sidebar signedIn={this.state.signedIn} />
        <RouteHandler currentUser={this.state.currentUser} signedIn={this.state.signedIn}/>
      </div>
    )
  }
});

let Sidebar = React.createClass({
  handleSignOutLink() {
    sessionStorage.setItem('jwt','');
    location = '/';
  },
  render() {
    if (this.props.signedIn) {
      var authLink = <li><a onClick={this.handleSignOutLink}>Sign Out</a></li>;
    } else {
      var authLink = <li><a href={"http://127.0.0.1:3000/request_token"}>Sign In</a></li>;
    }
    return (
      <div>
        <div id="slideout">
          <a href="#" className='navbar-brand'></a>
          <button id='slider-btn' className="btn btn-lg btn-default  icon-large glyphicon glyphicon-align-justify" type="button"></button>
          <div id="slideout-inner">
            <div className="sidenav">
              <ul className='nav nav-sidebar'>
                <li><Link to='app'>Home</Link></li>
                <li><Link to="about">About</Link></li>
                {authLink}
              </ul>
            </div>
          </div>   
        </div>
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
    <DefaultRoute name="create-event" path='/events/create' handler={CreateEvent}/>
    <Route name="about" path='/about' handler={About}/>
    <Route name="event" path='/events/:id' handler={Event}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);
});



