import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';
import { CrossButton } from '../../common/CustomButton';
import { history } from '../../utils/history';

const QuotesModal = (props) => {
    const { symbol } = useParams();
    const { name, validTill } = useLocation()?.state;
    const { isQuotesModalOpen, setQuotesModalOpen } = props;

    const handleCloseModal = () => {
        setQuotesModalOpen(false);
        history.push('/stocks');
    }
    return (
        <>
            <Modal
                open={isQuotesModalOpen}
                onClose={handleCloseModal}
                onOpen={() => setQuotesModalOpen(true)}
                closeOnEscape={handleCloseModal}
            >
                <Modal.Header>
                    <div className="modal-header">
                        <div className="modal-header__text">
                            {`[${symbol}] : ${name}`}
                        </div>
                        <div className="modal-header__close">
                            <CrossButton onClick={handleCloseModal} />
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Content image scrolling>
                    <Modal.Description>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default QuotesModal;