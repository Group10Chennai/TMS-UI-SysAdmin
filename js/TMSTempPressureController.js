// controller.js
app = angular.module('app');

app.controller('TMSTempPressureController', ['$scope', '$rootScope', '$state', 'APIServices',
    'DashboardDataSharingServices', '$location','$cookieStore', '$timeout', '$filter','logger',
    function($scope, $rootScope, $state, APIServices, DashboardDataSharingServices, $location, $cookieStore,
    $timeout, $filter, logger, $apply) {
	try {
	    $rootScope.troubledVehiclesDetails = [];
	    $scope.callTroubledVehiclesAPI = function() {
		      try {
    		    APIServices.callGET_API($rootScope.HOST_TMS + 'api/tms/getTPMSVehData?type='+$rootScope.tempPressureType, true)
    		    .then(
        			function(httpResponse) { 	// Success block
      			    try {
          				loading.finish();
          				if(httpResponse.data.status == true){
          				    var vehIdName_HashMap = DashboardDataSharingServices.getVehIdName_HashMap();
          				    $rootScope.processVehDetailsForView(httpResponse, function(response) {
              					console.log(response);
              					angular.forEach(response, function(troubledVehicle, key){
            					    troubledVehicle.vehName = vehIdName_HashMap[troubledVehicle.vehId];
            					    $rootScope.troubledVehiclesDetails.push(troubledVehicle);
              					});
              		    });
          				}
      			    }
      			    catch(error) {
          				loading.finish();
          				console.log("Error :"+error);
      			    }
        			}, function(httpError) {	// Error block
        			    loading.finish();
        			    console.log("Error while processing request");
        			}, function(httpInProcess){	// In process
        			    console.log(httpInProcess);
        			}
    		    );
      		} catch (e) { loading.finish(); console.log(e); }
  	    }

        $timeout(function() {$scope.callTroubledVehiclesAPI(); }, 1000);
    } catch(e){
	}
}]);
// end TMSTempPressureController


