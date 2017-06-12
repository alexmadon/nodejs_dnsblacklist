// input paramters
var customerList = require('./input_dns.json');
// var theinterval=10000; // in millisecond (10000=10seconds)
var theinterval=3600000; // in millisecond (3600000= 1hour)
var timescalled=0;
var timerid; // allows future calls to clearInterval

// var customerList = require('./top1000/2t.json');

// =============== no chnages below this line =============
// modules

var dns = require('dns');
var check_relay=require('./check_relay.js');
var alarms=require('./controller_alarms.js');
var check_relay=require('./check_relay.js');
var check_mx=require('./check_mx.js');
var check_blacklisted=require('./check_blacklisted.js');
var check_mxptr=require('./check_mxptr.js');

function process_customer(customer){
    console.log('doing',customer);

    function my_process_ip(address,mx,domain){
	// process each IP of each MX
	console.log('my_process_ip',address,mx,domain)

	// controls that MX are not CNAMES and have correct PTR records
	check_mxptr.check_mxipptr(
	    address,
	    mx,
	    domain,
	    customer,
	    alarms.onnoptr,
	    alarms.onptrmatch,
	    alarms.onptrdiffer,
	    alarms.onptrtimeout)

	// open relay test
	check_blacklisted.check_ip(
	    address,
	    customer,
	    alarms.onblacklist_ip
	);
	
	check_relay.check_open_relay(
	    address,
	    25,
	    'someone@hotmail.com',
	    customer,
	    alarms.openrelay_on2xx,
	    alarms.openrelay_on3xx,
	    alarms.openrelay_on4xx,
	    alarms.openrelay_on5xx,
	    alarms.openrelay_onerror);

	// can relay test
	check_relay.check_open_relay(
	    address,
	    25,
	    'postmaster@'+customer.domain,
	    customer,
	    alarms.canrelay_on2xx,
	    alarms.canrelay_on3xx,
	    alarms.canrelay_on4xx,
	    alarms.canrelay_on5xx,
	    alarms.canrelay_onerror);
    }




    var process_ip=my_process_ip;

    check_mx.get_mx(
	customer.domain,
	customer,
	process_ip,
	alarms.mx_onnomx,
	alarms.mx_onnoip,
	alarms.mx_ontimeout);
    

    check_blacklisted.check_domain(
	customer.domain,
	customer,
	alarms.onblacklist_name
    );

}

function process_customer_wrap(customer){
    // to avoid server death wrap at high level unhandled exceptions
    try {
	process_customer(customer);
    } catch(err) {
	console.log('FATAL!!!!!!',err);
    }
}

function process_customers(){
    // main loop over customers
    timescalled=timescalled+1;
    var now=new Date();
    console.log('START CALL number',timescalled,now);
    customerList.forEach(process_customer_wrap);
}

function process_interval(){
    // main loop at regular interval
    process_customers();
    timerid=setInterval(process_customers,theinterval);
}



// start main loop
process_interval();