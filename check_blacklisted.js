var dns = require('native-dns');
var utils=require('./utils.js');

/*
DNS-Status of 46.4.24.136 :
Reverse DNS (PTR) exists and claims to be: static.136.24.4.46.clients.your-server.de.
Forward DNS for static.136.24.4.46.clients.your-server.de is: 46.4.24.136.
DNS is consistent.
Result for 46.4.24.136 in LHSBL Blocklists (Alphabetic order):
*/


// list from http://www.blacklistalert.org/
// IP 46.4.24.136
// query 136.24.4.46.l2.apews.org. 2100  IN      A       127.0.0.2

left_short=[
    "l2.apews.org",
    "0spam.fusionzero.com",
    "aspews.ext.sorbs.net",
    "b.barracudacentral.org"
];

// full:
left=[
    "0spam.fusionzero.com",
    "aspews.ext.sorbs.net",
    "b.barracudacentral.org",
    "bl.mailspike.net",
    "bl.spameatingmonkey.net",
    "bl.spamcop.net",
    "bl.spamcannibal.org",
    "bl.tiopan.com",
    "blackholes.five-ten-sg.com",
    "blackholes.intersil.net",
    "bogons.cymru.com",
    "cbl.abuseat.org",
    "combined.njabl.org",
    "db.wpbl.info",
    "dnsbl.ahbl.org",
    "dnsbl.inps.de",
    "dnsbl.justspam.org",
    "dnsbl.mags.net",
    "dnsbl.sorbs.net",
    "dnsbl.rangers.eu.org",
    "dnsbl-0.uceprotect.net",
    "dnsbl-1.uceprotect.net",
    "dnsbl-2.uceprotect.net",
    "dnsbl-3.uceprotect.net",
    "dyna.spamrats.com",
    "ip.v4bl.org",
    "ips.backscatterer.org",
    "ix.dnsbl.manitu.net",
    "l2.apews.org",
    "no-more-funn.moensted.dk",
    "noptr.spamrats.com",
    "psbl.surriel.com",
    "rbl.efnet.org",
    "spam.abuse.ch",
    "spam.dnsbl.anonmails.de",
    "spam.spamrats.com",
    "spamguard.leadmon.net",
    "t1.dnsbl.net.au",
    "tor.dan.me.uk",
    "tor.dnsbl.sectoor.de",
    "ubl.unsubscore.com",
    "virbl.dnsbl.bit.nl",
    "zen.spamhaus.org"
]

/*
Result for 46.4.24.136 in LHSBL Whitelists (Alphabetic order):

accredit.habeas.com NOT WHITELISTED
iadb2.isipp.com NOT WHITELISTED
ips.whitelisted.org NOT WHITELISTED Read about this way to exclude an IP from UCEPROTECT Level2/3
list.dnswl.org NOT WHITELISTED
wl.mailspike.net NOT WHITELISTED
RHSBL-Test for 46.4.24.136's PTR static.136.24.4.46.clients.your-server.de (Alphabetic order):
*/

/*

http://www.rfc-ignorant.org/how_to_domain.php

General Concepts
If someone presents you with:

MAIL FROM: <foo@example.tld>

then you should do a lookup on example.tld.dsn.rfc-ignorant.org, and bounce or reject as you see fit.

*/
right=[
    "abuse.rfc-ignorant.org",
    "bogusmx.rfc-ignorant.org",
    "dbl.spamhaus.org",
    "dsn.rfc-ignorant.org",
    "dynamic.rhs.mailpolice.com",
    "l1.apews.org",
    "list.anonwhois.net",
    "multi.surbl.org",
    "multi.uribl.com",
    "postmaster.rfc-ignorant.org",
    "rddn.dnsbl.net.au",
    "rhsbl.ahbl.org",
    "rhsbl.sorbs.net",
    "webmail.rhs.mailpolice.com"
]




//This Service is sponsored by Admins Websecurity. 


// console.log(left);
// console.log(right);

function check_ip(ip,customer,
		  onblacklist){
    // onblacklist is a callback called when listed

    //reverse the IP:
    ipj=utils.reverse(ip);
    function check_ip_black(blserver){
	var question = dns.Question({
	    name: ipj+'.'+blserver,
	    type: 'A',
	});
	var req = dns.Request({
	    question: question,
	    server: { address: '8.8.8.8', port: 53, type: 'udp' },
	    timeout: 5000,
	});
	
	req.on('timeout', function () {
	    console.log('Timeout in making request');
	});
	
	req.on('message', function (err, answer) {
	    answer.answer.forEach(function (a) {
		console.log('name='+a.name);
		console.log('address='+a.address);
		console.log('type='+a.type);
		console.log('ttl='+a.ttl);
		onblacklist(ip,blserver,a.address,customer);
		// console.log('priority='+a.priority);
		// console.log('exchange='+a.exchange);
		// console.log(a);
	    });
	});
	
	req.on('error', function (err) {
	    console.log('Error during request',err);
	});
	
	req.on('end', function () {
	    console.log('Finished processing request');
	});

	req.send();	
    }

    left.forEach(check_ip_black);
}










function check_domain(domain,
		      customer,
		      onblacklist){
    // onblacklist is a callback called when listed

    function check_ip_black(blserver){
	var question = dns.Question({
	    name: domain+'.'+blserver,
	    type: 'A',
	});
	var req = dns.Request({
	    question: question,
	    server: { address: '8.8.8.8', port: 53, type: 'udp' },
	    timeout: 5000,
	});
	
	req.on('timeout', function () {
	    console.log('Timeout in making request');
	});
	
	req.on('message', function (err, answer) {
	    answer.answer.forEach(function (a) {
		console.log('name='+a.name);
		console.log('address='+a.address);
		console.log('type='+a.type);
		console.log('ttl='+a.ttl);
		onblacklist(domain,blserver,a.address,customer);
		// console.log('priority='+a.priority);
		// console.log('exchange='+a.exchange);
		// console.log(a);
	    });
	});
	
	req.on('end', function () {
	    console.log('Finished processing request');
	});

	req.send();	
    }

    right.forEach(check_ip_black);
}





/*

var customer=Object();
customer.name="dummy.com";
var ip="46.4.24.136";

var onblacklist_ip=function onblacklist1(ip,blserver,record,customer){
    console.log(ip+" is BLACKLISTED on "+blserver+", reason: "+record,customer);
}
check_ip(ip,customer,onblacklist_ip);


var domain='madon.net';
var onblacklist_name=function onblacklist2(domain,blserver,record,customer){
    console.log(domain+" is BLACKLISTED on "+blserver+", reason: "+record,customer);
}
check_domain(domain,customer,onblacklist_name);

*/

exports.check_domain=check_domain;
exports.check_ip=check_ip;

