import React from 'react';
import DownloadPanelStore from '../stores/DownloadPanelStore';
import DownloadPanelActions from '../actions/DownloadPanelActions';
import ResultsTableStore from '../stores/ResultsTableStore';
import LoginFormStore from '../stores/LoginFormStore'
class DownloadPanel extends React.Component{
  constructor(props){
    super(props);
    this.state = DownloadPanelStore.getState()
    this.onChange = this.onChange.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
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
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": true,
      "progressBar": true,
      "positionClass": "toast-top-right",
      "preventDuplicates": true,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    if (fileIds.length==0){
     toastr.error("No files were selected");
     return
    }
    else if (fileIds.length > 1000){
      toastr.error("Please choose up to 1000 files at a time")
      return
    }

    DownloadPanelActions.downloadSelectedFileIds(LoginFormStore.getState(), fileIds);
  }

  clearSelection(){
    $.each($('input[type="checkbox'), function(i, d){d.checked=false});
    DownloadPanelActions.clearAllIds()  
  }



  render(){
    let numOfResults = this.state.numOfResults;
    if (numOfResults>0){
      return(
        <div className="downloadPanel col-md-12 hidden-xs hidden-sm">
          <label> Found {numOfResults} results </label><br />
          <button className="btn btn-warning" onClick={this.clearSelection}>Clear Selection </button>
        <button className="btn btn-info" onClick={this.selectAll}>Select All </button>
          <button className="btn btn-success" onClick={this.downloadSelectedFiles}>Download Selected</button>
        </div>
      )
    }
    else{
      return(<div></div>);
    }
  }
}



export default DownloadPanel;