import React from 'react/addons';

let InvitePanel = React.createClass({
  render() {
    return (
      <div className='panel panel-default'>
        <a id='invite-panel' data-toggle='collapse' data-parent='#accordion' href='#collapseThree' aria-expanded='true' aria-controls='collapseThree'>
          <div className='panel-heading' role='tab' id='invite'>
            <h1 className='panel-title'>Your Invitation</h1>
          </div>
        </a>
        <div id='collapseThree' className='panel-collapse collapse in' role='tabpanel' aria-labelledby='calendar'>
          <div className='panel-body'>
            <h5>You are invited to:</h5>
            <h3>{this.props.title}</h3>
            <a id='map-link' href={"https://www.google.com/maps/place/" + this.props.location } target='_blank'>{this.props.location}</a>
            <p className='small'>DETAILS:</p>
            <p>{this.props.description}</p>
          </div>
        </div>
      </div>
    )
  }
});

export default InvitePanel;