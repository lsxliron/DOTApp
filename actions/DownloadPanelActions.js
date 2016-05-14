import alt from "../alt-application";

class DownloadPanelActions{
  constructor(){
    this.generateActions(
        'setNumOfResults',
        'fileIdRemovedFromList',
        'fileIdAddedToList',
        'reset',
        'downloadFile',
        'clear'
      );
  }

  updateNumOfResults(){
    this.setNumOfResults();
  }

  removeFileIdFromDownload(id){
    this.fileIdRemovedFromList(id);
  }
  
  addFileIdToDownload(id){
    this.fileIdAddedToList(id);

  }

  resetList(){
    this.reset()
  }

  downloadSelectedFileIds(keys, ids){
    $.ajax({
      dataType: "json",
      type: "POST",
      tiemout: 0,
      data: JSON.stringify({ids:ids, username: keys.username, password: keys.password}),
      url: "http://water.ccny.cuny.edu/lsxliron/prepareDownload"
    }).done((data)=>{
      if (data == "999"){
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
        toastr.error("Invalid API Keys")
        return;
      }
      else{
        let filename = data['filename'];
        this.downloadFile(filename)
        window.open("http://water.ccny.cuny.edu/lsxliron/download/"+filename)
      }
    }).fail((jqXhr)=>{
      console.log("FAIL",jqXhr);
    })
  }

  clearAllIds(){
    this.clear()
  }

}

export default alt.createActions(DownloadPanelActions)
