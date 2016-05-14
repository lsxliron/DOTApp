import React from 'react';
import RainDropdownStore from '../stores/RainDropdownStore';
import RainDropdownActions from '../actions/RainDropdownActions';
class RainDropdown extends React.Component{

  constructor(props) {
    super(props);
    this.options = [{id: '2', condition: 'All'}, 
                    {id: '0', condition: 'Not Rainy'},
                   { id: '1', condition: 'Rainy'}];

    this.state = RainDropdownStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  } 

  componentDidMount(){
    RainDropdownStore.listen(this.onChange);
  }

  componentWillUnmount(){
    RainDropdownStore.unlisten(this.onChange);
  }

  onChange(){
    this.setState(RainDropdownStore.getState());
  }

  handleClick(event) {
    let selectedValue = event.target.text;
    let id;
    if (selectedValue == 'All')
      id = 2;
    else if (selectedValue == 'Rain')
      id = 1;
    else
      id = 0;

    RainDropdownActions.setDropdownValue(id, selectedValue);
  }

  render(){
    let rainOptions = this.options.map((opt) => {
      return (
        <li key={opt.id}>
          <a onClick={this.handleClick}>{opt.condition}</a>
        </li>
      );
    });

    return (
      <div className="drowdown" id="rainDropdown">
        <button id="rainDropdownButton" className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">{this.state.condition}<span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          {rainOptions}
        </ul>
      </div>
    );
  }
}

export default RainDropdown;