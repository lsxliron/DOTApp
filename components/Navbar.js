import React from 'react'
import LoginForm from './LoginForm';
class Navbar extends React.Component {
    render() {
        return (
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">DOT</a>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  {/*<li><a href="#">Options <span className="sr-only">(current)</span></a></li>*/}
                  <li data-toggle="modal" data-target="#loginModal"><a href="#">API Keys</a></li>
                </ul>
      
                {/*<ul className="nav navbar-nav navbar-right">
                  <li><a href="#">About</a></li>
                </ul>*/}
              </div>
            </div>
          </nav>
        );
    }
}

export default Navbar;