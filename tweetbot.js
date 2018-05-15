var twit = require('twit');
var request = require('request')
var waterfall = require('async-waterfall')

var twt = new twit({
  consumer_key: '...',
  consumer_secret: '...',
  access_token: '...',
  access_token_secret: '...',
  timeout_ms: 60*1000,
});

 var CheckEthMxn = (callback) => {
     request({
       url: 'http://api.bitso.com/v3/ticker/?book=eth_mxn',
       json: true,
     },
     (err, res, json) => {
       EthMxn = json.payload.last;
       callback(null, EthMxn);
     });
 }; 

 var CheckEthUsd = (EthMxn, callback) => {
     request({
       url: 'https://www.bitstamp.net/api/v2/ticker/ethusd/',
       json: true,
     },
     (err, res, json) => {
       EthUsd = json.last;
       callback(null, EthMxn, EthUsd);
     });
 };

 var CheckBtcMxn = (EthMxn, EthUsd, callback) => {
     request({
       url: 'http://api.bitso.com/v3/ticker/?book=btc_mxn',
       json: true,
     },
     (err, res, json) => {
       BtcMxn = json.payload.last;
       callback(null, EthMxn, EthUsd, BtcMxn);
     });
 }; 
 
 var CheckBtcUsd = (EthMxn, EthUsd, BtcMxn, callback) => {
     request({
       url: 'https://www.bitstamp.net/api/v2/ticker/btcusd/',
       json: true,
     },
     (err, res, json) => {
       BtcUsd = json.last;
       callback(null, EthMxn, EthUsd, BtcMxn, BtcUsd);
     });
 };
 
 var CheckXrpMxn = (EthMxn, EthUsd, BtcMxn, BtcUsd, callback) => {
     request({
       url: 'http://api.bitso.com/v3/ticker/?book=xrp_mxn',
       json: true,
     },
     (err, res, json) => {
       XrpMxn = json.payload.last;
       callback(null, EthMxn, EthUsd, BtcMxn, BtcUsd, XrpMxn);
     });
 }; 
 
 var CheckXrpUsd = (EthMxn, EthUsd, BtcMxn, BtcUsd, XrpMxn, callback) => {
     request({
       url: 'https://www.bitstamp.net/api/v2/ticker/xrpusd/',
       json: true,
     },
     (err, res, json) => {
       XrpUsd = json.last;
       callback(null, EthMxn, EthUsd, BtcMxn, BtcUsd, XrpMxn, XrpUsd);
     });
 };
 
 var CheckRate = (EthMxn, EthUsd, BtcMxn, BtcUsd, XrpMxn, XrpUsd, callback) => {
 
 let Body = `
#Ethereum (#Eth):
$ ${EthUsd} USD
$ ${EthMxn} MXN

#Bitcoin (#Btc):
$ ${BtcUsd} USD
$ ${BtcMxn} MXN

#Ripple (#Xrp)
$ ${XrpUsd} USD
$ ${XrpMxn} MXN

Rates:
@Bitso
@Bitstamp

#DigitalCoin
#Cryptocurrency
`;
 
 let Tweet = { status : Body };

 callback(null, Tweet);
 
 }

 waterfall([CheckEthMxn, CheckEthUsd, CheckBtcMxn, CheckBtcUsd, CheckXrpMxn, CheckXrpUsd, CheckRate], (err, result) => {

	twt.post('statuses/update', result, function(err, data, response) {console.log(data) });

 });
