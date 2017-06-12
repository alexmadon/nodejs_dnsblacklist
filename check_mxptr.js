var dns = require('native-dns');
var utils=require('./utils.js');


function validate_ptr(ptr,address,mx,domain,customer,onmatch,ondiffer,ontimeout){
    // get the IP of the PTR and check it is the same as address
    console.log('validate_ptr',ptr,address,mx,domain,customer);
    var question = dns.Question({
	name: ptr,
	type: 'A',
    });
    
    var req = dns.Request({
	question: question,
	server: { address: '8.8.8.8', port: 53, type: 'udp' },
	timeout: 8000,
    });
    
    req.on('timeout', function () {
	console.log('Timeout in making request');
	ontimeout(address,mx,domain,customer);
    });
    
    req.on('message', function (err, answer) {
	answer.answer.forEach(function (a) {
	    //console.log(a.promote().address);
	    console.log('ProcessVALIDATE PTR',ptr,address,mx,domain,customer)
	    console.log('Pname='+a.name);
	    console.log('Paddress='+a.address);
	    console.log('CCCCCCECK',a.address,'==',address);
	    console.log('Ptype='+a.type);
	    console.log('Pttl='+a.ttl);
	    // comparefct(a.address,address,customer);
	    if (a.address == address) {
		onmatch(a.address,address,customer)
	    } else {
		ondiffer(a.address,address,customer)
	    }
	    //get_ptr(a.address,mx,domain);
	    // console.log('priority='+a.priority);
	    // console.log('exchange='+a.exchange);
	    // console.log(a);
	    //process_mx(a.name,domain);
	});
    });
    
    req.on('end', function () {
	console.log('Finished processing request');
    });
    
    req.send();
    



}


function check_mxipptr(address,mx,domain,customer,onnoptr,onmatch,ondiffer,ontimeout){
    // get the reverse name  (PTR record) of an IP address
    console.log('check_mxipptr',address,mx,domain,customer);
    addressr=utils.reverse(address);
    var question = dns.Question({
	name: addressr+'.in-addr.arpa',
	type: 'PTR',
    });
    
    
    var req = dns.Request({
	question: question,
	server: { address: '8.8.8.8', port: 53, type: 'udp' },
	timeout: 8000,
    });
    
    req.on('timeout', function () {
	console.log('Timeout in making request');
	ontimeout(address,mx,domain,customer);
    });
    
    req.on('message', function (err, answer) {
	if (answer.answer.length>0){
	    answer.answer.forEach(function (a) {
		console.log('PTRrocess',mx,domain)
		console.log('PTRname='+a.name);
		console.log('PTRtype='+a.type);
		console.log('PTRttl='+a.ttl);
		console.log('PTRdata='+a.data);
		validate_ptr(a.data,address,mx,domain,customer,onmatch,ondiffer,ontimeout);
	    });
	} else {
	    onnoptr(address,mx,domain,customer);
	}
    });
    
    req.on('end', function () {
	console.log('Finished processing request');
    });
    
    req.send();
    


}




/*



function check_mxipptr_short(address,mx,domain,customer){
    function amycheck(address1,address2){
	console.log('COMPPPARE',address1,address2);
    }
    var mycheck=amycheck;
    check_mxipptr(address,mx,domain,customer,mycheck);
}
var aprocess_ip=check_mxipptr_short; // should be a fct of (address,mx,domain)
// var aprocess_ip=myprocess_ip;

function my_onnomx(domain,customer){console.log('NOMX111111');};
function my_onnoip(mx,domain,customer){console.log('NOIP11111');};
function my_ontimeout(domain,customer){console.log('TIMEOUT11111');};

var onnomx=my_onnomx;
var onnoip=my_onnoip;
var ontimeout=my_ontimeout;

// get_mx(domain,customer,aprocess_ip,onnomx,onnoip,ontimeout);

*/


exports.check_mxipptr=check_mxipptr;