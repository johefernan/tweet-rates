// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://aws.amazon.com/developers/getting-started/nodejs/

// Load the AWS Lambda Environment Variables
const secret_region = process.env.SECRET_REGION;
const secret_name = process.env.SECRET_NAME;

// Load the AWS SDK
var AWS = require('aws-sdk'),
    region = secret_region,
    secretName = secret_name,
    secret,
    decodedBinarySecret;
    
// Create a Secrets Manager client
var client = new AWS.SecretsManager({
    region: region
});

// In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
// See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// We rethrow the exception by default.

exports.handler = function(event, context, callback) {
    
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
        var async = require('async');
    
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
        const cmc_url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=';
        
        // CoinMarketCap IDs:
        const btc_id = 1;
        const eth_id = 1027;
        const bnb_id = 1839;
        const ada_id = 2010;
        const xrp_id = 52;
        const doge_id = 74;
        const ltc_id = 2;
        const sol_id = 5426;
        
        var BtcPrice, BtcChange, EthPrice, EthChange, BnbPrice, BnbChange, AdaPrice, AdaChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, LtcChange, SolPrice, SolChange;
    
        // Here we start to handling request to API
    
        // Bitcoin
        var CheckBtcPrice = (callback) => {
            request({
                url: cmc_url + btc_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    BtcPrice = json.data[btc_id].quote['USD'].price;
                    BtcPrice = BtcPrice.toFixed(2);
                    callback(null, BtcPrice);
                }
                
            });
        };
    
        var CheckBtcChange = (callback) => {
            request({
                url: cmc_url + btc_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    BtcChange = json.data[btc_id].quote['USD'].percent_change_24h;
                    BtcChange = BtcChange.toFixed(2);
                    callback(null,BtcChange);
                }
            });
        };
    
        // Ethereum
        var CheckEthPrice = (callback) => {
            request({
                url: cmc_url + eth_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    EthPrice = json.data[eth_id].quote['USD'].price;
                    EthPrice = EthPrice.toFixed(2);
                    callback(null, EthPrice); 
                }
            });
        };
    
        var CheckEthChange = (callback) => {
            request({
                url: cmc_url + eth_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    EthChange = json.data[eth_id].quote['USD'].percent_change_24h;
                    EthChange = EthChange.toFixed(2);
                    callback(null, EthChange);
                }
            });
        };

        // Binance Coin
        var CheckBnbPrice = (callback) => {
            request({
                url: cmc_url + bnb_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    BnbPrice = json.data[bnb_id].quote['USD'].price;
                    BnbPrice = BnbPrice.toFixed(2);
                    callback(null, BnbPrice); 
                }
            });
        };
    
        var CheckBnbChange = (callback) => {
            request({
                url: cmc_url + bnb_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    BnbChange = json.data[bnb_id].quote['USD'].percent_change_24h;
                    BnbChange = BnbChange.toFixed(2);
                    callback(null, BnbChange);
                }
            });
        };

        // Cardano
        var CheckAdaPrice = (callback) => {
            request({
                url: cmc_url + ada_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    AdaPrice = json.data[ada_id].quote['USD'].price;
                    AdaPrice = AdaPrice.toFixed(2);
                    callback(null, AdaPrice); 
                }
            });
        };
    
        var CheckAdaChange = (callback) => {
            request({
                url: cmc_url + ada_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    AdaChange = json.data[ada_id].quote['USD'].percent_change_24h;
                    AdaChange = AdaChange.toFixed(2);
                    callback(null, AdaChange);
                }
            });
        };
    
        // Ripple
        var CheckXrpPrice = (callback) => {
            request({
                url: cmc_url + xrp_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    XrpPrice = json.data[xrp_id].quote['USD'].price;
                    XrpPrice = XrpPrice.toFixed(2);
                    callback(null, XrpPrice);
                }
                
            });
        };
    
        var CheckXrpChange = (callback) => {
            request({
                url: cmc_url + xrp_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    XrpChange = json.data[xrp_id].quote['USD'].percent_change_24h;
                    XrpChange = XrpChange.toFixed(2);
                    callback(null, XrpChange);
                }
            });
        };
    
        // Dogecoin
        var CheckDogePrice = (callback) => {
            request({
                url: cmc_url + doge_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    DogePrice = json.data[doge_id].quote['USD'].price;
                    DogePrice = DogePrice.toFixed(2);
                    callback(null, DogePrice);
                }
            });
        };
    
        var CheckDogeChange = (callback) => {
            request({
                url: cmc_url + doge_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    DogeChange = json.data[doge_id].quote['USD'].percent_change_24h;
                    DogeChange = DogeChange.toFixed(2);
                    callback(null, DogeChange);
                }
            });
        };
    
        // Litecoin
        var CheckLtcPrice = (callback) => {
            request({
                url: cmc_url + ltc_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    LtcPrice = json.data[ltc_id].quote['USD'].price;
                    LtcPrice = LtcPrice.toFixed(2);
                    callback(null, LtcPrice);
                }
            });
        };
    
        var CheckLtcChange = (callback) => {
            request({
                url: cmc_url + ltc_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    LtcChange = json.data[ltc_id].quote['USD'].percent_change_24h;
                    LtcChange = LtcChange.toFixed(2);
                    callback(null, LtcChange);
                }
            });
        };

        // Stellar
        var CheckSolPrice = (callback) => {
            request({
                url: cmc_url + sol_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    SolPrice = json.data[sol_id].quote['USD'].price;
                    SolPrice = SolPrice.toFixed(2);
                    callback(null, SolPrice);
                }
            });
        };
    
        var CheckSolChange = (callback) => {
            request({
                url: cmc_url + sol_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    SolChange = json.data[sol_id].quote['USD'].percent_change_24h;
                    SolChange = SolChange.toFixed(2);
                    callback(null, SolChange);
                }
            });
        };
    
        var CheckRate = (callback) => {

            let Body = `
#Bitcoin $BTC
$${BtcPrice} (${BtcChange}%)
#Ethereum $ETH
$${EthPrice} (${EthChange}%)
#Binance $BNB
$${BnbPrice} (${BnbChange}%)
#Cardano $ADA
$${AdaPrice} (${AdaChange}%)
#Ripple $XRP
$${XrpPrice} (${XrpChange}%)
#Dogecoin $DOGE
$${DogePrice} (${DogeChange}%)
#Litecoin $LTC
$${LtcPrice} (${LtcChange}%)
#Solana $SOL
$${SolPrice} (${SolChange}%)
`;

            let Tweet = { status : Body };
    
            callback(null, Tweet);
     
        };
    
        // Running asynchronous functions in sequence with Async Series.
        async.series([CheckBtcPrice, CheckBtcChange, CheckEthPrice, CheckEthChange, CheckBnbPrice, CheckBnbChange, CheckAdaPrice, CheckAdaChange, CheckXrpPrice, CheckXrpChange, CheckDogePrice, CheckDogeChange, CheckLtcPrice, CheckLtcChange, CheckSolPrice, CheckSolChange, CheckRate], (err, result) => {
            if (err) {
                throw err;
            }
            else {
                var tweet = result[result.length - 1]
                twt.post('statuses/update', tweet, function(err, data, response) {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log(data);
                    }
                });
            }
        });
    });
};