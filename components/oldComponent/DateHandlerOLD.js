import React from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';
import DateStore from '../stores/DateStore';
import DateActions from '../actions/DateActions';
import TimeActions from '../actions/TimeActions'
class DateHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = DateStore.getState();
    
    this.onChange = this.onChange.bind(this);
    this.setValidDateRange = this.setValidDateRange.bind(this);
  }

  componentDidMount(){
    DateStore.listen(this.onChange);
  }

  componentWillUnmount(){
    DateStore.unlisten(this.onChange);
  }

  onChange(){
    this.setState(DateStore.getState());
  }

  
  setValidDateRange(){
    let startDate = this.refs.startDate.state.selectedDate;
    let endDate = this.refs.endDate.state.selectedDate; 
    DateActions.setValidDateRange(startDate, endDate);
  }

  render() {
    return (
      <div>
        <div className="col-xs-5 col-md-2">
          <label>Start Date:</label>
        </div>
        <div className="col-xs-7 col-md-2">
          <div className="input-group date">
            <DateTimeField ref="startDate" onChange={this.setValidDateRange}  inputFormat="MM-DD-YYYY" mode="date" minDate={moment('01-01-1900', 'MM-DD-YYYY')} maxDate={this.state.endDate} dateTime={this.state.startDate.format('x')}/>
          </div>
        </div>
        <div className="col-xs-5 col-md-2">
          <label>End Date:</label>
        </div>
        <div className="col-xs-7 col-md-2">
          <DateTimeField ref="endDate" onChange={this.setValidDateRange} inputFormat="MM-DD-YYYY" mode="date" minDate={this.state.startDate}  dateTime={this.state.endDate.format('x')}/>
        </div>
      </div>
    );
  }
}

export default DateHandler;