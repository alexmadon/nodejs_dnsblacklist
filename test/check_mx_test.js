var check_mx=require('../check_mx.js');

function get_mx_test1(test){
    test.expect(2);

    var domain='madon.net';
    var customer=Object();
    customer.name="dummy.com";
    function my_process_ip(address,mx,domain,customer){
	console.log('my_process_ip',address,mx,domain,customer)
	test.ok('called');
	console.log(test._assertion_list);
	if (test._assertion_list.length == 2) {
	    test.done();
	}
    }
    function my_onnomx(domain,customer){console.log('NOMX111111')}
    function my_onnoip(mx,domain,customer){console.log('NOIP11111')}
    function my_ontimeout(domain,customer){console.log('TIMEOUT11111')}
    
    var process_ip=my_process_ip;
    var onnomx=my_onnomx;
    var onnoip=my_onnoip;
    var ontimeout=my_ontimeout;
    
    check_mx.get_mx(domain,customer,process_ip,onnomx,onnoip,ontimeout);
}

exports.get_mx_test1=get_mx_test1;


