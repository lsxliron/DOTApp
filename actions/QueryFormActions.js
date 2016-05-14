import alt from '../alt-application';

class QueryFormActions{
  constructor(){
    this.generateActions(
        'setLoadingState'
      )
  }
  setLoadingState(val){
    this.setLoadingState(val);
  }

}

export default alt.createActions(QueryFormActions);