// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://aws.amazon.com/developers/getting-started/nodejs/

// Load the AWS SDK
var AWS = require('aws-sdk'),
    region = "us-east-1",
    secretName = "app/Twitter/TweetRates",
    secret,
    decodedBinarySecret;

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
    region: region
});

// In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
// See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// We rethrow the exception by default.

client.getSecretValue({SecretId: secretName}, function(err, data) {
    if (err) {
        if (err.code === 'DecryptionFailureException')
            // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InternalServiceErrorException')
            // An error occurred on the server side.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InvalidParameterException')
            // You provided an invalid value for a parameter.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InvalidRequestException')
            // You provided a parameter value that is not valid for the current state of the resource.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'ResourceNotFoundException')
            // We can't find the resource that you asked for.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
    }
    else {
        // Decrypts secret using the associated KMS CMK.
        // Depending on whether the secret is a string or binary, one of these fields will be populated.
        if ('SecretString' in data) {
            secret = data.SecretString;
        } else {
            let buff = new Buffer(data.SecretBinary, 'base64');
            decodedBinarySecret = buff.toString('ascii');
        }
    }
    
    // End of the code snippet

    var twit = require('twit');
    var request = require('request');
    var waterfall = require('async-waterfall');

    // Getting Secrets Values 
    var secrets = JSON.parse(secret);

    // Load Twitter API Key and Token
    var twt = new twit({
        consumer_key: secrets.consumer_key,
        consumer_secret: secrets.consumer_secret,
        access_token: secrets.access_token,
        access_token_secret: secrets.access_token_secret,
        timeout_ms: 60*1000,
    });

    // CoinMarketCap API Key
    var cmc_api_key = ({
        'X-CMC_PRO_API_KEY':secrets.cmc_api_key
    });

    // CoinMarketCap API URL:
    const cmc_url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id='
    
    // CoinMarketCap IDs:
    var btc_id = 1
    var eth_id = 1027
    var xrp_id = 52
    var doge_id = 74
    var ltc_id = 2
    var grt_id = 6719

    // Here we start to handling request to API

    // Bitcoin
    var CheckBtcPrice = (callback) => {
        request({
            url: cmc_url + btc_id,
            headers: cmc_api_key,
            json: true,
        },
        (err, res, json) => {
            BtcPrice = json.data[btc_id].quote['USD'].price;
            BtcPrice = Math.round(BtcPrice * 100) / 100;
            callback(null, BtcPrice);
        });
    };

    var CheckBtcChange = (BtcPrice, callback) => {
        request({
            url: cmc_url + btc_id,
            headers: cmc_api_key,
            json: true,
        },
        (err, res, json) => {
            BtcChange = json.data[btc_id].quote['USD'].percent_change_24h;
            BtcChange = Math.round(BtcChange * 100) / 100;
            callback(null, BtcPrice, BtcChange);
        });
    };

    // Ethereum
    var CheckEthPrice = (BtcPrice, BtcChange, callback) => {
        request({
            url: cmc_url + eth_id,
            headers: cmc_api_key,
            json: true,
        },
        (err, res, json) => {
            EthPrice = json.data[eth_id].quote['USD'].price;
            EthPrice = Math.round(EthPrice * 100) / 100;
            callback(null, BtcPrice, BtcChange, EthPrice);
        });
    };

    var CheckEthChange = (BtcPrice, BtcChange, EthPrice, callback) => {
        request({
            url: cmc_url + eth_id,
            headers: cmc_api_key,
            json: true,
        },
        (err, res, json) => {
            EthChange = json.data[eth_id].quote['USD'].percent_change_24h;
            EthChange = Math.round(EthChange * 100) / 100;
            callback(null, BtcPrice, BtcChange, EthPrice, EthChange);
        });
    };

    // Ripple
    var CheckXrpPrice = (BtcPrice, BtcChange, EthPrice, EthChange, callback) => {
        request({
            url: cmc_url + xrp_id,
            headers: cmc_api_key,
            json: true,
        },
        (err, res, json) => {
            XrpPrice = json.data[xrp_id].quote['USD'].price;
            XrpPrice = Math.round(XrpPrice * 100) / 100;
            callback(null, BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice);
        });
    };

    var CheckXrpChange = (BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, callback) => {
        request({
            url: cmc_url + xrp_id,
            headers: cmc_api_key,
            json: true,
        },
        (err, res, json) => {
            XrpChange = json.data[xrp_id].quote['USD'].percent_change_24h;
            XrpChange = Math.round(XrpChange * 100) / 100;
            callback(null, BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange);
        });
    };

    // Dogecoin
    var CheckDogePrice = (BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, callback) => {
        request({
            url: cmc_url + doge_id,
            headers: cmc_api_key,
            json: true,
        },
        (err, res, json) => {
            DogePrice = json.data[doge_id].quote['USD'].price;
            DogePrice = Math.round(DogePrice * 100) / 100;
            callback(null, BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice);
        });
    };

    var CheckDogeChange = (BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, callback) => {
        request({
            url: cmc_url + doge_id,
            headers: cmc_api_key,
            json: true,
        },
        (err, res, json) => {
            DogeChange = json.data[doge_id].quote['USD'].percent_change_24h;
            DogeChange = Math.round(DogeChange * 100) / 100;
            callback(null, BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange);
        });
    };

    // Litecoin
    var CheckLtcPrice = (BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, callback) => {
        request({
            url: cmc_url + ltc_id,
            headers: cmc_api_key,
            json: true,
        },
        (err, res, json) => {
            LtcPrice = json.data[ltc_id].quote['USD'].price;
            LtcPrice = Math.round(LtcPrice * 100) / 100;
            callback(null, BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice);
        });
    };

    var CheckLtcChange = (BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, callback) => {
        request({
            url: cmc_url + ltc_id,
            headers: cmc_api_key,
            json: true,
        },
        (err, res, json) => {
            LtcChange = json.data[ltc_id].quote['USD'].percent_change_24h;
            LtcChange = Math.round(LtcChange * 100) / 100;
            callback(null, BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, LtcChange);
        });
    };

    // Feature Coin (The Graph)
    var CheckGrtPrice = (BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, LtcChange, callback) => {
        request({
            url: cmc_url + grt_id,
            headers: cmc_api_key,
            json: true,
        },
        (err, res, json) => {
            GrtPrice = json.data[grt_id].quote['USD'].price;
            GrtPrice = Math.round(GrtPrice * 100) / 100;
            callback(null, BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, LtcChange, GrtPrice);
        });
    };

    var CheckGrtChange = (BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, LtcChange, GrtPrice, callback) => {
        request({
            url: cmc_url + grt_id,
            headers: cmc_api_key,
            json: true,
        },
        (err, res, json) => {
            GrtChange = json.data[grt_id].quote['USD'].percent_change_24h;
            GrtChange = Math.round(GrtChange * 100) / 100;
            callback(null, BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, LtcChange, GrtPrice, GrtChange);
        });
    };

    var CheckRate = (BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, LtcChange, GrtPrice, GrtChange, callback) => {
 
    let Body = `
Bitcoin #BTC
$ ${BtcPrice} USD (${BtcChange}%)

Ethereum #ETH
$ ${EthPrice} USD (${EthChange}%)

Ripple #XRP
$ ${XrpPrice} USD (${XrpChange}%)

Dogecoin #DOGE
$ ${DogePrice} USD (${DogeChange}%)

Litecoin #LTC
$ ${LtcPrice} USD (${LtcChange}%)

Feature Rate:

The Graph #GRT
$ ${GrtPrice} USD (${GrtChange}%)

`;

    let Tweet = { status : Body };

    callback(null, Tweet);
 
    }

    // Running asynchronous functions in sequence with Async Waterfall.
    waterfall([CheckBtcPrice, CheckBtcChange, CheckEthPrice, CheckEthChange, CheckXrpPrice, CheckXrpChange, CheckDogePrice, CheckDogeChange, CheckLtcPrice, CheckLtcChange, CheckGrtPrice, CheckGrtChange, CheckRate], (err, result) => {

        twt.post('statuses/update', result, function(err, data, response) {console.log(data) });

    });

});