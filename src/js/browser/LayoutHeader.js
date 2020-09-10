import React from "react"
import "../../css/LayoutHeader.css"
import { connect } from "react-redux"
import { ButtonGroup } from "react-bootstrap"

import web from "../web"
import ChangePasswordModal from "./ChangePasswordModal"
import * as actionsCommon from "./actions"
import Button from "../components/button";

import xiaohui from "@/img/xh.png"

const mainPath = `${window.location.protocol}//${window.location.host}/hyit/`

export const SideBar = ({
  showChangePasswordModal,
  showWndModal,
  userInfo,
  msgNums
}) => {

  const fullScreen = e => {
    e.preventDefault()
    let el = document.documentElement
    if (el.requestFullscreen) {
      el.requestFullscreen()
    }
    if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen()
    }
    if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen()
    }
    if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
    }
  }

  const logout = e => {
    e.preventDefault();
    web.Logout();
    window.location.href = `${mainPath}?logout`;
    // window.location.reload();
  }

  const showMsg = e => {
    e.preventDefault();
    //打开消息通知面板
    showWndModal("MsgLst");
  }

  const backMain = e => {
    e.preventDefault();
    window.location.href = mainPath;
  }

  const study = e => {
    e.preventDefault();
    userInfo.role == "teacher" ?showWndModal("CreateClass"):showWndModal("JoinClass")
  }

  return (
    <>
      <div className="logo-container">
        <div className="logo">
          <a href={mainPath}
            onClick={e => {
              e.preventDefault();
              window.location.href = mainPath;
            }}>
            <img src={xiaohui} alt="淮阴工学院" />
          </a>
          <h1>
            素材模型库
          </h1>
        </div>
        <ButtonGroup className="btns">
          <Button
            onClick={backMain}
            className="btns-item"
          >
            首页
          </Button>
          <Button
            onClick={study}
            className="btns-item"
          >
            {userInfo.role == "teacher" ? "创建班级" : "加入班级"}
          </Button>
          <Button
            onClick={fullScreen}
            className="btns-item"
          >
            全屏
          </Button>
          <Button
            onClick={e => {
              e.preventDefault()
              showChangePasswordModal()
            }}
            className="btns-item"
          >
            修改密码
          </Button>
          <Button
            onClick={logout}
            className="btns-item"
          >
            退出
        </Button>
          <Button
            onClick={showMsg}
            className="btns-item"
          >
            未读消息
            <div className="msg-nums">{msgNums}</div>
          </Button>
        </ButtonGroup>
      </div>
      <ChangePasswordModal />
    </>
  )
}

const mapStateToProps = state => {
  return {
    sidebarOpen: state.browser.sidebarOpen,
    userInfo: state.browser.userInfo,
    msgNums: state.message.msgList.length,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clickOutside: () => dispatch(actionsCommon.closeSidebar()),
    showChangePasswordModal: () => dispatch(actionsCommon.showChangePasswordModal()),
    showWndModal: type => dispatch(actionsCommon.showWndModal(type)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
