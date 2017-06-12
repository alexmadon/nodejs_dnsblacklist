var dns = require('native-dns');
var utils=require('./utils.js');

// loops over the IPs of each MX record for a domain


// GENERIC MX IP functions:
// you can write your callback process_ip(address,mx,domain)
// example above: check_mxipptr(address,mx,domain)



function get_mxip(mx,domain,customer,process_ip,onnoip,ontimeout){
    console.log('get_mxip',mx,domain,process_ip);
    // get the IP (A record) of a MX record
    var question = dns.Question({
	name: mx,
	type: 'A',
    });
        
    var req = dns.Request({
	question: question,
	server: { address: '8.8.8.8', port: 53, type: 'udp' },
	timeout: 8000,
    });
    
    req.on('timeout', function () {
	console.log('Timeout in making request');
	ontimeout(domain);
    });
    
    req.on('message', function (err, answer) {
	if (answer.answer.length>0){
	    answer.answer.forEach(function (a) {
		//console.log(a.promote().address);
		console.log('Process',mx,domain)
		console.log('Pname='+a.name);
		console.log('Paddress='+a.address);
		console.log('Ptype='+a.type);
		console.log('Pttl='+a.ttl);
		console.log('=====================================================');
		console.log('HOOOOK',a.address,mx,domain);
		process_ip(a.address,mx,domain,customer);
		// console.log('priority='+a.priority);
		// console.log('exchange='+a.exchange);
		// console.log(a);
		//process_mx(a.name,domain);
	    });
	} else {
	    onnoip(mx,domain,customer);
	};
    });
    
    req.on('end', function () {
	console.log('Finished processing request');
    });
    
    req.send();
    




}

function get_mx(domain,customer,process_ip,onnomx,onnoip,ontimeout){
    // get the MX records for a domain
    console.log('get_mx',domain,customer,process_ip);
    var question = dns.Question({
	name: domain,
	type: 'MX',
    });
    
    
    var req = dns.Request({
	question: question,
	server: { address: '8.8.8.8', port: 53, type: 'udp' },
	timeout: 8000,
    });
    
    req.on('timeout', function () {
	console.log('Timeout in making request');
	ontimeout(domain,customer);
    });
    
    req.on('message', function (err, answer) {
	if (answer.answer.length>0){
	    answer.answer.forEach(function (a) {
		//console.log(a.promote().address);
		console.log('MXname='+a.name);
		// console.log('address='+a.address);
		console.log('type='+a.type);
		console.log('ttl='+a.ttl);
		console.log('priority='+a.priority);
		console.log('exchange='+a.exchange);
		// console.log(a);
		get_mxip(a.exchange,domain,customer,process_ip,onnoip,ontimeout);
	    });
	} else {
	    onnomx(domain);
	}
    });
    
    req.on('end', function () {
	console.log('Finished processing request');
    });
    
    req.send();
    


}





/*


*/

exports.get_mx=get_mx;




