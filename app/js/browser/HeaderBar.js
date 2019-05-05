import React from "react"
import "../../css/HeaderBar.css"
import "../../css/Navbar.css"
import { connect } from "react-redux"
import { Dropdown } from "react-bootstrap"

import web from "../web"
import ChangePasswordModal from "./ChangePasswordModal"
import * as actionsCommon from "./actions"

export const SideBar = ({
  showChangePasswordModal
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
    window.location.reload();
  }

  const backMain = e => {
    e.preventDefault();
    const mainPath = `${window.location.protocol}//${window.location.host}/hyit/`
    window.location.href = mainPath;
  }

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <li>
        <Dropdown pullRight id="top-right-menu">
          <Dropdown.Toggle noCaret>
            <i className="fa fa-reorder" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu-right">
            <li>
              <a href="" id="logout" onClick={backMain}>
                首页 <i className="fa fa-home" />
              </a>
            </li>
            <li>
              <a href="" onClick={fullScreen}>
                全屏 <i className="fa fa-expand" />
              </a>
            </li>
            <li>
              <a href="" onClick={e => {
                e.preventDefault()
                showChangePasswordModal()
              }} >
                修改密码 <i className="fa fa-cog" />
              </a>
            </li>
            <li>
              <a href="" id="logout" onClick={logout}>
                退出 <i className="fa fa-sign-out" />
              </a>
            </li>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      <ChangePasswordModal />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    sidebarOpen: state.browser.sidebarOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clickOutside: () => dispatch(actionsCommon.closeSidebar()),
    showChangePasswordModal: () => dispatch(actionsCommon.showChangePasswordModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
