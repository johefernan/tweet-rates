# TweetRates

### Twitter Bot for Cryptocurrency Rates.

Tweet cryptocurrency rates using [Twit](https://www.npmjs.com/package/twit). This app also uses [AWS SDK for JavaScript](https://www.npmjs.com/package/aws-sdk) for AWS Secrets Manager.

DISCLAIMER: If you want to run this code and you don't have a developer account on Twitter, please apply for a developer account in the [Developer Portal](https://developer.twitter.com). This code will not help you in any way to create or use any existing Twitter application. A free API key is also needed for rates request from CoinMarketCap.

Please, consider to use your own Secret Name from AWS Secrets Manager.

```javascript
secretName: "app/Twitter/TweetRates"
```

##### Current Rates:

- Bitcoin
- Ethereum
- Ripple
- Dogecoin
- Litecoin
- The Graph (Floating Rate)

##### Floating Rate

The Floating Rate is based on cryptocurrency top percent changes. This floating rate will change over the time and any special request, for instance, a new rate, will be considered as a Floating Rate.

These rates are provided by [CoinMarketCap](https://coinmarketcap.com/). For a higher amount of rates, please refer to https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyQuotesLatest

If you have any suggestion or special request, please email me without hesitation.