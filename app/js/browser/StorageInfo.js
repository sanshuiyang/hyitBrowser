import React from "react"
import { connect } from "react-redux"
import humanize from "humanize"
import * as actionsCommon from "./actions"
import web from "../web"
import md5 from "../md5"

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
    web.GetAuth().then(data => {
      let result = md5.Encryption("kHRaTmm3aNVyg632sl")
    })
  }

  render() {
    const { used } = this.props.storageInfo
    return (
      <div className="feh-used">
        {/* <span>用户名： </span>
        {this.state.accessKey} */}
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
