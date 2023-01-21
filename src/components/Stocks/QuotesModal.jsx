import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Button, Icon, Image, Modal } from 'semantic-ui-react';
import { CrossButton } from '../../common/CustomButton';

const QuotesModal = (props) => {
    const { symbol } = useParams();
    const { name, validTill } = useLocation()?.state;
    const { isQuotesModalOpen, setQuotesModalOpen } = props;
    return (
        <>
            <Modal
                open={isQuotesModalOpen}
                onClose={() => setQuotesModalOpen(false)}
                onOpen={() => setQuotesModalOpen(true)}
                trigger={<Button>Scrolling Content Modal</Button>}
            >
                <Modal.Header>
                    <div className="modal-header">
                        <div className="modal-header__text">
                            {`[${symbol}] : ${name}`}
                        </div>
                        <div className="modal-header__close">
                            <CrossButton />
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Content image scrolling>
                    <Modal.Description>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {/* <CustomButton buttonText='Submit' /> */}
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default QuotesModal;