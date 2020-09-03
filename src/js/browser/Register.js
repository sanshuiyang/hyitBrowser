import React from "react"
import { connect } from "react-redux"
import logo from "@/img/logo.svg"
import Alert from "../alert/Alert"
import * as actionsAlert from "../alert/actions"
import InputGroup from "./InputGroup"
import web from "../web"
import { Redirect } from "react-router-dom"
import md5 from "../md5.js"
import history from "../history"

export class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: "",

      //----------------基础信息字段-----------------
      login: "",//登录名
      pass: "",//密码
      pass_1: "",//确认密码
      nicename: "",//昵称
      email: "",//邮箱
      phone: "",//联系方式
      num: "",//学号 or 教工号 
      grade: "",//班级 or 研究方向
      schoolName: "",//学校名称 or  职称
      identity: "student",//默认学生

      //-----------------可变字段------------------
      l_num: "学号",
      l_grade: "班级",
      l_schoolName: "学校名字",
    }
  }

  // Handle field changes
  loginChange(e) {
    this.setState({
      login: e.target.value
    })
  }

  passChange(e) {
    this.setState({
      pass: e.target.value
    })
  }

  pass_1Change(e) {
    this.setState({
      pass_1: e.target.value
    })
  }

  nicenameChange(e) {
    this.setState({
      nicename: e.target.value
    })
  }

  emailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  numChange(e) {
    this.setState({
      num: e.target.value
    })
  }

  gradeChange(e) {
    this.setState({
      grade: e.target.value
    })
  }

  schoolNameChange(e) {
    this.setState({
      schoolName: e.target.value
    })
  }

  handleTeaChange(e) {
    this.setState({
      checked: e.target.value,
      l_num: "教工号",
      l_grade: "研究方向",
      l_schoolName: "职称",
      identity: "teacher"
    })
  }

  handleStuChange(e) {
    this.setState({
      checked: e.target.value,
      l_num: "学号",
      l_grade: "班级",
      l_schoolName: "学校名字",
      identity: "student"
    })
  }

  loginFunction(e) {
    e.preventDefault();
    // history.replace("/login");
    history.push("/login");
  }

  handleSubmit(event) {
    event.preventDefault();
    const { showAlert, showSuccessAlert } = this.props
    let message = ""
    let uPattern = /^[a-zA-Z0-9_]{3,16}$/;
    if (this.state.login.replace(/\s*/g, "") === "" || !uPattern.test(this.state.login)) {
      message = "账号输入无效！要求：数字、字母、下划线、长度为3-16"
    }
    if (this.state.pass.replace(/\s*/g, "") === "") {
      message = "密码输入无效！"
    }
    if (this.state.pass_1 !== this.state.pass) {
      message = "两次输入密码不相符！"
    }

    let nPattern = /^[\u4E00-\u9FA5a-zA-Z0-9_]{3,16}$/;
    if (this.state.nicename.replace(/\s*/g, "") === "" || !nPattern.test(this.state.nicename)) {
      message = "昵称输入无效！要求：数字、字母、下划线、中文、长度为3-16"
    }
    if (this.state.email.replace(/\s*/g, "") === "") {
      message = "邮箱输入无效！"
    }
    let ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!ePattern.test(this.state.email)) {
      message = "邮箱输入无效！"
    }

    if (this.state.num.replace(/\s*/g, "") === "") {
      message = this.state.l_num + "输入无效！"
    }
    if (this.state.grade.replace(/\s*/g, "") === "") {
      message = this.state.l_grade + "输入无效！"
    }
    if (this.state.schoolName.replace(/\s*/g, "") === "") {
      message = this.state.l_schoolName + "输入无效！"
    }

    if (message) {
      showAlert("danger", message)
      return
    }

    let psd = md5.Encryption(this.state.pass);
    let basicInfo = {
      login: this.state.login,       //登录名，必须有
      pass: psd,        // 密码md5值，必须有
      nicename: this.state.nicename,    // 昵称
      email: this.state.email,       // 邮箱
      url: "", //头像 url
      displayname: this.state.nicename //显示名称
    }

    let otherInfo = {
      login: this.state.login,
      metas: [
        {
          key: 'num',
          value: this.state.num
        },
        {
          key: 'grade',
          value: this.state.grade
        },
        {
          key: 'schoolName',
          value: this.state.schoolName
        }
      ]
    }

    web
      .Register(basicInfo)
      .then(res => {
        web
          .RegisterOtherInfo(otherInfo)
          .then(res => {
            showSuccessAlert("注册成功");
            history.push("/login");
          })
          .catch(e => {
            showAlert("danger", e.message)
          })
      })
      .catch(e => {
        showAlert("danger", e.message)
      });
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
    const mainPath = `http://157.0.1.211:6627/hyit/`
    if (web.LoggedIn()) {
      return <Redirect to={"/"} />
    }

    let alertBox = <Alert {...alert} onDismiss={clearAlert} />
    if (!alert.message) alertBox = ""

    //定义背景样式
    let sectionStyle = {
      width: "560px",
      // 确保这里是一个字符串，以下是es6写法
      backgroundColor: "aliceblue",
      margin: "15px auto"
    };

    return (
      <div>
        {alertBox}
        <div className="l-page" style={{ marginTop: "3%" }}>
          <div className="l-header">
            <p>
              <img src={logo} alt="" />
              欢迎注册城市环境大场景实验项目与平台
            </p>
          </div>

          <div className="l-card" style={sectionStyle}>
            <form onSubmit={this.handleSubmit.bind(this)} className="l_right" style={{ marginTop: "20px", paddingTop: "0" }}>
              <InputGroup
                value={this.state.login}
                onChange={this.loginChange.bind(this)}
                className="ig-dark"
                label="账号"
                id="login"
                name="login"
                type="text"
                spellCheck="false"
                required="required"
                autoComplete="username"
                backgroundColor="darkgray"
              />
              <InputGroup
                value={this.state.pass}
                onChange={this.passChange.bind(this)}
                className="ig-dark"
                label="密码"
                id="pass"
                name="pass"
                type="password"
                spellCheck="false"
                required="required"
                autoComplete="username"
                backgroundColor="darkgray"
              />
              <InputGroup
                value={this.state.pass_1}
                onChange={this.pass_1Change.bind(this)}
                className="ig-dark"
                label="确认密码"
                id="pass_1"
                name="pass_1"
                type="password"
                spellCheck="false"
                required="required"
                autoComplete="new-password"
                backgroundColor="darkgray"
              />
              <InputGroup
                value={this.state.nicename}
                onChange={this.nicenameChange.bind(this)}
                className="ig-dark"
                label="昵称"
                id="nicename"
                name="nicename"
                type="text"
                spellCheck="false"
                required="required"
                autoComplete="无"
                backgroundColor="darkgray"
              />
              <InputGroup
                value={this.state.email}
                onChange={this.emailChange.bind(this)}
                className="ig-dark"
                label="邮箱"
                id="email"
                name="email"
                type="text"
                spellCheck="false"
                required="required"
                autoComplete="无"
                backgroundColor="darkgray"
              />
              <InputGroup
                value={this.state.num}
                onChange={this.numChange.bind(this)}
                className="ig-dark"
                label={this.state.l_num}
                id="num"
                name="num"
                type="text"
                spellCheck="false"
                required="required"
                autoComplete="无"
                backgroundColor="darkgray"
              />
              <InputGroup
                value={this.state.grade}
                onChange={this.gradeChange.bind(this)}
                className="ig-dark"
                label={this.state.l_grade}
                id="grade"
                name="grade"
                type="text"
                spellCheck="false"
                required="required"
                autoComplete="new-password"
                backgroundColor="darkgray"
              />
              <InputGroup
                value={this.state.schoolName}
                onChange={this.schoolNameChange.bind(this)}
                className="ig-dark"
                label={this.state.l_schoolName}
                id="schoolName"
                name="schoolName"
                type="text"
                spellCheck="false"
                required="required"
                autoComplete="无"
                backgroundColor="darkgray"
              />
              <button className="lw-btn l-btnRegister" type="submit">
                注册
              </button>
              <button className="lw-btn l-btnLogin" type="button" onClick={this.loginFunction.bind(this)}>
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
    showSuccessAlert: message =>
      dispatch(actionsAlert.set({ type: "success", message: message })),
    clearAlert: () => dispatch(actionsAlert.clear())
  }
}

export default connect(state => state, mapDispatchToProps)(Register)