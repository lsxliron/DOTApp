import alt from '../alt-application';
import ResultsTableActions from '../actions/ResultsTableActions';
class ResultsTableStore{
  constructor(){
    this.bindActions(ResultsTableActions);
    this.loaded = false;
    this.results = [];
  }

 
  onSearchSuccess(data){
    this.results = data 

  }

  searchOver(){
    this.loaded = true;
  }

  onClear(){
    this.loaded = false;
    this.results = [];
  }












}



export default alt.createStore(ResultsTableStore);