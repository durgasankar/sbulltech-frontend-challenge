import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import StocksList from './Stocks/StocksList';
import API from '../utils/API';
import { GetRequest } from '../utils/HttpRequestHandler';
import { csvToJson } from '../utils/Covertors';
import { PageLoadingSpinner } from '../common/Spinners';
import { StocksSearchContext } from '../context/StocksSearchContext';
import { history } from '../utils/history';

const StocksPage = () => {
    const [isInitialpageLoading, setIsInitialpageLoading] = useState(true);
    const [stocks, setStocks] = useState([]);
    const [stockSearchData, setStockSearchData] = useState([]);
    const [stocksHeaders, setStocksHeaders] = useState([]);

    const _isLoading = isLoading => setIsInitialpageLoading(isLoading);

    const getStocksList = async () => {
        await GetRequest(API.INSTUMENTS)
            .then(async response => {
                const parsedJson = csvToJson(response.data);
                setStocksHeaders([...parsedJson.headers]);
                setStocks([...parsedJson.body]);
            })
            .catch(async errors => errors && history.push('/404'))
        await _isLoading(false);
    }
    useEffect(() => {
        getStocksList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateStockSearchData = searchData => setStockSearchData(searchData);
    return (
        <StocksSearchContext.Provider value={{ stockSearchData, updateStockSearchData }}>
            {
                isInitialpageLoading
                    ? <span >
                        <PageLoadingSpinner />
                    </span>
                    : <>
                        <Header />
                        <section className='stocks-container'>
                            <StocksList
                                headers={stocksHeaders}
                                stocks={stocks}
                            />
                        </section>
                        <br />
                        <Footer />
                    </>
            }
        </StocksSearchContext.Provider>
    )
}

export default StocksPage;