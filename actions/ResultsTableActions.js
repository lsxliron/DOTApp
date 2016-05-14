import alt from '../alt-application';
import QueryFormActions from '../actions/QueryFormActions';
import DownloadPanelActions from '../actions/DownloadPanelActions';
import LoginFormStore from '../stores/LoginFormStore'
class ResultsTableActions{
  constructor(){
    this.generateActions(
      'searchSuccess', 
      'searchOver',
      'clear'
      );
  }


  search(location, weatherStatus, limit, startDate, endDate, startTime, endTime){
    var xhr = new XMLHttpRequest()
    var validKeys = true;
    // var url = "http://0.0.0.0:5000/getData";
    var url = "http://water.ccny.cuny.edu/lsxliron/getData";
    var keys = LoginFormStore.getState();
    var data= {
        username: keys.username,
        password: keys.password,
        startDate: startDate,
        endDate: endDate,
        limit: limit,
        location: location,
        weatherStatus: weatherStatus,
        startTime: startTime,
        endTime: endTime
      }

    var params = JSON.stringify(data);

    xhr.open("POST", url, true)


    xhr.onreadystatechange = (xhr) => {
      if(xhr.srcElement.readyState == 4 && xhr.srcElement.status == 200) {
        QueryFormActions.setLoadingState(true);
        DownloadPanelActions.updateNumOfResults();
      }
    }

    xhr.onprogress = (xhr) => {
      console.log(xhr.srcElement.responseText)
      if (xhr.srcElement.responseText=="999"){
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
      }
      else{
        var results = JSON.parse('[' + xhr.srcElement.responseText.slice(0,-1) + ']')
        DownloadPanelActions.updateNumOfResults();
        this.searchSuccess(results)
      }
    };

    xhr.send(params)

    
    return true;

   
  }
  clearResults(){
    this.clear();
  }
}

export default alt.createActions(ResultsTableActions);