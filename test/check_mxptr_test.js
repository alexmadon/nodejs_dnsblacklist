var check_mxptr=require('../check_mxptr.js');


function test_mxptr1(test){
    test.expect(1);

    var onnoptr=function(address,mx,domain,customer){
	console.log('PTR ERROR: Cannot get a Name (PTR) for IP ',address,', ',mx,domain,customer,'cannot be found!');
    }
    
    var onmatch=function(address1,address2,customer){
	console.log('PTR OK',address1,address2,'are the same');
	test.ok('called');
	test.done();
    } 
    
    var ondiffer=function(address1,address2,customer){
	console.log('PTR Error',address1,address2,'are different');    
    }
    
    var ontimeout=function(address,mx,domain,customer){
	console.log('PTR TIMEOUT query DNS',address,mx,domain,customer);    
    }
    
    var domain='madon.net';
    
    var customer=Object();
    customer.name="dummy.com";
    
    var address="46.4.24.136";
    var mx="mail.atpic.com";
    var domain="madon.net";
    
    
    check_mxptr.check_mxipptr(address,mx,domain,customer,onnoptr,onmatch,ondiffer,ontimeout)
}

function test_mxptr2(test){
    test.expect(1);

    var onnoptr=function(address,mx,domain,customer){
	console.log('ERROR: Cannot get a Name (PTR) for IP ',address,', ',mx,domain,customer,'cannot be found!');
	test.ok('called');
	test.done();
    }
    
    var onmatch=function(address1,address2,customer){
	console.log('OK',address1,address2,'are the same');
    } 
    
    var ondiffer=function(address1,address2,customer){
	console.log('Error',address1,address2,'are different');    
    }
    
    var ontimeout=function(address,mx,domain,customer){
	console.log('TIMEOUT query DNS',address,mx,domain,customer);    
    }
    
    var domain='madon.net';
    
    var customer=Object();
    customer.name="dummy.com";
    
    var address="46.4.24.1366";
    var mx="mail.atpic.com";
    var domain="madon.net";
    
    
    check_mxptr.check_mxipptr(address,mx,domain,customer,onnoptr,onmatch,ondiffer,ontimeout)
}








exports.test_mxptr1=test_mxptr1;
exports.test_mxptr2=test_mxptr2;
