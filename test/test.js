const nock = require('nock'); //http mocks
const axios = require('axios').default;

const ApiCrypto = require('../ApiCrypto.js');

const Request = new ApiCrypto;

const exchangeId = 'BINANCE';
const timeStart = '2020-01-01T00:00:00.0000000';
const timeEnd = '2021-01-01T00:00:00.0000000';
const symbolId = 'BITSTAMP_SPOT_BTC_USD';

jest.setTimeout(100000000)
describe('Tests', () => {
    describe('Http Response 200', () => {
        test('getSymbols()', async() => {
            const getSymbolsRes = await Request.getSymbols(exchangeId);
            expect(getSymbolsRes.status).toBe(200);
        });

        test('getExchanges()', async() => {
            const getExchangesRes = await Request.getExchanges(exchangeId);
            expect(getExchangesRes.status).toBe(200);
        });

        test('getHistoricalQuote()', async() => {
            const getHistoricalQuoteRes = await Request.getHistoricalQuote(symbolId, timeStart, timeEnd);
            expect(getHistoricalQuoteRes.status).toBe(200);
        });
    });

    describe('Http Response 404', () => {
        test('getSymbols()', async() => {
            const getSymbolsRes = await Request.getSymbols(exchangeId);
            expect(getSymbolsRes.status).toBe(404);
        });

        test('getExchanges()', async() => {
            const getExchangesRes = await Request.getExchanges(exchangeId);
            expect(getExchangesRes.status).toBe(404);
        });

        test('getHistoricalQuote()', async() => {
            const getHistoricalQuoteRes = await Request.getHistoricalQuote(symbolId, timeStart, timeEnd);
            expect(getHistoricalQuoteRes.status).toBe(404);
        });
    });

    describe('Http Response 500', () => {
        test('getSymbols()', async() => {
            const getSymbolsRes = await Request.getSymbols(exchangeId);
            expect(getSymbolsRes.status).toBe(500);
        });

        test('getExchanges()', async() => {
            const getExchangesRes = await Request.getExchanges(exchangeId);
            expect(getExchangesRes.status).toBe(500);
        });

        test('getHistoricalQuote()', async() => {
            const getHistoricalQuoteRes = await Request.getHistoricalQuote(symbolId, timeStart, timeEnd);
            expect(getHistoricalQuoteRes.status).toBe(500);
        });
    });
});