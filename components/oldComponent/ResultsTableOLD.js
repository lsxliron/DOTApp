import React from 'react';
import TableRow from './TableRow'
import ResultsTableStore from '../stores/ResultsTableStore';

class ResultsTable extends React.Component{
  constructor(props){
    super(props);
    this.state = ResultsTableStore.getState();
    this.onChange = this.onChange.bind(this);
    this.renderWithData = this.renderWithData.bind(this)
    
    // window.addEventListener('onQuerySubmit', this.renderWithData)
  }

  onChange(){
    this.setState(ResultsTableStore.getState());
  }

  componentDidMount(){
    ResultsTableStore.listen(this.onChange);
  }

  componentWillUnmount(){
    ResultsTableStore.unlisten(this.onChange);
  }

  

  render(){
    if (this.state.results.length == 0 && this.state.loaded == false){
      return this.renderNoData("No results has been loaded yet");
    }
    else if (this.state.results[0] == "{}"){
      return this.renderNoData("No results found")
    }

    else{
      var res = undefined;
      var res = this.state.results.map((item) => {
        let boolStr = Boolean(Number(item.rain)).toString()
        return (
          <TableRow key={"imgId"+item.imgId} imgId={item.imgId} 
                    location={item.location}
                    date={item.date}
                    time={item.time}
                    dataUrl={item.dataUrl}
                    rain={boolStr[0].toUpperCase() + boolStr.slice(1)}/>
        );
      });
        return(
          <div className="resultsTable col-xs-12 col-md-8">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Rain</th>
                  <th>Thumbnail</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {res}
              </tbody>
            </table>
          </div>
          
        
      );
    }
  }

  renderWithData(event){
    this.setState({loaded: true, data:event.detail})
    
  }

  renderNoData(title){
    return (
      <div className="container resultsTable">
        <h3>{title}</h3>
      </div>
    );
  }
}



export default ResultsTable;