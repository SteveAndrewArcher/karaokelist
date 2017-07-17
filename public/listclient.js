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
	var array = data.toString().split("\n");
	var display = "";
	var counter = 1;
	while(counter < array.length){
		display += (array[counter] + "<br>");
		counter = counter + (parseInt(array[counter+1])*7) + 2; 
	}
	$('#waitlist').html(display);
});

function postRequestToGoogle(){
	var name = $('#name').val();
	var song = $('#song').val();

	$.ajax({
		url: "https://docs.google.com/forms/d/1IGyQVUPbqRg6nphU84phDglz3RYkXi5bPzb3ZA6ncuY/formResponse",
		data: {"entry.1820099276": name, "entry.1337101126": song},
		type: "POST",
		dataType: "xml"
	})
	$('#name').val('');
	$('#song').val('');
	$('#thanks').html('Thanks for your request!');
}