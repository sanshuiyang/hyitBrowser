import React from "react"
import { connect } from "react-redux"
import * as browserActions from "./actions"
import * as actionsBuckets from "../buckets/actions"
import * as uploadsActions from "../uploads/actions"
import * as alertActions from "../alert/actions"
import { ButtonGroup } from "react-bootstrap"
import Button from "../components/button";

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

    const { showMakeBucketModal,showAlert, authority, } = this.props;

    if (authority) {
      showMakeBucketModal();
    } else {
      // console.log('无法操作');
      showAlert('danger','无权限操作！');
    }

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

  onShowStuentInfo(e){
    e.preventDefault();
    
  }

  render() {
    return (
      <li style={{ listStyle: "none" }}>
        <ButtonGroup size="lg">

          <Button className="btns-item" onClick={this.onShowMakeBucketModal.bind(this)}>创建文件夹</Button>        
         
          <div type="button" className="btn btns-item " style={{ display: "inline-block",cursor:"pointer" }}>
            <input
              type="file"
              onChange={this.onFileUpload.bind(this)}
              style={{ display: "none" }}
              id="file-input"
              multiple={true}
            />
            上传文件
          </div>

          <Button className="btns-item" onClick={this.onShowStuentInfo.bind(this)}>班级成员</Button>
        </ButtonGroup>
      </li>
    )
  }
}

const mapStateToProps = state => {
  return {
    authority: state.objects.authority,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchServerInfo: () => dispatch(browserActions.fetchServerInfo()),
    uploadFile: file => dispatch(uploadsActions.uploadFile(file)),
    showMakeBucketModal: () => dispatch(actionsBuckets.showMakeBucketModal()),
    showAlert: (type, message) => dispatch(alertActions.set({ type, message }))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BrowserDropdown)
