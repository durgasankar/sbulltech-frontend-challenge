import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';
import { CrossButton } from '../../common/CustomButton';
import { history } from '../../utils/history';
import API from '../../utils/API';
import { GetRequest } from '../../utils/HttpRequestHandler';
import { BlurImageLoadingSpinner } from '../../common/Spinners';

const QuotesModal = (props) => {
    const { symbol } = useParams();
    const { name, validTill } = useLocation()?.state;
    const { isQuotesModalOpen, setQuotesModalOpen } = props;

    const [isQuotesDataLoading, seQuotesDataLoading] = useState(true);
    const [isQuotesFetchingFailed, setQuotesFetchingFailed] = useState(false);

    const _isQuotesLoading = isLoading => seQuotesDataLoading(isLoading);

    const getQuotesOfStockAPI = async () => {
        try {
            await GetRequest(`${API.QUOTES}/${symbol}`)
                .then(async response => {
                    if (response?.status === 200) {

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
                closeOnEscape={handleCloseModal}
            >
                <Modal.Header>
                    <div className="modal__header">
                        <div className="modal__header--text">
                            {`[${symbol}] : ${name}`}
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
                        <div className="modal__body__table">

                        </div>
                        {
                            isQuotesDataLoading && <BlurImageLoadingSpinner />
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