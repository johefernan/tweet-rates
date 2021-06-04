# TweetRates

### Twitter Bot for Cryptocurrency Rates.

Tweet cryptocurrency rates using [Twit](https://www.npmjs.com/package/twit). This app also uses [AWS SDK for JavaScript](https://www.npmjs.com/package/aws-sdk) for AWS Secrets Manager.

DISCLAIMER: If you want to run this code and you don't have a developer account on Twitter, please apply for a developer account in the [Developer Portal](https://developer.twitter.com). This code will not help you in any way to create or use any existing Twitter application. A free API key is also needed for rates request from CoinMarketCap.

##### Requirements

- AWS Lambda.
- AWS Secrets Manager.
- Amazon EventBridge.
- CoinMarketCap API Key.
- Twitter Developer Account.

##### Usage

- Create a secret from AWS Secrets Manager to store API keys.
- Create a serverless function from AWS Lambda.
    - Use the environment variables below with your own values.
        - SECRET_NAME: Your new secret name from AWS Secrets Manager.
        - SECRET_REGION: The secret region.
- Additionally consider to use Amazon EventBridge Rules with a scheduled Event (cron).

```javascript
SECRET_REGION: "us-east-1"
SECRET_NAME: "MyNewSecret/TweetRatesKeys"
```

##### Current Rates:

- Bitcoin
- Ethereum
- Tether
- Binance Coin
- Cardano
- Ripple
- Dogecoin
- USD Coin
- Litecoin
- Stellar
- Basic Attention Token

These rates are provided by [CoinMarketCap](https://coinmarketcap.com/). For a higher amount of rates, please refer to https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyQuotesLatest

If you have any suggestion or special request, please email me without hesitation.