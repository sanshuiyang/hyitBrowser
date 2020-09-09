import React from "react"
import { connect } from "react-redux"
import * as actionsBuckets from "./actions"

export const BucketSearch = ({ onChange }) => (
  <div>
    <div
      className="input-group ig-dark ig-left ig-search"
      style={{ display: "block", color: "black" }}
    >
      <div style={{ color: "#484848 !important" }}>
        <input
          className="ig-text"
          type="text"
          onChange={e => onChange(e.target.value)}
          placeholder="搜索文件夹..."
        />
        <i className="ig-helpers" />
      </div>
    </div>
  </div>
)

const mapDispatchToProps = dispatch => {
  return {
    onChange: filter => {
      dispatch(actionsBuckets.setFilter(filter))
    }
  }
}

export default connect(undefined, mapDispatchToProps)(BucketSearch)
