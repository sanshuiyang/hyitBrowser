import React from "react"
import { connect } from "react-redux"
import * as actionsBuckets from "./actions"
import xiaohui from "../../img/xh.png"

const mainPath = `${window.location.protocol}//${window.location.host}/hyit/`

export const BucketSearch = ({ onChange }) => (
  <div>
    <a href={mainPath}
      onClick={e => {
        e.preventDefault();
        const mainPath = `${window.location.protocol}//${window.location.host}/hyit/`;
        window.location.href = mainPath;
      }}>
      <img src={xiaohui} alt="淮阴工学院" />
    </a>
    <h1 style={{ display: "inline", color: "#080808", fontFamily: "宋体" }}>素材模型库</h1>
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
