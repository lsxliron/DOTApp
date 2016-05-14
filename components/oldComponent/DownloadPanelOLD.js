import React from 'react';
import DownloadPanelStore from '../stores/DownloadPanelStore';
import DownloadPanelActions from '../actions/DownloadPanelActions';
import ResultsTableStore from '../stores/ResultsTableStore';
class DownloadPanel extends React.Component{
  constructor(props){
    super(props);
    this.state = DownloadPanelStore.getState()
    this.onChange = this.onChange.bind(this);
    this.selectAll = this.selectAll.bind(this);
  }

  onChange(){
    this.setState(DownloadPanelStore.getState())
  }

  componentDidMount(){
    DownloadPanelStore.listen(this.onChange);
  }

  componentWillUnmount(){
    DownloadPanelStore.unlisten(this.onChange);
  }
  selectAll(){
    $.each($('input[type="checkbox'), function(i, d){d.checked=true});
    $.each(ResultsTableStore.getState().results, function(i, d){
      DownloadPanelActions.addFileIdToDownload(d.imgId);
    });
  }

  downloadSelectedFiles(){
    let fileIds = DownloadPanelStore.getState().selectedIds;
    DownloadPanelActions.downloadSelectedFileIds(fileIds);    
  }



  render(){
    let numOfResults = this.state.numOfResults;
    if (numOfResults>0){
      return(
        <div className="downloadPanel col-md-4 hidden-xs hidden-sm">
          <label> Found {numOfResults} results </label><br />
          <button className="btn btn-primary" onClick={this.selectAll}>Select All </button><br />
          <button className="btn btn-primary" onClick={this.downloadSelectedFiles}>Download Selected</button><br />
        </div>
      )
    }
    else{
      return(<div></div>);
    }
  }
}



export default DownloadPanel;