import React from "react"
import classnames from "classnames"
import "../../css/Browser.css"
import { connect } from "react-redux"
import HeaderBar from "./LayoutHeader"
import MainRightContent from "./MainRightContent"
import MainLeftContent from "./MainLeftContent"
import AlertContainer from "../alert/AlertContainer"
import ProgressBarContainer from "../progressBar/ProgressBarContainer";

import StorageInfo from "./StorageInfo"


class Browser extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <HeaderBar />
        </div>
        <div className="row">
          <div className="side">
            <MainLeftContent />
          </div>
          <div className="main">
            <MainRightContent />
          </div>
        </div>
        <div className="footer">
          <StorageInfo />
          <p className="footCopyright">Copyrights©2018:淮阴工学院  湖南翔鹏信息科技有限公司</p>
        </div>

        {/* 提示模块，不在正常文档流内 */}
        <AlertContainer />
        <ProgressBarContainer />
      </div>
    )
  }
}

export default connect(state => state)(Browser)
