/*
 * Minio Cloud Storage (C) 2016, 2018 Minio, Inc.
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

import 'font-awesome/css/font-awesome.min.css';
import "material-design-iconic-font/dist/css/material-design-iconic-font.min.css"
import "./less/main.less"
// 导入本地的css文件
import "@/css/Login.css"

import ReactDOM from "react-dom"
import { Router } from "react-router-dom"
import { Provider } from "react-redux"

import history from "./js/history"
import configureStore from "./js/store/configure-store"  //将store导入进来
import hideLoader from "./js/loader"
import App from "./js/App"

const store = configureStore()

ReactDOM.render(
  //监听函数设置为render，每次state的改变都会导致网页重新渲染
  <Provider store={store}>  
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
)

hideLoader()
