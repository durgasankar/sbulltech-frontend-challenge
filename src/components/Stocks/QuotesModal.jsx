import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Modal, Icon, Popup } from 'semantic-ui-react';
import { CrossButton } from '../../common/CustomButton';
import { history } from '../../utils/history';
import API from '../../utils/API';
import { GetRequest } from '../../utils/HttpRequestHandler';
import { BlurImageLoadingSpinner } from '../../common/Spinners';
import QuotesTable from './QuotesTable';
// import { getMaxUnixTime, convertToUnixDateFormat } from '../../utils/DateTimeFormatter';

const QuotesModal = (props) => {
    const { symbol } = useParams();
    const { name } = useLocation()?.state;
    const { isQuotesModalOpen, setQuotesModalOpen } = props;

    const [isQuotesDataLoading, seQuotesDataLoading] = useState(true);
    const [isQuotesFetchingFailed, setQuotesFetchingFailed] = useState(false);
    const [quotes, setQuotes] = useState([]);
    const [isRefreshLoading, setRefreshLoading] = useState(false);

    /* Implemented logic for auto refresh . Due to time constrain cannot able to 
    * test it . ther eis some issue with the converting date format from local to UNIX. 
    * thats why I'm commenting the codes for auto refresh.
    * 
    * LOGIC: In a stocks quotes I fetched the highest valid time.
    * With that highest valid time I compared current unix time(Current unix time refreshes every 2 second)
    * From the comparison if time exceed then it will call the API of Quotes. 
    */

    // const getMaxUnixTimeOfQuotes = async (stockQuotes) => {
    //     let timesArray = [];
    //     await stockQuotes.forEach(quote => timesArray.push(quote.valid_till));
    //     const maxUnixTime = await getMaxUnixTime(timesArray);
    //     const currentUnixTime = await convertToUnixDateFormat('currentDateTime');
    //     return maxUnixTime;
    // }

    // useEffect(() => {
    //     if (quotes.length === 0) {
    //         getQuotesOfStockAPI();
    //     }
    //     const stockQuotes = [...quotes];
    //     const maxUnixTime = getMaxUnixTimeOfQuotes(stockQuotes);
    //     const interval = setInterval(() => {
    //         const currentUnixTime = convertToUnixDateFormat('currentDateTime');
    //         if (maxUnixTime <= currentUnixTime) {
    //             if (isQuotesModalOpen) getQuotesOfStockAPI();
    //         }
    //     }, 3000);
    //     return () => {
    //         clearInterval(interval);
    //     }
    // }, [isQuotesModalOpen])

    const _isQuotesLoading = isLoading => seQuotesDataLoading(isLoading);

    const getQuotesOfStockAPI = async (isRefresh) => {
        try {
            await GetRequest(`${API.QUOTES}/${symbol}`)
                .then(async response => {
                    if (response?.status === 200) {
                        setQuotes([...response.data.payload[symbol]]);
                    }
                }).catch(async error => error && setQuotesFetchingFailed(true))
            if (isRefresh)
                return await setRefreshLoading(false);
            return await _isQuotesLoading(false);
        } catch (error) {
            _isQuotesLoading(false);
            history.push('/404');
        }
    }

    const handleCloseModal = () => {
        setQuotesModalOpen(false);
        history.push('/stocks');
    }

    const quotesRefreshHandler = () => {
        setRefreshLoading(true)
        getQuotesOfStockAPI(true);
    }

    useEffect(() => {
        getQuotesOfStockAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <Modal
                open={isQuotesModalOpen}
                onClose={handleCloseModal}
                onOpen={() => setQuotesModalOpen(true)}
                closeOnEscape={true}
            >
                <Modal.Header>
                    <div className="modal__header">
                        <div className="modal__header__heading">
                            <div className="modal__header__heading--text">
                                {`[${symbol}] : ${name}`}
                            </div>
                            <div className="modal__header__heading--icon">
                                <Popup content='Refresh Quotes'
                                    size='small'
                                    position='right center'
                                    trigger={<Icon name='refresh' size='small'
                                        onClick={quotesRefreshHandler}
                                        loading={isRefreshLoading}
                                    />}
                                />
                            </div>
                        </div>
                        <div className="modal__header--close">
                            <CrossButton onClick={handleCloseModal} />
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Content scrolling>
                    <div className="modal__body">
                        {
                            isQuotesDataLoading
                                ? <BlurImageLoadingSpinner />
                                : <div className="modal__body__table">
                                    <QuotesTable quotes={quotes} />
                                </div>
                        }
                        {
                            isQuotesFetchingFailed && <span className='modal__body--failed-to-load paragraph '>Oops! Failed to load. Please refresh.</span>
                        }
                    </div>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default QuotesModal;