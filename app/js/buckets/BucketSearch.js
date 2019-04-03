import React from "react"
import { connect } from "react-redux"
import * as actionsBuckets from "./actions"
import xiaohui from "../../img/xh.png"

export const BucketSearch = ({ onChange }) => (
  <div>
    <img src={xiaohui} alt="" />
    <h1 style={{ display: "inline", color: "#080808",fontFamily:"宋体" }}>素材模型库</h1>
    <br /><br />
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
