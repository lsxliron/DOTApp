import alt from '../alt-application';

class RainDropdownActions{
  constructor(){
    this.generateActions(
        'reset', 
        'setSelection'
      );
  }
  setDropdownValue(id, condition){
    this.setSelection({id:id, condition:condition});
    // return {id:id, condition:condition};
  }

  resetDropdown(){
    this.reset()
    // return true;
  }
}

export default alt.createActions(RainDropdownActions);

