import React from 'react/addons';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

let ConfirmPanel = React.createClass({
  handleClick() {
    this.sendData();
    this.props.confirmation()
  },
  sendData() {
    $.ajax({
      url: "",
      type: 'get',
      data: {data:{title: this.props.info.title, description: this.props.info.description, location: this.props.info.location ,time: this.props.time.time}},
      dataType: 'json',
      success: function(data) {
        console.log(data)
      }
    })
  },
  render() {
    return (
      <div className='panel panel-default'>
        <a id='info-panel' data-toggle='collapse' data-parent='#accordion' href='#collapseFour' aria-expanded='true' aria-controls='collapseFour'>
          <div className='panel-heading' role='tab' id='calendar'>
            <h1 className='panel-title'>RSVP!</h1>
          </div>
        </a>
        <div id='collapseFour' className='panel-collapse collapse' role='tabpanel' aria-labelledby='calendar'>
          <div className='panel-body' align='center'>
            <h4>Thanks!</h4>
            <p className='small'>PLEASE CONFIRM THE INFO BELOW IS CORRECT</p>
            <p className='text-muted'>We have you set for {this.props.time} on {this.props.day}, {this.props.month} {this.props.date} at {this.props.info.location}.</p>

            <button id="confirm-btn" onClick={this.handleClick} className="btn btn-block">Confirm?</button>
          </div>
        </div>
      </div>
    )
  }
});

export default ConfirmPanel;
