var socket8=require('../check_relay.js');

function test_socket1(test){
    test.expect(1);
    var on2xx=function(theip,theport,toaddress,data,customer){
	test.ok('called');
	test.done();
    }
    var on3xx=function(theip,theport,toaddress,data,customer){
    }
    var on4xx=function(theip,theport,toaddress,data,customer){
    }
    var on5xx=function(theip,theport,toaddress,data,customer){
    }
    var onerror=function(){}
    var customer=Object();
    socket8.check_open_relay('46.4.24.136',25,'alex@madon.net',customer,on2xx,on3xx,on4xx,on5xx,onerror);
}



function test_socket2(test){
    // 
    test.expect(1);
    var on2xx=function(theip,theport,toaddress,data,customer){
    }
    var on3xx=function(theip,theport,toaddress,data,customer){
    }
    var on4xx=function(theip,theport,toaddress,data,customer){
    }
    var on5xx=function(theip,theport,toaddress,data,customer){
	test.ok('called');
	test.done();
    }
    var onerror=function(){}
    var customer=Object();
    socket8.check_open_relay('46.4.24.136',25,'alex@hotmail.com',customer,on2xx,on3xx,on4xx,on5xx,onerror);
}


function test_socket3(test){
    // 
    test.expect(1);
    var on2xx=function(theip,theport,toaddress,data,customer){
    }
    var on3xx=function(theip,theport,toaddress,data,customer){
    }
    var on4xx=function(theip,theport,toaddress,data,customer){
    }
    var on5xx=function(theip,theport,toaddress,data,customer){
    }
    var onerror=function(){
	test.ok('called');
	test.done();
    }
    var customer=Object();
    socket8.check_open_relay('46.4.24.136',2599,'alex@hotmail.com',customer,on2xx,on3xx,on4xx,on5xx,onerror);
}


 

exports.test_socket1=test_socket1;
exports.test_socket2=test_socket2;
// exports.test_socket3=test_socket3;


