import React from "react"
import { connect } from "react-redux"
import * as browserActions from "./actions"
import "../../css/Navbar.css"
import { ButtonGroup, Button } from "react-bootstrap"

import * as actionsBuckets from "../buckets/actions"
import * as uploadsActions from "../uploads/actions"
import { getPrefixWritable } from "../objects/selectors"

export class BrowserDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showChangePasswordModal: false,
      isOpen: false
    };
  }

  componentDidMount() {
    const { fetchServerInfo } = this.props
    fetchServerInfo()
  }
  onShowMakeBucketModal(e) {
    e.preventDefault()
    const { showMakeBucketModal } = this.props
    showMakeBucketModal()
  }
  onFileUpload(e) {
    e.preventDefault()
    const { uploadFile } = this.props
    let files = e.target.files
    let filesToUploadCount = files.length
    for (let i = 0; i < filesToUploadCount; i++) {
      uploadFile(files.item(i))
    }
    e.target.value = null
  }

  render() {
    return (
      <li style={{ listStyle: "none" }}>
        <ButtonGroup size="lg">
          <Button className="btn btn-primary spanList" onClick={this.onShowMakeBucketModal.bind(this)}>创建文件夹<i className="fa fa-hdd-o" /></Button>
          <div type="button" className="btn btn-primary spanList" style={{ width: "100px", display: "inline-block" }}>
            <input
              type="file"
              onChange={this.onFileUpload.bind(this)}
              style={{ display: "none" }}
              id="file-input"
              multiple={true}
            />
            <label htmlFor="file-input">
              {" "}
              上传文件<i className="fa fa-cloud-upload" />{" "}
            </label>
          </div>
        </ButtonGroup>
      </li>
    )
  }
}

const mapStateToProps = state => {
  return {
    prefixWritable: getPrefixWritable(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchServerInfo: () => dispatch(browserActions.fetchServerInfo()),
    uploadFile: file => dispatch(uploadsActions.uploadFile(file)),
    showMakeBucketModal: () => dispatch(actionsBuckets.showMakeBucketModal())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BrowserDropdown)
