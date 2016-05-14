import alt from '../alt-application';
import TimeActions from '../actions/TimeActions';
import moment from "moment";
import DateStore from '../stores/DateStore';
class TimeStore{

  constructor(){
    this.bindActions(TimeActions);
    this.sameDay = true;
    this.validTime = true;
    this.startTime = moment();
    this.endTime = moment();
  }

  onUpdateTimeDelta(data){
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.validTime = data.validTime;
  }

  onSetSameDay(val){
    this.waitFor(DateStore.dispatchToken);
    this.sameDay = val;
  }

  onReset(){
    this.sameDay = true;
    this.validTime = true;
    this.startTime = moment();
    this.endTime = moment();
  }
}

export default alt.createStore(TimeStore);