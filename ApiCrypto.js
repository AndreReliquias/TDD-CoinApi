const axios = require('axios').default;

class ApiCrypto {
    constructor() {
        this.apiKey = 'PASTE YOUR API KEY HERE';
    }

    async getSymbols(exchangeId) {
        return await axios({
                method: 'GET',
                url: `https://rest.coinapi.io/v1/symbols/${exchangeId}`,
                headers: { 'X-CoinAPI-Key': this.apiKey }
            })
            .catch(err => {
                return err.response;
            });
    }

    async getExchanges(exchangeId) {
        return await axios({
                method: 'GET',
                url: `https://rest.coinapi.io/v1/exchanges/${exchangeId}`,
                headers: { 'X-CoinAPI-Key': this.apiKey }
            })
            .catch(err => {
                return err.response;
            });
    }

    async getHistoricalQuote(symbolId, timeStart, timeEnd) {
        return await axios({
                method: 'GET',
                url: `https://rest.coinapi.io/v1/quotes/${symbolId}/history?time_start=${timeStart}&time_end=${timeEnd}&limit=1`,
                headers: { 'X-CoinAPI-Key': this.apiKey }
            })
            .catch(err => {
                return err.response;
            });
    }
}

module.exports = ApiCrypto;