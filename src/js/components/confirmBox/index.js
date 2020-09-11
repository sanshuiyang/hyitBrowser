import React from "react";
import { Modal, Button } from "react-bootstrap";
import Space from "../space";

class Index extends React.Component {
    render() {
        const { content, onBack, onSure, show } = this.props;
        return (

            show ?
                <Modal
                    show={show}
                    bsSize="small"
                    onHide={onBack}
                    aria-labelledby="contained-modal-title-sm"

                >
                    <Modal.Header>
                        <Modal.Title style={{ textAlign: "center" }} >
                            请再次确认操作！
                   </Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <br />
                        <span>是否确定：</span>
                        {content}
                        <br /><br />
                        <Button bsSize="lg" onClick={onBack}>返回</Button>
                        <Space width={10} />
                        <Button bsSize="lg" onClick={onSure}>确认</Button>
                    </Modal.Footer> :
                </Modal>
                : null
        )
    }
}

export default Index;