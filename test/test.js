const nock = require('nock'); //http mocks
const axios = require('axios').default;

const ApiCrypto = require('../ApiCrypto.js');

const Request = new ApiCrypto;

const exchangeId = 'BINANCE';
const timeStart = '2020-01-01T00:00:00.0000000';
const timeEnd = '2021-01-01T00:00:00.0000000';
const symbolId = 'BITSTAMP_SPOT_BTC_USD';

function getSymbolsMock(expectResponse) {
    nock('https://rest.coinapi.io')
        .get(`/v1/symbols/${exchangeId}`)
        .reply(expectResponse, `Response ${expectResponse}`);
}

function getExchangesMock(expectResponse) {
    nock('https://rest.coinapi.io')
        .get(`/v1/exchanges/${exchangeId}`)
        .reply(expectResponse, `Response ${expectResponse}`);
}

function getHistoricalQuoteMock(expectResponse) {
    nock('https://rest.coinapi.io')
        .get(`/v1/quotes/${symbolId}/history?time_start=${timeStart}&time_end=${timeEnd}&limit=1`)
        .reply(expectResponse, `Response ${expectResponse}`);
}

jest.setTimeout(100000000)
describe('Tests', () => {
    describe('Http Response 200', () => {
        test('getSymbols()', async() => {
            getSymbolsMock(200);
            const getSymbolsRes = await Request.getSymbols(exchangeId);
            expect(getSymbolsRes.status).toBe(200);
        });

        test('getExchanges()', async() => {
            getExchangesMock(200);
            const getExchangesRes = await Request.getExchanges(exchangeId);
            expect(getExchangesRes.status).toBe(200);
        });

        test('getHistoricalQuote()', async() => {
            getHistoricalQuoteMock(200);
            const getHistoricalQuoteRes = await Request.getHistoricalQuote(symbolId, timeStart, timeEnd);
            expect(getHistoricalQuoteRes.status).toBe(200);
        });
    });

    describe('Http Response 404', () => {
        test('getSymbols()', async() => {
            getSymbolsMock(404);
            const getSymbolsRes = await Request.getSymbols(exchangeId);
            expect(getSymbolsRes.status).toBe(404);
        });

        test('getExchanges()', async() => {
            getExchangesMock(404);
            const getExchangesRes = await Request.getExchanges(exchangeId);
            expect(getExchangesRes.status).toBe(404);
        });

        test('getHistoricalQuote()', async() => {
            getHistoricalQuoteMock(404);
            const getHistoricalQuoteRes = await Request.getHistoricalQuote(symbolId, timeStart, timeEnd);
            expect(getHistoricalQuoteRes.status).toBe(404);
        });
    });

    describe('Http Response 500', () => {
        test('getSymbols()', async() => {
            getSymbolsMock(500);
            const getSymbolsRes = await Request.getSymbols(exchangeId);
            expect(getSymbolsRes.status).toBe(500);
        });

        test('getExchanges()', async() => {
            getExchangesMock(500);
            const getExchangesRes = await Request.getExchanges(exchangeId);
            expect(getExchangesRes.status).toBe(500);
        });

        test('getHistoricalQuote()', async() => {
            getHistoricalQuoteMock(500);
            const getHistoricalQuoteRes = await Request.getHistoricalQuote(symbolId, timeStart, timeEnd);
            expect(getHistoricalQuoteRes.status).toBe(500);
        });
    });
});