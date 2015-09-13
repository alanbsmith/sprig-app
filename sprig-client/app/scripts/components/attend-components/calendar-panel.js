import React from 'react/addons';

let CalendarPanel = React.createClass({
  getInitialState() {
    return{selectedDate: '', isOpen: false}
  },
  handleDateClick(date, i) {
    this.props.onDateClick(date);
    this.setState({selectedDate: i})
  },
  handleTimeClick(time) {
    this.props.onTimeClick({time: time});
  },
  render() {
    return (
      <div className='panel panel-default'>
        <a id='calendar-panel' data-toggle='collapse' data-parent='#accordion' href='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>
          <div className='panel-heading' role='tab' id='calendar'>
            <h1 className='panel-title'>Availability</h1>
          </div>
        </a>
        <div id='collapseOne' className='panel-collapse collapse' role='tabpanel' aria-labelledby='calendar'>
          <div className='panel-body'>
            <h6 className='text-muted calendar-heading'>DATES</h6>
            <div className='row' id='date-row'>
            {this.props.availableDates.map(function(date, i) {
              return (
                <AvailableDate date={date} onClick={this.handleDateClick.bind(this, date, i)} key={i} isSelected={this.state.selectedDate === i ? true : false }/>
              );
            }, this)}
            </div>
          <TimeSlots availableTimes={this.props.availableTimes} onClick={this.handleTimeClick}/>
          </div>
        </div>
      </div>
    );
  }
});

let AvailableDate = React.createClass({
  handleClick(i) {
    this.props.onClick({})
  },
  render() {
    let cx = React.addons.classSet;
    let classes = cx({
      'thumbnail': true,
      'dates': true,
      'active': this.props.isSelected
    })
    return(
      <div key={this.props.key} className='col-xs-1'><div onClick={this.handleClick.bind(this, this.props.key)} className={classes}><h5 className='date'>{this.props.date['date']}</h5>{this.props.date.display_day}</div></div>
    )
  }
});

let TimeSlots = React.createClass({
  getInitialState() {
    return{activeTimeSlot: ''}
  },
  handleClick(i) {
    this.props.onClick({time: this.props.availableTimes[i].time_slot});
    this.setState({activeTimeSlot: i})
  },
  render() {
    return (
      <div>
        <h6 className='text-muted calendar-heading'>AVAILABILITY</h6>
        {this.props.availableTimes.map(function(time, i){
          return (
            <TimeSlot time={time} onClick={this.handleClick.bind(this, i)} key={i} isSelected={this.state.activeTimeSlot === i ? true : false }/>
          )
          
        }, this)}
      </div>
    )
  }
});

let TimeSlot = React.createClass({
  handleClick(i) {
    this.props.onClick({})
  },
  render() {
    let cx = React.addons.classSet;
    let classes = cx({
      'thumbnail': true,
      'times': true,
      'active': this.props.isSelected
    })
    return(
      <div className='col-xs-3'><div key={this.props.key} onClick={this.handleClick.bind(this, this.props.key)} className={classes}>{this.props.time.display_time}</div></div>
    )
  }
})

export default CalendarPanel;