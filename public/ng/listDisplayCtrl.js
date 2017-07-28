app.controller("listDisplayCtrl", function($scope) {
    function ListClient(){
		function setup(){
			this.socket = new WebSocket('ws://'+self.location.host)
		}	
		function subscribe(callback){
			this.socket.onmessage = function(event){
				callback(event.data)
			}	
		}
		this.subscribe= subscribe
		this.setup = setup
	}

	var listClient = new ListClient();
	listClient.setup();

	listClient.subscribe(function(data){
		var array = data.toString().split("\r\n");
		$scope.display = [];
		var counter = 1;
		while(counter < array.length){
			if(array[counter] != ""){
				name = array[counter].slice(1,array[counter].length)
				songCounter = 3
				songs = [];
				for(var i=0; i<parseInt(array[counter+1]); i++){
					songs.push(array[counter+songCounter].slice(1,array[counter+songCounter].length));
					songCounter += 7
				}
				$scope.display.push({name:name, songs:songs});
			}
			counter = counter + (parseInt(array[counter+1])*7) + 2; 
		}
		$scope.$apply();
	});
});