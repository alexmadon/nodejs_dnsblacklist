function reverse(ip){
    var ips=ip.split("."); 
    // console.log(ips);
    ips.reverse();
    var ipj=ips.join(".");
    // console.log(ipj);
    return ipj;
}

exports.reverse=reverse;
