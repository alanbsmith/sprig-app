import React from 'react/addons';
import InvitePanel from './invite-panel.js';
import CalendarPanel from './calendar-panel.js';
import ConfirmPanel from './confirm-panel.js';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

let PanelGroup = React.createClass({
  getInitialState() {
    return{ date: "__________",
            time: "__________",
            day: "",
            month: "",
            info: { title: "",
                    description: "",
                    location: "",
                    lat: "",
                    long: ""
                  },
            dates: this.getNextWeek(),
            times: [],
            availableDates: [],
            availableTimes: [],
          }
  },
  componentDidMount() {
    $.ajax({
      url: 'http://localhost:3000/api/v1/events/1',
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
          availableDates: data.available_dates,
          availableTimes: data.available_times

                     })
      }.bind(this)
    })
  },
  getNextWeek() {
    let startDate = new Date();
    let dates = [];
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday' ]
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    for(let x = 0; x < 7; x++) {
      let parsedDate = startDate.toDateString().split(' ');
      dates.push({'displayDay': parsedDate[0].toUpperCase(), 'month': months[startDate.getMonth()],'day': days[startDate.getDay()], 'date': startDate.getDate()})
      startDate.setDate(startDate.getDate() + 1)
    }
    return dates
  },
  getTimes() {
    return([  {'timeSlot':'7:00 AM - 8:00 AM', 'displayTime': '7-8 AM'},
              {'timeSlot':'8:00 AM - 9:00 AM', 'displayTime': '8-9 AM'},
              {'timeSlot':'9:00 AM - 10:00 AM', 'displayTime': '9-10 AM'},
              {'timeSlot':'10:00 AM - 11:00 AM', 'displayTime': '10-11 AM'},
              {'timeSlot':'11:00 AM - 12:00 PM', 'displayTime': '11-12 PM'},
              {'timeSlot':'12:00 PM - 1:00 PM', 'displayTime': '12-1 PM'},
              {'timeSlot':'1:00 PM - 2:00 PM', 'displayTime': '1-2 PM'},
              {'timeSlot':'2:00 PM - 3:00 PM', 'displayTime': '2-3 PM'},
              {'timeSlot':'3:00 PM - 4:00 PM', 'displayTime': '3-4 PM'},
              {'timeSlot':'4:00 PM - 5:00 PM', 'displayTime': '4-5 PM'},
              {'timeSlot':'5:00 PM - 6:00 PM', 'displayTime': '5-6 PM'},
              {'timeSlot':'6:00 PM - 7:00 PM', 'displayTime': '6-7 PM'}
          ])
  },
  handleDate(data) {    
    this.setState({date: data.date, day: data.day, month: data.month, times: this.state.availableTimes[this.state.availableDates.indexOf(data)]})

  },
  handleTime(data) {
    this.setState({time: data.time})
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
            <InvitePanel title={this.state.info.title} location={this.state.info.location} description={this.state.info.description}/>
            <CalendarPanel availableDates={this.state.availableDates} availableTimes={this.state.times} onDateClick={this.handleDate} onTimeClick={this.handleTime}/>

            <ConfirmPanel day={this.state.day} month={this.state.month} date={this.state.date} time={this.state.time} info={this.state.info} confirmation={this.handleConfirmation}/>
          </div>
        </ReactCSSTransitionGroup>
    )} else {
      return(false);
    }
  }
});

export default PanelGroup;
