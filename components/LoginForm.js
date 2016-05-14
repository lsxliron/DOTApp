import React from 'react';
import LoginFormStore from '../stores/LoginFormStore'
import LoginFormActions from '../actions/LoginFormActions'

class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.state = LoginFormStore.getState();
    this.onchange = this.onchange.bind(this);
    this.saveKeys = this.saveKeys.bind(this);
  }

  onchange(){
    this.setState(LoginFormStore.getState());
  }

  componentDidMount(){
    LoginFormStore.listen(this.onchange);
    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').focus()
      });
  }

  componentWillUnmount(){
    LoginFormStore.unlisten(this.onchange);
  }

  saveKeys(){
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    LoginFormActions.updateData({username: username, password: password});
    $('#loginModal').modal('hide');
  }

  render(){
    return(

      <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">API Keys</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xs-2">
                  <label> Username </label>
                </div>
                <div className="col-xs-10">
                  <input type="text" className="form-control" ref="username" />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-2">
                  <label> Password </label>
                </div>
                <div className="col-xs-10">
                  <input type="password" className="form-control" ref="password" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={this.saveKeys}>Save changes</button>
            </div>
          </div>
        </div>
      </div>



    );
  };
}


export default LoginForm;    