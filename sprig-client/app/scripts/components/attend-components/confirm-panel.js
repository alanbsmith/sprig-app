import React from 'react/addons';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

let ConfirmPanel = React.createClass({
  handleClick() {
    this.sendData();
    this.props.confirmation()
  },
  sendData() {
    let date = this.props.selectedDate;
    let time = this.props.selectedTime;
    $.ajax({
      url: "http://localhost:3000/api/v1/events/update",
      type: 'put',
      data: {event_id: date.event_id, selected_date: date, selected_time: time},
      dataType: 'json',
      success: function(data) {
        console.log(data)
      }
    })
  },
  render() {
    console.log(this.props.selectedDate)
    console.log(this.props.selectedTime)
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
            <p>We have you set for {this.props.time} on {this.props.day}, {this.props.month} {this.props.date} at <a id='map-link' href={"https://www.google.com/maps/place/" + this.props.info.location } target='_blank'>{this.props.info.location}</a>.</p>
            <button id="confirm-btn" onClick={this.handleClick} className="btn btn-block">Confirm?</button>
          </div>
        </div>
      </div>
    )
  }
});

export default ConfirmPanel;
