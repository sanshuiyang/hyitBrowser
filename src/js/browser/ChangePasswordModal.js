import React from "react"
import { connect } from "react-redux"
import web from "../web"
import * as alertActions from "../alert/actions"
import md5 from "../md5.js"
import * as browserActions from "./actions"

import {
  Modal,
  ModalBody,
} from "react-bootstrap"
import InputGroup from "./InputGroup"

export class ChangePasswordModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      secretNewKey_1: "请输入旧密码", //输入旧密码
      secretNewKey_2: "", //第一次新密码
      secretNewKey_3: "", //第二次新密码
      keysReadOnly: false,
      secretKeyVisible:"text",
    }
  }

  hideModal() {
    this.setState({
      secretNewKey_1: "请输入旧密码",
      secretNewKey_2: "",
      secretNewKey_3: ""
    })
    const { hideChangePasswordModal } = this.props;
    hideChangePasswordModal();
  }

  // When its shown, it loads the access key and secret key.
  componentWillMount() {
    const { fetchServerInfo } = this.props;
    fetchServerInfo()
  }

  // Handle field changes from inside the modal.
  secretKeyChange_1(e) {
    this.setState({
      secretNewKey_1: e.target.value
    })
  }

  secretKeyChange_2(e) {
    this.setState({
      secretNewKey_2: e.target.value
    })
  }

  secretKeyChange_3(e) {
    this.setState({
      secretNewKey_3: e.target.value
    })
  }

  secretKeyVisible(secretKeyVisible) {
    this.setState({
      secretKeyVisible
    })
  }

  // 更细密码
  setAuth(e) {
    const { showAlert } = this.props
    let secretNewKey_1 = this.state.secretNewKey_1
    let secretNewKey_2 = this.state.secretNewKey_2
    let secretNewKey_3 = this.state.secretNewKey_3

    if (secretNewKey_1 == '' || secretNewKey_2 == '' || secretNewKey_3 == '') {
      showAlert({
        type: "danger",
        message: "输入内容为空！"
      })
      return;
    }

    web.GetAuth().then(data => {
      let accessKey = data.accessKey;
      let secretOldKey = data.secretKey;


      let temp = md5.Encryption(secretNewKey_1);
      if (temp != secretOldKey) {
        showAlert({
          type: "danger",
          message: "输入的密码与之前的不相符"
        })
        return;
      }

      if (secretNewKey_2 == secretNewKey_1) {
        showAlert({
          type: "danger",
          message: "新密码与旧密码相同！"
        })
        return;
      }

      if (secretNewKey_2 != secretNewKey_3) {
        showAlert({
          type: "danger",
          message: "两次输入的新密码不一致"
        })
        return;
      }

      let secretKey = md5.Encryption(secretNewKey_3)
      web
        .SetAuth({
          accessKey,
          secretKey
        })
        .then(data => {
          showAlert({
            type: "success",
            message: "修改成功"
          })
          this.hideModal();
        })
        .catch(err => {
          showAlert({
            type: "danger",
            message: err.message
          })
        })
    })
  }

  render() {
    const { showChangePasswordModal } = this.props
    return (
      <Modal
        bsSize="sm"
        animation={false}
        show={showChangePasswordModal}
        onHide={this.hideModal.bind(this)}
      >
        <ModalBody className="m-t-20">
          <InputGroup
            value={this.state.secretNewKey_1}
            onChange={this.secretKeyChange_1.bind(this)}
            id="secretKey"
            label="请输入旧密码"
            name="secretKey"
            type={this.state.secretKeyVisible ? "text" : "password"}
            spellCheck="false"
            required="required"
            autoComplete="false"
            align="ig-left"
            readonly={this.state.keysReadOnly}
          />
          <i
            onClick={this.secretKeyVisible.bind(
              this,
              !this.state.secretKeyVisible
            )}
            className={
              "toggle-password fa fa-eye " +
              (this.state.secretKeyVisible ? "toggled" : "")
            }
          />
          <InputGroup
            value={this.state.secretNewKey_2}
            onChange={this.secretKeyChange_2.bind(this)}
            id="secretKey"
            label="新密码"
            name="accesskey"
            type={this.state.secretKeyVisible ? "text" : "password"}
            spellCheck="false"
            required="required"
            autoComplete="false"
            align="ig-left"
            readonly={this.state.keysReadOnly}
          />
          <InputGroup
            value={this.state.secretNewKey_3}
            onChange={this.secretKeyChange_3.bind(this)}
            id="secretKey"
            label="再次确认"
            name="accesskey"
            type={this.state.secretKeyVisible ? "text" : "password"}
            spellCheck="false"
            required="required"
            autoComplete="false"
            align="ig-left"
            readonly={this.state.keysReadOnly}
          />
        </ModalBody>
        <div className="modal-footer">
          <button
            id="update-keys"
            className={
              "btn btn-success " + (this.state.keysReadOnly ? "hidden" : "")
            }
            onClick={this.setAuth.bind(this)}
          >
            更  新
          </button>
          <button
            id="cancel-change-password"
            className="btn btn-link"
            onClick={this.hideModal.bind(this)}
          >
            取  消
          </button>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    serverInfo: state.browser.serverInfo,
    showChangePasswordModal: state.browser.showChangePasswordModal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showAlert: alert => dispatch(alertActions.set(alert)),
    hideChangePasswordModal: () => dispatch(browserActions.hideChangePasswordModal()),
    fetchServerInfo: () => dispatch(browserActions.fetchServerInfo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordModal)
