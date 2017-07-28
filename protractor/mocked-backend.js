exports.karaokeBackend = function() {
	angular.module('karaokeBackend', ['karaokeListApp', 'ngMockE2E'])
	.run(function($httpBackend){
		console.log("made it")
		$httpBackend.whenGET('/').passThrough();
		$httpBackend.whenGET('/request').passThrough();
		$httpBackend.whenPOST('/sendReqToHost').respond(function(){
			console.log("made it here")
			if(data.name = "bad request"){
				return[200, "email failed", {}];
			}else{
				return[200, "success", {}];
			}
		});
	});
}