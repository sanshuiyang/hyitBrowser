/*
 * Minio Cloud Storage (C) 2018 Minio, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react"
import { connect } from "react-redux"
import { Modal, ModalBody, ButtonToolbar, DropdownButton, MenuItem } from "react-bootstrap"
import * as actionsBuckets from "./actions"
import { getCurrentPrefix } from "../objects/selectors"
import * as actionsAlert from "../alert/actions"


//创建文件夹
export class MakeBucketModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputFileName: "",
      currentDir: "根目录/",
      currentBucket: "", //当前根文件夹名
      currentPrefix: "", //当前子文件夹
      isOpen: false
    }
  }

  onSubmit(e) {
    e.preventDefault()
    const { showAlert, makeBucket, makeObjectFile ,bucketsList} = this.props
    let inputFileName = this.state.inputFileName
    inputFileName = inputFileName.trim();
    let inputPattern = /^[\u4E00-\u9FA5a-zA-Z0-9_]{3,16}$/;
    if (!inputPattern.test(inputFileName)) {
      showAlert("danger", "文件夹名要求：数字、字母、下划线、中文、长度为3-16");
      return;
    }

    for(var i=0;i<bucketsList.length;i++){
      if(bucketsList[i]===inputFileName){
        showAlert("danger", "已存在该文件夹！");
        return;
      }
    }

    if (inputFileName.length > 0) {
      if (this.state.currentDir === "根目录/") {
        makeBucket(inputFileName)
      } else {
        let objectFile = {
          bucketName: this.state.currentBucket,
          param: this.state.currentPrefix ? this.state.currentPrefix + inputFileName : inputFileName
        }
        makeObjectFile(objectFile);
      }
    }
    this.hideModal()
  }

  hideModal() {
    this.setState({
      inputFileName: "",
      currentDir: "根目录/",
      currentBucket: "",
      currentPrefix: ""
    })
    this.props.hideMakeBucketModal()
  }
  onClickCreatBucket() {
    this.setState({
      currentDir: "根目录/",
      isOpen: false
    })
  }

  onClickCreatObject(e) {
    e.preventDefault();
    this.setState({
      currentDir: this.state.currentBucket + "/" + this.state.currentPrefix,
      isOpen: false
    })
  }

  render() {
    const { showMakeBucketModal, currentBucket, currentPrefix } = this.props;
    return (
      <Modal
        // className="modal-create-bucket"
        bsSize="small"
        animation={false}
        show={showMakeBucketModal}
        onHide={this.hideModal.bind(this)}
      >
        <button className="close close-alt" onClick={this.hideModal.bind(this)}>
          <span>×</span>
        </button>
        <ModalBody>
          <form onSubmit={this.onSubmit.bind(this)}>
            <ButtonToolbar>
              <DropdownButton
                bsSize="lg"
                title={this.state.currentDir}
                id="dropdown-size-medium"
                className="fa fa-file"
                onClick={() => this.setState({
                  isOpen: true,
                  // currentPrefix: currentPrefix ? currentPrefix : currentBucket,
                  currentPrefix: currentPrefix,
                  currentBucket: currentBucket
                })}
              >
                <MenuItem eventKey="1" onClick={this.onClickCreatBucket.bind(this)}>根路径</MenuItem>
                <MenuItem eventKey="2" onClick={this.onClickCreatObject.bind(this)}>{currentPrefix ? currentPrefix : currentBucket}</MenuItem>
              </DropdownButton>
            </ButtonToolbar>
            <div className="input-group">
              <input
                className="ig-text"
                type="text"
                placeholder="请输入文件夹名"
                value={this.state.inputFileName}
                onChange={e => this.setState({ inputFileName: e.target.value })}
                autoFocus
              />
              <i className="ig-helpers" />
            </div>
          </form>
        </ModalBody>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    showMakeBucketModal: state.buckets.showMakeBucketModal,
    currentBucket: state.buckets.currentBucket,
    currentPrefix: getCurrentPrefix(state),
    bucketsList: state.buckets.list,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showAlert: (type, message) =>
      dispatch(actionsAlert.set({ type: type, message: message })),
    makeBucket: bucketName => dispatch(actionsBuckets.makeBucket(bucketName)),
    makeObjectFile: objectFile => dispatch(actionsBuckets.makeObjectFile(objectFile)),
    hideMakeBucketModal: () => dispatch(actionsBuckets.hideMakeBucketModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeBucketModal)
