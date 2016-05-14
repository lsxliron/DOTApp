import alt from '../alt-application';
import DownloadPanelActions from '../actions/DownloadPanelActions';
import ResultsTableStore from '../stores/ResultsTableStore';
class DownloadPanelStore{

  constructor(){
    this.bindActions(DownloadPanelActions);
    this.numOfResults = 0
    this.selectedIds = [];
  }
  setNumOfResults(){
    this.waitFor(ResultsTableStore.dispatchToken)
    if (ResultsTableStore.getState().results[0]!="{}")
      this.numOfResults = ResultsTableStore.getState().results.length;
    else
      this.numOfResults = 0;
  }

  onFileIdAddedToList(id){
    if (this.selectedIds.indexOf(id) == -1)
      this.selectedIds.push(id);
  }

  onFileIdRemovedFromList(id){
    this.selectedIds.splice(this.selectedIds.indexOf(id),1);
  }

  onReset(){
    this.selectedIds = [];
  }
  onDownloadFile(filename){
    window.open("http://localhost:5000/download/"+filename)
  }

  onClear(){
    this.selectedIds = [];
  }
}

export default alt.createStore(DownloadPanelStore);