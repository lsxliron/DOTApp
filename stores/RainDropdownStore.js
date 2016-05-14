import alt from '../alt-application';
import RainDropdownActions from '../actions/RainDropdownActions';


class RainDropdownStore{
  constructor(){
    this.bindActions(RainDropdownActions)
    this.id = '2';
    this.condition = 'All';
  }


  onSetSelection(data){
    this.id = data.id;
    this.condition = data.condition;
  }

  onReset(){
    this.id = '2';
    this.condition = 'All';
  }

}

export default alt.createStore(RainDropdownStore);

