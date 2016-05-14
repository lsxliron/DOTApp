import React from 'react'
import DownloadPanelActions from '../actions/DownloadPanelActions';

class TableRow extends React.Component{
  constructor(props){
    super(props);
    this.addIdsToDownloadList = this.addIdsToDownloadList.bind(this);
  }

  addIdsToDownloadList(){
    if (this.refs[this.props.imgId].checked)
      DownloadPanelActions.addFileIdToDownload(this.props.imgId);
    else
      DownloadPanelActions.removeFileIdFromDownload(this.props.imgId);
  }

  render(){
    return (
      <tr>
        <td>{this.props.imgId}</td>
        <td>{this.props.location}</td>
        <td>{this.props.date}</td>
        <td>{this.props.time}</td>
        <td>{this.props.rain}</td>
        <td><img className="tableImage" src={this.props.dataUrl} /></td>
        <td>
          <input type="checkbox" ref={this.props.imgId} onClick={this.addIdsToDownloadList} />
        </td>


      </tr>
    )
  }



}


export default TableRow