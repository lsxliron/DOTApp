import React from 'react'
import DateTimeField from 'react-bootstrap-datetimepicker';
import ReactDOM from 'react-dom';
import TimeStore from '../stores/TimeStore';
import TimeActions from '../actions/TimeActions';
import DateStore from '../stores/DateStore';
import moment from 'moment';

class TimeHandler extends React.Component{
  constructor(props){
    super(props);
    this.state = TimeStore.getState();
    this.onChange = this.onChange.bind(this);
    this.checkTimeDelta = this.checkTimeDelta.bind(this);
  }

  onChange(){
    this.setState(TimeStore.getState());
    this.changeCSSClass();
  }

  componentDidMount(){
    TimeStore.listen(this.onChange);
    this.changeCSSClass();
  }

  componentWillUnmount(){
    TimeStore.unlisten(this.onChange);
  }

  checkTimeDelta(){
    let startTime = this.refs.startTime.state.selectedDate;
    let endTime = this.refs.endTime.state.selectedDate;
  
    TimeActions.checkTimeDelta(startTime, endTime, this.state.sameDay, ReactDOM.findDOMNode(this));
  

  }

  changeCSSClass(){
    let startTime = this.refs.startTime.state.selectedDate;
    let endTime = this.refs.endTime.state.selectedDate;
    let elements = ReactDOM.findDOMNode(this);
    let cssClass;
    let validTime;
    
    if (TimeStore.getState().sameDay)
      if (endTime - startTime < 0)
        validTime = false
      else 
        validTime = true
    else
      validTime = true;

    if (validTime == true)
      cssClass = "has-success";
    else
      cssClass = "has-error";

    $.each(elements.getElementsByClassName('date'), function(i, el) {
      el.classList.remove('has-success');
      el.classList.remove('has-error');
      el.classList.add(cssClass);
    });
  }

  render(){
     return (
      <div>  
        <div className="col-xs-5 col-md-2">
          <label>Start Time:</label>
        </div>
        
        <div className="col-xs-7 col-md-2">
          <DateTimeField onChange={this.checkTimeDelta} mode="time" ref="startTime" inputFormat={this.props.inputFormat} dateTime={this.state.startTime.format('x')} />
        </div>
        
        <div className="col-xs-5 col-md-2">
          <label>End Time:</label>
        </div>
        <div className="col-xs-7 col-md-2">
          <DateTimeField onChange={this.checkTimeDelta} mode="time" ref="endTime" inputFormat={this.props.inputFormat} dateTime={this.state.endTime.format('x')} />
        </div>
      </div>
    );
  }
}


export default TimeHandler;    