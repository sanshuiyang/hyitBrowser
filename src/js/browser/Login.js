
import React from "react"
import { connect } from "react-redux"
import logo from "@/img/logo.svg"
import Background from "../../img/bg.png"
import Alert from "../alert/Alert"
import * as actionsAlert from "../alert/actions"
import InputGroup from "./InputGroup"
import web from "../web"
import { Redirect } from "react-router-dom"
import md5 from "../md5.js"
import "../../css/Login.css"
import history from "../history"
import storage from "local-storage-fallback"

export class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accessKey: "",
      secretKey: ""
    }
  }

  // Handle field changes
  accessKeyChange(e) {
    this.setState({
      accessKey: e.target.value
    })
  }

  secretKeyChange(e) {
    this.setState({
      secretKey: e.target.value
    })
  }

  register(e){
    e.preventDefault();
    // history.replace("/register");
    history.push("/register");
  }

  handleSubmit(event) {
    event.preventDefault()
    const { showAlert, history } = this.props
    let message = ""
    if (this.state.accessKey.replace(/\s*/g,"") === "") {
      message = "账号输入无效！"
    }
    if (this.state.secretKey.replace(/\s*/g,"") === "") {
      message = "密码输入无效！"
    }
    if (message) {
      showAlert("danger", message)
      return
    }

    let psd = md5.Encryption(this.state.secretKey);

    web
      .Login({
        login: this.state.accessKey,
        pass: psd
      })
      .then(res => {  
        storage.setItem('userName', this.state.accessKey);
        window.location.href = `${window.location.protocol}//${window.location.host}/hyit/?token=${res.token}`;
        // window.location.reload();
      })
      .catch(e => {
        showAlert("danger", e.message)
      })
  }

  componentWillMount() {
    const { clearAlert } = this.props
    // Clear out any stale message in the alert of previous page
    clearAlert()
    document.body.classList.add("is-guest")
  }

  componentWillUnmount() {
    document.body.classList.remove("is-guest")
  }

  render() {
    const { clearAlert, alert } = this.props
    const mainPath = `${window.location.protocol}//${window.location.host}/hyit/`
    if (web.LoggedIn()) {
      return <Redirect to={"/"} />
    }
    let alertBox = <Alert {...alert} onDismiss={clearAlert} />
    if (!alert.message) alertBox = ""

    //定义背景样式
    let sectionStyle = {
      width: "980px",
      height: "551px",
      //确保这里是一个字符串，以下是es6写法
      backgroundImage: `url(${Background})`
    };

    return (
      <div>
        {alertBox}
        <div className="l-page">
          <div className="l-header">
            <p>
              <img src={logo} alt="" />
              欢迎登录城市环境大场景实验项目与平台
            </p>
          </div>
          <div className="l-card" style={sectionStyle}>
            <form onSubmit={this.handleSubmit.bind(this)} className="l_right">
              <InputGroup
                value={this.state.accessKey}
                onChange={this.accessKeyChange.bind(this)}
                className="ig-dark"
                label="请输入您的账号"
                id="accessKey"
                name="username"
                type="text"
                spellCheck="false"
                required="required"
                autoComplete="username"
                backgroundColor="antiquewhite"
              />
              <InputGroup
                value={this.state.secretKey}
                onChange={this.secretKeyChange.bind(this)}
                className="ig-dark"
                label="请输入您的密码"
                id="secretKey"
                name="password"
                type="password"
                spellCheck="false"
                required="required"
                autoComplete="new-password"
                backgroundColor="antiquewhite"
              />
              <button className="lw-btn l-btnRegister" type="button" onClick={this.register.bind(this)}>
                注册
              </button>
              <button className="lw-btn l-btnLogin" type="submit">
                登录
              </button>
            </form>
          </div>
          <hr />
          <h4><a href={mainPath}>← 返回到沉浸式城市环境大场景建模及漫游虚拟仿真实验</a></h4>
          <p className="footCopyright">Copyright©湖南翔鹏信息科技有限公司  淮阴工学院</p>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showAlert: (type, message) =>
      dispatch(actionsAlert.set({ type: type, message: message })),
    clearAlert: () => dispatch(actionsAlert.clear())
  }
}

export default connect(state => state, mapDispatchToProps)(Login)
