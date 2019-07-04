import React from "react"
import { connect } from "react-redux"
import web from "../web"
import * as actionsBuckets from "../buckets/actions"
import * as uploadsActions from "../uploads/actions"
import { getPrefixWritable } from "../objects/selectors"
import "../../css/Navbar.css"

export const MainActions = ({
    prefixWritable,
    uploadFile,
    showMakeBucketModal
}) => {
    const onFileUpload = e => {
        e.preventDefault()
        let files = e.target.files
        let filesToUploadCount = files.length
        for (let i = 0; i < filesToUploadCount; i++) {
            uploadFile(files.item(i))
        }
        e.target.value = null
    }

    const loggedIn = web.LoggedIn()

    if (loggedIn || prefixWritable) {
        return (//底部的按钮
            <div type="button" className="btn btn-primary spanList">
                <input
                    type="file"
                    onChange={onFileUpload}
                    style={{ display: "none" }}
                    id="file-input"
                    multiple={true}
                />
                <label htmlFor="file-input">
                    {" "}
                    上传文件<i className="fa fa-cloud-upload" />{" "}
                </label>
            </div>
        )
    } else {
        return <noscript />
    }
}

const mapStateToProps = state => {
    return {
        prefixWritable: getPrefixWritable(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        uploadFile: file => dispatch(uploadsActions.uploadFile(file)),
        showMakeBucketModal: () => dispatch(actionsBuckets.showMakeBucketModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainActions)
