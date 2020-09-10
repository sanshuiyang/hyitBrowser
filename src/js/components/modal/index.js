import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

import "./styles.css"

class Index extends Component {
    render() {
        const { children, title, showFooter, onHide, onSure, closeTxt, successTxt } = this.props;
        console.log(this.props);
        return (
            <Modal
                show={true}
                bsSize="large"
                onHide={onHide}
                aria-labelledby="contained-modal-title-sm"
                className="modal-container"
            >
                <Modal.Header>
                    {title ? <Modal.Title >{title}</Modal.Title> : null}
                    <div className="closeBtn" onClick={onHide}>x</div>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    {children}
                </Modal.Body>
                {
                    showFooter ?
                        <Modal.Footer>
                            {closeTxt ? <Button onClick={onHide}>{closeTxt}</Button> : null}
                            {successTxt ? <Button onClick={onSure}>{successTxt}</Button> : null}
                        </Modal.Footer> :
                        null
                }
            </Modal>
        );
    }
}

export default Index;
