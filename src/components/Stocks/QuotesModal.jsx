import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Modal, Icon } from 'semantic-ui-react';
import { CrossButton } from '../../common/CustomButton';
import { history } from '../../utils/history';
import API from '../../utils/API';
import { GetRequest } from '../../utils/HttpRequestHandler';
import { BlurImageLoadingSpinner } from '../../common/Spinners';
import QuotesTable from './QuotesTable';

const QuotesModal = (props) => {
    const { symbol } = useParams();
    const { name, validTill } = useLocation()?.state;
    const { isQuotesModalOpen, setQuotesModalOpen } = props;

    const [isQuotesDataLoading, seQuotesDataLoading] = useState(true);
    const [isQuotesFetchingFailed, setQuotesFetchingFailed] = useState(false);
    const [quotes, setQuotes] = useState([]);
    // const [isRefresh, setRefresh] = useState(false);

    const _isQuotesLoading = isLoading => seQuotesDataLoading(isLoading);

    const getQuotesOfStockAPI = async () => {
        try {
            await GetRequest(`${API.QUOTES}/${symbol}`)
                .then(async response => {
                    if (response?.status === 200) {
                        console.log(response.data.payload[symbol]);
                        setQuotes([...response.data.payload[symbol]]);
                    }
                }).catch(async error => error && setQuotesFetchingFailed(true))
            await _isQuotesLoading(false);
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
        _isQuotesLoading(true);
        getQuotesOfStockAPI();
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
                                <Icon name='refresh' size='small' onClick={quotesRefreshHandler} loading={isQuotesDataLoading} />
                            </div>
                        </div>
                        <div className="modal__header--close">
                            <CrossButton onClick={handleCloseModal} />
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Content scrolling>
                    <div className="modal__body">
                        <div className="modal__body__operations">

                        </div>
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