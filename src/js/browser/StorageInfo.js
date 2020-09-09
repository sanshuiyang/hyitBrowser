import React from "react"
import { connect } from "react-redux"
import humanize from "humanize"
import * as actionsCommon from "./actions"
import web from "../web"
import storege from "local-storage-fallback"

export class StorageInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      accessKey: '......'
    }
  }

  componentWillMount() {
    const { fetchStorageInfo } = this.props
    fetchStorageInfo();
  }

  componentDidMount() {
    // web.GetAuth().then(data => {
    //   console.log(data);
    // })
  }

  render() {
    const { used } = this.props.storageInfo
    let userName = '';
    if (storege.getItem('userName')) {
      userName = storege.getItem('userName');
    }
    return (
      <div className="feh-used">
        <span>用户名： </span>
        {userName}
        <div className="fehu-chart">
          <div style={{ width: 0 }} />
        </div>
        <ul>
          <li>
            {/* 使用了多少内存 */}
            <span>Used: </span>
            {humanize.filesize(used)}
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    storageInfo: state.browser.storageInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchStorageInfo: () => dispatch(actionsCommon.fetchStorageInfo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StorageInfo)
