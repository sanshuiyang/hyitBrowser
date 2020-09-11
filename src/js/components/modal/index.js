import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

import "./styles.css"

class Index extends Component {
    render() {
<<<<<<< HEAD
        const { show = true, children, title, showFooter, onHide, onSure, closeTxt, successTxt, bodyStyle } = this.props;
=======
        const { show = true, children, title, showFooter, onHide, onSure, closeTxt, successTxt, style } = this.props;
>>>>>>> d0caeaea39c19aaf81e4fb7e429cf0a3286ba610
        console.log(this.props);
        return (
            <Modal
                show={show}
                bsSize="large"
                onHide={onHide}
                aria-labelledby="contained-modal-title-sm"
                className="modal-container"
                style={style}
            >
                <Modal.Header>
                    {title ? <Modal.Title style={{ textAlign: "center" }} >{title}</Modal.Title> : null}
                    <div className="closeBtn" onClick={onHide}>x</div>
                </Modal.Header>
                <Modal.Body className="modal-body" style={bodyStyle}>
                    {children}
                </Modal.Body >
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
