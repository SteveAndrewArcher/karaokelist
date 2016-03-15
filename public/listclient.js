function ListClient(){
    
    var transport = {
		setup: function(){
			this.socket = new WebSocket('ws://localhost:3000')
		},
		subscribe: function(callback){
			this.socket.onmessage = function(event){
				callback(JSON.parse(event.listfile))
			}	
		},
		publish: function(data){
		this.socket.send(JSON.stringify(data))
		}
	}
    transport.setup.call(this)
    this.subscribe = transport.subscribe
    this.publish = transport.publish

}