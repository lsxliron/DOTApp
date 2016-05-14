import React from 'react';
import ReactDOM from 'react-dom'
import moment from 'moment'
import RainDropdown from './RainDropdown';
import DateHandler from './DateHandler';
import TimeHandler from './TimeHandler';
import QueryFormStore from '../stores/QueryFormStore';
import DateActions from '../actions/DateActions';
import TimeActions from '../actions/TimeActions';
import RainDropdownActions from '../actions/RainDropdownActions';
import ResultsTableActions from '../actions/ResultsTableActions';
import QueryFormActions from '../actions/QueryFormActions';
import ResultsTableStore from '../stores/ResultsTableStore'
import DownloadPanelActions from '../actions/DownloadPanelActions';
class QueryForm extends React.Component {
  constructor(props){
    super(props);

    this.state = QueryFormStore.getState();

    this.onChange = this.onChange.bind(this);
    this.onClickClear = this.onClickClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);

  }

  onChange(){
    this.setState(QueryFormStore.getState())
    var loaderStatus;
    
    if (this.state.loading)
      loaderStatus = "hidden";
    else
      loaderStatus = "visible";

  
    $(ReactDOM.findDOMNode(this.refs.loader)).css('visibility',loaderStatus);

  }

  componentDidMount(){
    QueryFormStore.listen(this.onChange);
  }

  componentWillUnmount(){
    QueryFormStore.unlisten(this.onChange);
  }

  onClickClear(){
    let today = moment();
    let todayStr = today.format('MM-DD-YYYY');

    //RESET FIELDS
    this.refs.limit.value = "";
    this.refs.location.value = "";
    this.validateInput("", false, ReactDOM.findDOMNode(this.refs.location));
    
    //RESET RAIN DROPDOWN
    RainDropdownActions.resetDropdown();
    
    //RESET TIME
    TimeActions.resetTime();

    //RESET START DATE
    DateActions.reset();
    this.refs.dates.refs.startDate.state.inputValue = todayStr;
    this.refs.dates.refs.startDate.state.selectedDate = today;
    ReactDOM.findDOMNode(this.refs.dates.refs.startDate).getElementsByClassName('form-control')[0].value=todayStr;

    //RESET END DATE
    this.refs.dates.refs.endDate.state.inputValue = todayStr;
    this.refs.dates.refs.endDate.state.selectedDate = today;
    ReactDOM.findDOMNode(this.refs.dates.refs.endDate).getElementsByClassName('form-control')[0].value=todayStr;

    //Clear Results
    ResultsTableActions.clearResults();

    //Reset numOfResults
    DownloadPanelActions.updateNumOfResults();

  }

  handleSubmit(event){
    let el = ReactDOM.findDOMNode(this)
    if (el.getElementsByClassName('has-error').length>0){
      alert("ERROR IN FIELDS")
      return
    }
    
    //Uncheck all checkboxes
    $.each($('input[type="checkbox"]'), function(i, d){d.checked=false});
    DownloadPanelActions.resetList();
    
    const location = this.refs.location.value;
    const weatherStatus = this.refs.weatherStatus.state.condition;
    const limit = this.refs.limit.value;
    const startDate = this.refs.dates.refs.startDate.state.selectedDate.format("MM-DD-YYYY");
    const endDate = this.refs.dates.refs.endDate.state.selectedDate.format("MM-DD-YYYY");
    const startTime = this.refs.times.refs.startTime.state.selectedDate.format("HH:mm:ss");
    const endTime = this.refs.times.refs.endTime.state.selectedDate.format("HH:mm:ss");
    
    QueryFormActions.setLoadingState(true);
    ResultsTableActions.search(location, weatherStatus, limit, startDate, endDate, startTime, endTime);
  }

  validateInput(val, isNum, el){
    if (val != ""){
      if (isNum){
        el.parentElement.classList.add('has-success');
        el.parentElement.classList.remove('has-error');
      }
      else{
        el.parentElement.classList.add('has-error');
        el.parentElement.classList.remove('has-success');
      }
      
    }
    else{
      el.parentElement.classList.remove('has-error');
      el.parentElement.classList.remove('has-success');
    }
  }

  handleLocationChange(){
    let val = this.refs.location.value;
    let isNum = /^\d+$/.test(val) && val != "";
    let el = ReactDOM.findDOMNode(this.refs.location)
    this.validateInput(val, isNum, el);
  }

  handleLimitChange(){
    let val = this.refs.limit.value;
    let isNum = /^\d+$/.test(val);
    let el = ReactDOM.findDOMNode(this.refs.limit)
    this.validateInput(val, isNum, el);
  }

  render(){
    return(
      <div className="container">
        <div className="row col-xs-12">
          <h1>Query Information</h1>
        </div>
        <div className="row"> 
          <div className="col-xs-8 col-md-2">
            <label>Camera Location ID:</label>
          </div>
        
          <div className="col-xs-4 col-md-2">
            <input ref="location" onChange={this.handleLocationChange} className="form-control" type="text" placeholder="e.g 192" />
          </div>

          <div className="col-xs-8 col-md-2">
            <label>Weather Status:</label>
          </div>
        
          <div className="col-xs-4 col-md-3">
            <RainDropdown ref="weatherStatus" />   
          </div>
          <div className="col-xs-8 col-md-1">
            <label>Limit:</label>
          </div>
          <div className="col-xs-4 col-md-2">
            <input ref="limit" onChange={this.handleLimitChange} type="text" className="form-control" placeholder="no limit"/>
          </div>
        </div>
        {/* ROW */}
        <div className="row">
          <DateHandler ref="dates" />
        </div>

        {/* ROW */}
        <div className="row">
          <TimeHandler ref="times" inputFormat="HH:mm" />
          <div className="col-xs-6 col-md-2 buttonDiv">
            <button onClick={this.onClickClear} className="btn btn-info">Clear</button>
          </div>
          <div className="col-xs-6 col-md-2 buttonDiv">
            <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>
        <div className="row">
          <div className="loaderWrapper">
            <img className="loader" src="img/loader.gif" ref="loader" />
          </div>
        </div>
      </div>  
    );
  }
}

export default QueryForm;