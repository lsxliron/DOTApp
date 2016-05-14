import alt from '../alt-application';
import moment from 'moment';
import DateActions from '../actions/DateActions';

class DateStore{
  constructor(){
    this.bindActions(DateActions);
    this.sameDay = true;
    this.endDateMin = moment('01-01-1900', 'MM-DD-YYYY');
    this.endDate = moment()
    this.endDateStr = moment().format('MM-DD-YYYY');
    this.startDate = moment();
    this.StartDateStr = moment().format('MM-DD-YYYY');
  }

  // onSetValidDateRange(data){
  onUpdateDateRange(data){
    this.sameDay = data.sameDay;
    
    this.endDate = data.endDate
    this.endDateStr = this.endDate.format('MM-DD-YYYY')

    this.startDate = data.startDate;
    this.startDateStr = this.startDate.format('MM-DD-YYYY')
  }

  // onResetDate(){
  onResetDate(){
    this.startDate = moment();
    this.endDate = moment();
  }
}

export default alt.createStore(DateStore);