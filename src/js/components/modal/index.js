import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";


class Index extends Component {
    render() {
        const { children, title, showFooter, onHide, onSure, closeTxt, successTxt } = this.props;
        console.log(this.props);
        return (
            <Modal
                show={true}
                bsSize="large"
                aria-labelledby="contained-modal-title-lg"
                onHide={onHide}
            >
                {
                    title ?
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-lg">{title}</Modal.Title>
                        </Modal.Header> :
                        null
                }
                <Modal.Body>
                    {children}
                </Modal.Body>
                {
                    showFooter ?
                        <Modal.Footer>
                            <Button onClick={onHide}>{closeTxt}</Button>
                            <Button onClick={onSure}>{successTxt}</Button>
                        </Modal.Footer> :
                        null
                }
            </Modal>
        );
    }
}

export default Index;
