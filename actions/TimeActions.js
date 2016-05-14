import alt from '../alt-application'
import moment from 'moment'
// import TimeStore from '../stores/TimeStore';
class TimeActions{
  constructor(){
    this.generateActions(
      'updateTimeDelta',
      'setSameDay',
      'reset'
    );
  }
  checkTimeDelta(startTime, endTime, sameDay, elements){

    var delta = endTime - startTime;
    var validTime;
    
    //If dates are equal then start time cannot be after end time
    if (sameDay)
      if (delta < 0)
        validTime = false;
      else
        validTime = true;

    else
      validTime = true;

    let cssClass;


    this.updateTimeDelta({startTime: startTime, endTime: endTime, validTime: validTime});
  }

  updateSameDay(val){
    this.setSameDay(val);
  }

  resetTime(){
    this.reset()
  }

}


export default alt.createActions(TimeActions);