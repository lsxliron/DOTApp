import alt from '../alt-application';
import LoginFormActions from '../actions/LoginFormActions';

class LoginFormStore{
  constructor(){
    this.bindActions(LoginFormActions);
    this.username = "";
    this.password = "";
  }

  onUpdateData(data){
    this.username = data.username;
    this.password = data.password;
    return;
  }


}

module.exports = alt.createStore(LoginFormStore);

