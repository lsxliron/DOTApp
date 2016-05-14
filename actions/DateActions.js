import alt from '../alt-application';
import moment from 'moment';
import TimeActions from '../actions/TimeActions'
class DateActions {
  constructor(){
    this.generateActions(
        'updateDateRange',
        'resetDate'
      )
  }
  
   setValidDateRange(startDate, endDate){
     // Set end date minimum
    let sameDay = true;
    let startDateStr = startDate.format("MM-DD-YYYY")
    let endDateStr = endDate.format("MM-DD-YYYY")
    
    //Check if both days are equal
    if (startDateStr == endDateStr)
      sameDay = true
    else
      sameDay = false
    TimeActions.updateSameDay(sameDay);
    this.updateDateRange({sameDay: sameDay, endDate: endDate, startDate: startDate})
  }

  
  reset(){
    this.resetDate()
  }

}

export default alt.createActions(DateActions);