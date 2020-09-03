
import React from "react"
import { connect } from "react-redux"
import classNames from "classnames"
import * as actions from "./actions"
import { getCheckedList, getAllList } from "./selectors"
import DeleteObjectConfirmModal from "./DeleteObjectConfirmModal"
import * as alertActions from "../alert/actions";

//选择object对象
export class ObjectsBulkActions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeleteConfirmation: false,
      checkedAll: "全选"
    }
  }
  handleDownload() {
    const { checkedObjects, clearChecked, downloadChecked, downloadObject, alter, downloading } = this.props;
    if (downloading) {
      alter('danger', '请等待此次下载完毕！');
    } else {
      if (checkedObjects.length === 1 && !checkedObjects[0].endsWith('/')) {
        downloadObject(checkedObjects[0]);
        clearChecked();
      } else {
        downloadChecked()
      }
    }
  }
  allChecked() {
    const { checkedObjects, allObjects, addCheckObject, clearChecked } = this.props;

    if (checkedObjects.length == allObjects.list.length) {
      this.setState({
        checkedAll: "全选"
      })
      clearChecked();
      return;
    }
    for (let i = 0; i < allObjects.list.length; i++) {
      if (checkedObjects.indexOf(allObjects.list[i].name) == -1) {
        addCheckObject(allObjects.list[i].name);
      }
    }
    this.setState({
      checkedAll: "取消全选"
    })
  }
  deleteChecked() {
    const { deleteChecked, authority, alter } = this.props
    if (authority) {
      deleteChecked()
      this.hideDeleteConfirmModal()
    } else {
      alter("danger", "无权限操作!");
      this.hideDeleteConfirmModal();
    }
  }
  hideDeleteConfirmModal() {
    this.setState({
      showDeleteConfirmation: false
    })
  }

  render() {
    const { checkedObjects, clearChecked } = this.props
    return (
      <div
        className={
          "list-actions" +
          classNames({
            " list-actions-toggled": checkedObjects.length > 0
          })
        }
      >
        <span className="la-label">
          <i className="fa fa-check-circle" /> {checkedObjects.length}
          {checkedObjects.length === 1 ? " 文件 " : " 文件 "}
          已选中
        </span>
        <span className="la-actions pull-right">
          <button id="download-checked" onClick={this.handleDownload.bind(this)}>
            {" "}
            下载
            {(checkedObjects.length === 1 && !checkedObjects[0].endsWith('/')) ?
              "选中" : "压缩包"}{" "}
          </button>
        </span>
        <span className="la-actions pull-right">
          <button
            id="delete-checked"
            onClick={() => this.setState({ showDeleteConfirmation: true })}
          >
            {" "}
            删除所选{" "}
          </button>
        </span>
        <span className="la-actions pull-right">
          <button onClick={clearChecked}>
            {" "}
            取消选择{" "}
          </button>
        </span>
        <span className="la-actions pull-right">
          <button id="all-checked" onClick={this.allChecked.bind(this)}>
            {" "}
            {this.state.checkedAll}
          </button>
        </span>

        {this.state.showDeleteConfirmation && (
          <DeleteObjectConfirmModal
            deleteObject={this.deleteChecked.bind(this)}
            hideDeleteConfirmModal={this.hideDeleteConfirmModal.bind(this)}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    checkedObjects: getCheckedList(state),
    allObjects: getAllList(state),
    downloading: state.objects.downloading,
    authority: state.objects.authority,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    downloadObject: object => dispatch(actions.downloadObject(object)),
    downloadChecked: () => dispatch(actions.downloadCheckedObjects()),
    resetCheckedList: () => dispatch(actions.resetCheckedList()),
    clearChecked: () => dispatch(actions.resetCheckedList()),
    deleteChecked: () => dispatch(actions.deleteCheckedObjects()),
    addCheckObject: (name) => dispatch(actions.checkObject(name)),
    alter: (type, message) => dispatch(alertActions.set({ type, message })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectsBulkActions)