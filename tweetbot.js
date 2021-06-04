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
        const usdt_id = 825;
        const bnb_id = 1839;
        const ada_id = 2010;
        const xrp_id = 52;
        const doge_id = 74;
        const usdc_id = 3408;
        const ltc_id = 2;
        const xlm_id = 512;
        const bat_id = 1697;
        
        var BtcPrice, BtcChange, EthPrice, EthChange, UsdtPrice, UsdtChange, BnbPrice, BnbChange, AdaPrice, AdaChange, XrpPrice, XrpChange, DogePrice, DogeChange, UsdcPrice, UsdcChange, LtcPrice, LtcChange, XlmPrice, XlmChange, BatPrice, BatChange;
    
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
                    BtcPrice = Math.round(BtcPrice * 100) / 100;
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
                    BtcChange = Math.round(BtcChange * 100) / 100;
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
                    EthPrice = Math.round(EthPrice * 100) / 100;
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
                    EthChange = Math.round(EthChange * 100) / 100;
                    callback(null, EthChange);
                }
            });
        };

        // Tether
        var CheckUsdtPrice = (callback) => {
            request({
                url: cmc_url + usdt_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    UsdtPrice = json.data[usdt_id].quote['USD'].price;
                    UsdtPrice = Math.round(UsdtPrice * 100) / 100;
                    callback(null, UsdtPrice); 
                }
            });
        };
    
        var CheckUsdtChange = (callback) => {
            request({
                url: cmc_url + usdt_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    UsdtChange = json.data[usdt_id].quote['USD'].percent_change_24h;
                    UsdtChange = Math.round(UsdtChange * 100) / 100;
                    callback(null, UsdtChange);
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
                    BnbPrice = Math.round(BnbPrice * 100) / 100;
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
                    BnbChange = Math.round(BnbChange * 100) / 100;
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
                    AdaPrice = Math.round(AdaPrice * 100) / 100;
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
                    AdaChange = Math.round(AdaChange * 100) / 100;
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
                    XrpPrice = Math.round(XrpPrice * 100) / 100;
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
                    XrpChange = Math.round(XrpChange * 100) / 100;
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
                    DogePrice = Math.round(DogePrice * 100) / 100;
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
                    DogeChange = Math.round(DogeChange * 100) / 100;
                    callback(null, DogeChange);
                }
            });
        };

        // USD Coin
        var CheckUsdcPrice = (callback) => {
            request({
                url: cmc_url + usdc_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    UsdcPrice = json.data[usdc_id].quote['USD'].price;
                    UsdcPrice = Math.round(UsdcPrice * 100) / 100;
                    callback(null, UsdcPrice);
                }
            });
        };
    
        var CheckUsdcChange = (callback) => {
            request({
                url: cmc_url + usdc_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    UsdcChange = json.data[usdc_id].quote['USD'].percent_change_24h;
                    UsdcChange = Math.round(UsdcChange * 100) / 100;
                    callback(null, UsdcChange);
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
                    LtcPrice = Math.round(LtcPrice * 100) / 100;
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
                    LtcChange = Math.round(LtcChange * 100) / 100;
                    callback(null, LtcChange);
                }
            });
        };

        // Stellar
        var CheckXlmPrice = (callback) => {
            request({
                url: cmc_url + xlm_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    XlmPrice = json.data[xlm_id].quote['USD'].price;
                    XlmPrice = Math.round(XlmPrice * 100) / 100;
                    callback(null, XlmPrice);
                }
            });
        };
    
        var CheckXlmChange = (callback) => {
            request({
                url: cmc_url + xlm_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    XlmChange = json.data[xlm_id].quote['USD'].percent_change_24h;
                    XlmChange = Math.round(XlmChange * 100) / 100;
                    callback(null, XlmChange);
                }
            });
        };
    
        // Basic Attention Token
        var CheckBatPrice = (callback) => {
            request({
                url: cmc_url + bat_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    BatPrice = json.data[bat_id].quote['USD'].price;
                    BatPrice = Math.round(BatPrice * 100) / 100;
                    callback(null, BatPrice);
                }
            });
        };
    
        var CheckBatChange = (callback) => {
            request({
                url: cmc_url + bat_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    BatChange = json.data[bat_id].quote['USD'].percent_change_24h;
                    BatChange = Math.round(BatChange * 100) / 100;
                    callback(null, BatChange);
                }
            });
        };
    
        var CheckRate = (callback) => {

            let Body = `
$BTC
$${BtcPrice} (${BtcChange}%)

$ETH
$${EthPrice} (${EthChange}%)
            
$USDT
$${UsdtPrice} (${UsdtChange}%)

$BNB
$${BnbPrice} (${BnbChange}%)

$ADA
$${AdaPrice} (${AdaChange}%)

$XRP
$${XrpPrice} (${XrpChange}%)

$DOGE
$${DogePrice} (${DogeChange}%)

$USDC
$${UsdcPrice} (${UsdcChange}%)

$LTC
$${LtcPrice} (${LtcChange}%)

$XLM
$${XlmPrice} (${XlmChange}%)

$BAT
$${BatPrice} (${BatChange}%)
`;

            let Tweet = { status : Body };
    
            callback(null, Tweet);
     
        };
    
        // Running asynchronous functions in sequence with Async Series.
        async.series([CheckBtcPrice, CheckBtcChange, CheckEthPrice, CheckEthChange, CheckUsdtPrice, CheckUsdtChange, CheckBnbPrice, CheckBnbChange, CheckAdaPrice, CheckAdaChange, CheckXrpPrice, CheckXrpChange, CheckDogePrice, CheckDogeChange, CheckUsdcPrice, CheckUsdcChange, CheckLtcPrice, CheckLtcChange, CheckXlmPrice, CheckXlmChange, CheckBatPrice, CheckBatChange, CheckRate], (err, result) => {
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