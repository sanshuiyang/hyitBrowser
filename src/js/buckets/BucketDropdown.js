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
import * as actionsBuckets from "./actions"
import * as alertActions from "../alert/actions"
import Dropdown from "react-bootstrap/lib/Dropdown"

export class BucketDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showBucketDropdown: false
    }
  }

  toggleDropdown() {
    if (this.state.showBucketDropdown) {
      this.setState({
        showBucketDropdown: false
      })
    } else {
      this.setState({
        showBucketDropdown: true
      })
    }
  }

  onDeleteBucket(e) {
    e.stopPropagation()
    const { bucket, deleteBucket, empty, alert } = this.props
    if (!empty) {
      this.toggleDropdown()
      deleteBucket(bucket)
    } else {
      alert('danger', '无法删除空文件夹');
    }
  }

  render() {
    return (
      <Dropdown
        open={this.state.showBucketDropdown}
        onToggle={this.toggleDropdown.bind(this)}
        className="bucket-dropdown"
        id="bucket-dropdown"
      >
        <Dropdown.Toggle noCaret>
          <i className="zmdi zmdi-more-vert" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-right" style={{ minWidth: '105px', padding: "5px 0" }}>
          <li>
            <a
              onClick={this.onDeleteBucket.bind(this)}
            >
              删除
            </a>
          </li>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

const mapStateToProps = state => {
  return {
    empty: state.objects.list.length > 0 ? false : true,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteBucket: bucket => dispatch(actionsBuckets.deleteBucket(bucket)),
    showBucketPolicy: () => dispatch(actionsBuckets.showBucketPolicy()),
    alert: (type, message) => dispatch(alertActions.set({ type, message })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BucketDropdown)
