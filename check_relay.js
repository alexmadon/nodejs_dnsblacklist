var net = require("net");


function check_open_relay(theip,theport,toaddress,customer,on2xx,on3xx,on4xx,on5xx,onerror){
    var client = net.createConnection(theport, theip);
    
    var state = 'banner';
    
    client.setEncoding("UTF8");
    client.setTimeout(1);
    
    client.addListener("connect", function() {
	console.log('connected');
    });
    
    client.addListener("close", function(data) {
	console.log("closed");
    });
    client.addListener("drain", function(data) {
	console.log("drained");
	// client.end();
    });
    client.addListener("error", function(data) {
	console.log("errored",data);
	onerror(data);
	// client.destroy();
    });
    client.addListener("timeout", function(data) {
	console.log("timedout");
    });
    client.addListener("secure", function(data) {
	console.log("secured");
    });
    client.addListener("end", function(data) {
	console.log("ended");
	if (state != 'bye') {
	    onerror(); // we could not chat
	}
    });
    
    client.addListener("data", function(data) {
	console.log("got data:",data);
	open_relay_chat(data); // we chat (start on 'banner' event)
    });
    
    
    
    function open_relay_chat(data){
	// define a state machine
	switch(state){
	case 'banner': 
	    console.log('response to connect (banner)=' + data);
	    state='ehlo';
	    client.write('EHLO me\r\n','UTF8');
	    break;
	case 'ehlo':
	    console.log('response to ehlo=' + data);
	    state='from';
	    client.write('MAIL FROM: <postmaster@anywhere.com>\r\n','UTF8');
	    break;
	case 'from':
	    state='to';
	    console.log('response to MAIL FROM='+data);
	    client.write('RCPT TO: <'+toaddress+'>\r\n','UTF8');
	    break
	case 'to':
	    state='quit';
	    console.log('response to RCPT TO='+data);
	    firstdigit=data.substr(0,1);
	    console.log('first='+firstdigit)
	    if (firstdigit=='2'){
		on2xx(theip,theport,toaddress,data,customer);
	    }
	    if (firstdigit=='3'){
		on3xx(theip,theport,toaddress,data,customer);
	    }
	    if (firstdigit=='4'){
		on4xx(theip,theport,toaddress,data,customer);
	    }
	    if (firstdigit=='5'){
		on5xx(theip,theport,toaddress,data,customer);
	    }
	    client.write('QUIT\r\n','UTF8');
	    break
	case 'quit':
	    state='bye';
	    console.log('response to QUIT='+data);
	    break
	default: 
	    console.log('unkown state');
	};
    }
}


exports.check_open_relay=check_open_relay;
