app.controller("requestCtrl", ['$scope','$http', function($scope, $http){
	$scope.requestSubmitted = false;
	$scope.requestFailed = false;
	$scope.postRequestToGoogle = function(){
		var send = {name:$scope.name, song:$scope.song}
		$http({
			method: 'POST',
			url: '/sendReqToHost',
			headers: {
				'Content-Type': 'application/json'
			},
			data: send
		}).then(function successCallback(response){
			if(response.data == "success"){
				$scope.requestSubmitted = true;
				$scope.requestFailed = false;
			}else{
				$scope.requestFailed = true;
				$scope.requestSubmitted = false;
			}
		});
	};
}]);