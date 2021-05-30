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
        const cmc_url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=';
        
        // CoinMarketCap IDs:
        const btc_id = 1;
        const eth_id = 1027;
        const xrp_id = 52;
        const doge_id = 74;
        const ltc_id = 2;
        const bat_id = 1697;
        const mana_id = 1966;
        
        var BtcPrice, 
            BtcChange, 
            EthPrice, 
            EthChange, 
            XrpPrice, 
            XrpChange, 
            DogePrice, 
            DogeChange, 
            LtcPrice, 
            LtcChange, 
            BatPrice, 
            BatChange, 
            ManaPrice, 
            ManaChange; 
    
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
    
        var CheckBtcChange = (BtcPrice, callback) => {
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
                    callback(null, BtcPrice, BtcChange);
                }
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
                if (err) {
                    throw err;
                }
                else {
                    EthPrice = json.data[eth_id].quote['USD'].price;
                    EthPrice = Math.round(EthPrice * 100) / 100;
                    callback(null, BtcPrice, BtcChange, EthPrice); 
                }
            });
        };
    
        var CheckEthChange = (BtcPrice, BtcChange, EthPrice, callback) => {
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
                    callback(null, BtcPrice, BtcChange, EthPrice, EthChange);
                }
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
                if (err) {
                    throw err;
                }
                else {
                    XrpPrice = json.data[xrp_id].quote['USD'].price;
                    XrpPrice = Math.round(XrpPrice * 100) / 100;
                    callback(null, BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice);
                }
                
            });
        };
    
        var CheckXrpChange = (BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, callback) => {
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
                    callback(null, BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange);
                }
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
                if (err) {
                    throw err;
                }
                else {
                    DogePrice = json.data[doge_id].quote['USD'].price;
                    DogePrice = Math.round(DogePrice * 100) / 100;
                    callback(null, BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice);
                }
            });
        };
    
        var CheckDogeChange = (BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, callback) => {
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
                    callback(null, BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange);
                }
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
                if (err) {
                    throw err;
                }
                else {
                    LtcPrice = json.data[ltc_id].quote['USD'].price;
                    LtcPrice = Math.round(LtcPrice * 100) / 100;
                    callback(null, BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice);
                }
            });
        };
    
        var CheckLtcChange = (BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, callback) => {
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
                    callback(null, BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, LtcChange);
                }
            });
        };

        var CheckBatPrice = (BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, LtcChange, callback) => {
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
                    callback(null, BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, LtcChange, BatPrice);
                }
            });
        };
    
        var CheckBatChange = (BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, LtcChange, BatPrice, callback) => {
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
                    callback(null, BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, LtcChange, BatPrice, BatChange);
                }
            });
        };

        var CheckManaPrice = (BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, LtcChange, BatPrice, BatChange, callback) => {
            request({
                url: cmc_url + mana_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    BatPrice = json.data[mana_id].quote['USD'].price;
                    BatPrice = Math.round(BatPrice * 100) / 100;
                    callback(null, BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, LtcChange, BatPrice, BatChange, ManaPrice);
                }
            });ManaChange
        };
    
        var CheckManaChange = (BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, LtcChange, BatPrice, BatChange, ManaPrice, callback) => {
            request({
                url: cmc_url + mana_id,
                headers: cmc_api_key,
                json: true,
            },
            (err, res, json) => {
                if (err) {
                    throw err;
                }
                else {
                    BatChange = json.data[mana_id].quote['USD'].percent_change_24h;
                    BatChange = Math.round(BatChange * 100) / 100;
                    callback(null, BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, LtcChange, BatPrice, BatChange, ManaPrice, ManaChange);
                }
            });
        };
    
        var CheckRate = (BtcPrice, BtcChange, EthPrice, EthChange, XrpPrice, XrpChange, DogePrice, DogeChange, LtcPrice, LtcChange, BatPrice, BatChange, ManaPrice, ManaChange, callback) => {
     
            let Body = `
$BTC ${BtcPrice} (${BtcChange}%)
$ETH ${EthPrice} (${EthChange}%)
$XRP ${XrpPrice} (${XrpChange}%)
$DOGE ${DogePrice} (${DogeChange}%)
$LTC ${LtcPrice} (${LtcChange}%)
$BAT ${BatPrice} (${BatChange}%)
$MANA ${ManaPrice} (${ManaChange}%)
`;
    
            let Tweet = { status : Body };
    
            callback(null, Tweet);
     
        };
    
        // Running asynchronous functions in sequence with Async Waterfall.
        waterfall([CheckBtcPrice, CheckBtcChange, CheckEthPrice, CheckEthChange, CheckXrpPrice, CheckXrpChange, CheckDogePrice, CheckDogeChange, CheckLtcPrice, CheckLtcChange, CheckBatPrice, CheckBatChange, CheckManaPrice, CheckManaChange, CheckRate], (err, result) => {
            if (err) {
                throw err;
            }
            else {
                twt.post('statuses/update', result, function(err, data, response) {
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