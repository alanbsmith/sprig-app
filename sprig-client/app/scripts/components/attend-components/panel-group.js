import React from 'react/addons';
import InvitePanel from './invite-panel.js';
import CalendarPanel from './calendar-panel.js';
import ConfirmPanel from './confirm-panel.js';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

let PanelGroup = React.createClass({
  getInitialState() {
    return{ displayDay: '',
            displayTime: '',
            month: '',
            date: '',
            info: { title: '',
                    description: '',
                    location: '',
                    lat: '',
                    long: ''
                  },
            selectedTime: {},
            selectedDate: {},
            availableDates: [],
          }
  },
  componentDidMount() {
    $.ajax({
      url: 'http://localhost:3000/api/v1/events/' + this.props.eventID,
      dataType: 'json',
      type: 'get',
      success: function(data) {
        this.setState({
          info: {
            title:       data['event']['title'],
            description: data['event']['description'],
            location:    data['event']['location'],
            lat:         data['event']['latitude'],
            long:        data['event']['longitude'],
          },
          availableDates: this.getAvailableDates(data),

        })
      }.bind(this)
    })
  },
  getAvailableDates(data) {
    let availableDates = [];
    for(let i = 0; i < data.available_dates.length; i ++) {
      if(data.available_times[i].length > 0){
        data.available_dates[i].available_times = data.available_times[i];
        availableDates.push(data.available_dates[i]);
      }
    }
    return availableDates;
  },
  handleDate(date) {
    this.setState({
      selectedDate: date,
      displayDay:    date.day,
      month:        date.month,
      date:         date.date
    })
  },
  handleTime(time) {
    this.setState({
      selectedTime: time,
      displayTime: time.time_slot
    })
  },
  handleInfo(data) {
    this.setState({ info: { title: data.title, description: data.description, location: data.location }})
  },
  handleConfirmation() {
    this.props.confirmation()
  },
  render() {
    if(this.props.display === true) {
      return(
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true}>
          <div className='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>
            <InvitePanel 
              title={this.state.info.title}
              location={this.state.info.location}
              description={this.state.info.description} />
            <CalendarPanel 
              availableDates={this.state.availableDates}
              onDateClick={this.handleDate}
              onTimeClick={this.handleTime} />
            <ConfirmPanel 
              day={this.state.displayDay}
              month={this.state.month}
              date={this.state.date}
              time={this.state.displayTime}
              info={this.state.info}
              selectedDate={this.state.selectedDate}
              selectedTime={this.state.selectedTime}
              confirmation={this.handleConfirmation} />
          </div>
        </ReactCSSTransitionGroup>
    )} else {
      return(false);
    }
  }
});

export default PanelGroup;
