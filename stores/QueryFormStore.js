import alt from '../alt-application';
import QueryFormActions from '../actions/QueryFormActions';

class QueryFormStore{
  constructor(){
    this.bindActions(QueryFormActions)
    this.loading = false;
  }

  onSetLoadingState(val){
    this.loading = val;
  }
}

export default alt.createStore(QueryFormStore);