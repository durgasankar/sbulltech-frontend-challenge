import React, { Component } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import StocksList from './Stocks/StocksList';
import { GetRequest } from '../utils/HttpRequestHandler';
import API from '../utils/API';
import { csvToJson } from '../utils/Covertors';
import { PageLoadingSpinner } from '../common/Spinners';
class StocksPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isInitialpageLoading: true,
            Stocks: [],
            stocksHeaders: [],

        }
    }
    componentDidMount() {
        this.getStocksList();
    }

    getStocksList = async () => {
        await GetRequest(API.INSTUMENTS)
            .then(async response => {
                const parsedJson = csvToJson(response.data);
                this.setState({ stocks: [...parsedJson.body], stocksHeaders: [...parsedJson.headers] })
            })
            .catch(async errors => errors && this.props.history.push('/404'))
        await this._isLoading(false);
    }

    _isLoading = (isLoading) => this.setState({ isInitialpageLoading: isLoading });

    render() {
        return (
            <>
                {
                    this.state.isInitialpageLoading
                        ? <span >
                            <PageLoadingSpinner />
                        </span>
                        : <>
                            <Header />
                            <section className='stocks-container'>
                                <StocksList
                                    headers={this.state.stocksHeaders}
                                    stocks={this.state.stocks}
                                />
                            </section>
                            <Footer />
                        </>
                }
            </>
        );
    }
}

export default StocksPage;
