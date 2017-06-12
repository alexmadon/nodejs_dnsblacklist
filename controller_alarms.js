// this defines the alarms callbacks
var nodemailer = require("nodemailer");


// relay callbacks
// openrelay
var openrelay_on2xx=function(theip,theport,toaddress,data,customer){
    // this is an error
    console.log('OPENRELAY!!!!',theip,theport,toaddress,data);
}
var openrelay_on3xx=function(theip,theport,toaddress,data,customer){
    // this is an error
    console.log('OPENRELAY!!!!',theip,theport,toaddress,data);
}
var openrelay_on4xx=function(theip,theport,toaddress,data,customer){
    // this is acceptable
    console.log('not openrelay',theip,theport,toaddress,data);
}
var openrelay_on5xx=function(theip,theport,toaddress,data,customer){
    // this is OK
    console.log('not openrelay',theip,theport,toaddress,data);
}
var openrelay_onerror=function(customer){
    console.log('there was an unexpected error');
}


exports.openrelay_on2xx=openrelay_on2xx;
exports.openrelay_on3xx=openrelay_on3xx;
exports.openrelay_on4xx=openrelay_on4xx;
exports.openrelay_on5xx=openrelay_on5xx;
exports.openrelay_onerror=openrelay_onerror;


// canrelay
var canrelay_on2xx=function(theip,theport,toaddress,data,customer){
    // this is an error
    console.log('can relay',theip,theport,toaddress,data);
    console.log('222222222222',customer.domain);
}
var canrelay_on3xx=function(theip,theport,toaddress,data,customer){
    // this is an error
    console.log('CANNOT RELAY!!!!',theip,theport,toaddress,data);
}
var canrelay_on4xx=function(theip,theport,toaddress,data,customer){
    // this is acceptable
    console.log('CANNOT RELAY!!!!!',theip,theport,toaddress,data);
}
var canrelay_on5xx=function(theip,theport,toaddress,data,customer){
    // this is OK
    console.log('CANNOT RELAY!!!!',theip,theport,toaddress,data);
}
var canrelay_onerror=function(customer){
    console.log('there was an unexpected error');
}


exports.canrelay_on2xx=canrelay_on2xx;
exports.canrelay_on3xx=canrelay_on3xx;
exports.canrelay_on4xx=canrelay_on4xx;
exports.canrelay_on5xx=canrelay_on5xx;
exports.canrelay_onerror=canrelay_onerror;

// check_mx callbacks

function mx_onnomx(domain,customer){console.log('NOMX111111')}
function mx_onnoip(mx,domain,customer){console.log('NOIP11111')}
function mx_ontimeout(domain,customer){console.log('TIMEOUT11111')}

exports.mx_onnomx=mx_onnomx;
exports.mx_onnoip=mx_onnoip;
exports.mx_ontimeout=mx_ontimeout;



// =======================================

var onblacklist_name=function(domain,blserver,record,customer){
    console.log(domain+" is BLACKLISTED on "+blserver+", reason: "+record,'cust=',customer);
}
var onblacklist_ip=function(ip,blserver,record,customer){
    console.log(ip+" is BLACKLISTED on "+blserver+", reason: "+record,'cust=',customer);
}

exports.onblacklist_name=onblacklist_name;
exports.onblacklist_ip=onblacklist_ip;

// =======================================
// PTR callbacks

function onnoptr(address,mx,domain,customer){
    console.log('PTR ERROR: Cannot get a Name (PTR) for IP ',address,', ',mx,domain,customer,'cannot be found!');
}
function onptrmatch(address1,address2,customer){
    console.log('PTR OK',address1,address2,'are the same');
} 
function onptrdiffer(address1,address2,customer){
    console.log('PTR Error',address1,address2,'are different');    
}
function onptrtimeout(address,mx,domain,customer){
    console.log('PTR TIMEOUT query DNS',address,mx,domain,customer);    
}
    


exports.onnoptr=onnoptr
exports.onptrmatch=onptrmatch
exports.onptrdiffer=onptrdiffer
exports.onptrtimeout=onptrtimeout


// =======================================


function sendmail(afrom,ato,asubject,atext,customer){
    // var transport = nodemailer.createTransport("sendmail"); // sendmail
    var transport = nodemailer.createTransport("SMTP",{host:"madon.net"}); // sendmail
// setup e-mail data with unicode symbols
    var mailOptions = {
	/*
	from: "Sender Name <sender@example.com>", // sender address
	to: "receiver1@example.com, alex@madon.net", // list of receivers
	subject: "Hello", // Subject line
	text: "Hello world", // plaintext body
	html: "<b>Hello world</b>" // html body
	*/
	from: afrom,
	to: ato,
	subject: asubject,
	text: atext,
	html: ahtml
    }
    
    // send mail with defined transport object
    transport.sendMail(mailOptions, function(error, response){
	if(error){
            console.log(error);
	} else{
            console.log("Message sent: " + response.message);
	}
	
	// if you don't want to use this transport object anymore, uncomment following line
	transport.close();
    });
}
