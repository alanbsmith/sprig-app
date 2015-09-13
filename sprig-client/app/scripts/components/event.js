import React from 'react/addons';
import PanelGroup from './attend-components/panel-group';
import CalendarPanel from './attend-components/calendar-panel';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

// This component is structured as displayed below:
// 
//  - AttendEvent
//    - CompleteButton
//    - PanelGroup
//      - InvitePanel
//      - CalendarPanel
//      - ConfirmPanel
//    

let Event = React.createClass({
  getInitialState() {
    return{renderCompleteButton: false};
  },
    togglePanel(data) {
    this.setState({renderCompleteButton: !this.state.renderCompleteButton});
  },
  render() {
    return (
      <div>
        <div className='container'>
          <CompleteButton display={this.state.renderCompleteButton} onClick={this.togglePanel}/>
          <PanelGroup eventID={this.props.params.id} display={!this.state.renderCompleteButton} confirmation={this.togglePanel}/>
        </div>
      </div>
    )
  }
});

let CompleteButton = React.createClass({
  handleClick(event) {
    this.props.onClick({display: !this.props.display});
  },
  render() {
    if (this.props.display === true) {
      return (
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true}>
          <div className='container'>
            <button id='btn-complete' className='btn' onClick={this.handleClick}></button>
          </div>
        </ReactCSSTransitionGroup>
      )
    } else {
      return (false);
    }
  }
})

export default Event;
