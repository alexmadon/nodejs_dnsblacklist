# nodejs_dnsblacklist


## Introduction:
=============

Querying DNS and checking TCP connectivity is typically low CPU consuming but latency and timeouts can still consume a lot of computer ressources.

To tackle this problem we chose probably the most adapated programming language for asynchronous programming: nodejs

Nodejs is a javascript server-side programming language basded on Google V8 javascript engine.

To avoid Martin to modify the javascript code, we put all the alarm callbacks in one file:

controller_alarms.js


## Install:
========
1. install node.js and npm
apt-get install nodejs npm
or compile it as described on the node web site

1. install in the current folder some extensions
npm install ain2  native-dns  nodemailer  nodeunit  whois  whoisclient  whoisjs


## To launch the program:
======================
screen -S controller
node controller.js
(the screen command allows to log out the shell and trhen reconnect later to monitor the system)

Input format:
=============
A JSON file that contains at list a domain.
Any extra attribute can be accessed in the alarm callback using the customer javascript object.

Blacklists used:
===============
They are defined in check_blacklisted.js
Currently we use 95 blacklist servers:
```
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
```