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

import JSONrpc from './jsonrpc'
import Moment from 'moment'
import storage from 'local-storage-fallback'
import history from "./history"

class Web {
  constructor(endpoint) {
    const namespace = 'Web'
    this.getTokenTime = Date.parse(new Date()) / 1000;
    this.JSONrpc = new JSONrpc({
      endpoint,
      namespace
    })
  }
  makeCall(method, options) {
    return this.JSONrpc.call(method, {
      params: options
    }, storage.getItem('token'))
      .catch(err => {
        if (err.status === 401) {
          storage.removeItem('token')
          // location.reload()
          throw new Error('错误,请重新登录.')
        }
        if (err.status) {
          throw new Error(`服务器返回的错误： [${err.status}]`)
        }
        throw new Error('服务器不可访问')
      })
      .then(res => {
        this.CheckTokenTime();
        let json = JSON.parse(res.text)
        console.log(json);
        let error = json.error
        if (error) {
          throw new Error(error.message)
        }
        if (json.result === undefined) {
          return json;
        }
        let result = json.result

        if (!Moment(result.uiVersion).isValid()) {
          throw new Error("JSON-RPC响应中的UI版本无效")
        }
        return result
      })
  }
  LoggedIn() {
    return storage.getItem('token') ? true : false;
  }
  Login(args) {
    return this.makeCall('Login', args)
      .then(res => {
        console.log(res);
        storage.setItem('token', `${res.token}`)
        return res
      })
  }
  Register(args) {
    return this.makeCall('register', args)
      .then(res => {
        return res;
      })
  }
  RegisterOtherInfo(args) {
    return this.makeCall('registerOtherInfo', args)
      .then(res => {
        return res;
      })
  }
  Logout() {
    storage.removeItem('userName');
    storage.removeItem('token');
  }
  ServerInfo() {
    return this.makeCall('ServerInfo')
  }
  GetInfo() {
    return this.makeCall('getInfo');
  }
  StorageInfo() {
    return this.makeCall('StorageInfo')
  }
  PublicGet() {
    return this.makeCall('PublicGet')
  }
  ListBuckets() {
    return this.makeCall('ListBuckets')
  }
  MakeBucket(args) {
    return this.makeCall('MakeBucket', args)
  }
  MakeObjectFile(args) {
    return this.makeCall('MakeObjectFile', args);
  }
  DeleteBucket(args) {
    return this.makeCall('DeleteBucket', args)
  }
  ListObjects(args) {
    return this.makeCall('ListObjects', args)
  }
  PresignedGet(args) {
    return this.makeCall('PresignedGet', args)
  }
  RemoveObject(args) {
    return this.makeCall('RemoveObject', args)
  }
  GetAuth() {
    return this.makeCall('GetAuth')
  }
  GenerateAuth() {
    return this.makeCall('GenerateAuth')
  }
  SetAuth(args) {
    return this.makeCall('SetAuth', args)
      .then(res => {
        this.getTokenTime = Date.parse(new Date()) / 1000;
        storage.setItem('token', `${res.token}`)
        return res
      })
  }
  CreateURLToken() {
    return this.makeCall('CreateURLToken')
  }
  GetBucketPolicy(args) {
    return this.makeCall('GetBucketPolicy', args)
  }
  SetBucketPolicy(args) {
    return this.makeCall('SetBucketPolicy', args)
  }
  ListAllBucketPolicies(args) {
    return this.makeCall('ListAllBucketPolicies', args)
  }
  CheckTokenTime() {
    let currentTime = Date.parse(new Date()) / 1000;
    if ((currentTime - this.getTokenTime) < 6800) {
      return;
    }

    if (storage.getItem('token') === '') {
      history.replace("/login")
    }

    this.JSONrpc.call("GetAuth", {
      params: ''
    }, storage.getItem('token'))
      .catch(err => {
        if (err.status === 401) {
          storage.removeItem('token')
          throw new Error('错误,请重新登录.')
        }
        if (err.status) {
          throw new Error(`服务器返回的错误： [${err.status}]`)
        }
        throw new Error('服务器不可访问')
      })
      .then(res => {
        // console.log(JSON.stringify(res.body));
      })
  }
  Refuse(args) {
    console.log("拒绝信息：" + args);
  }
  Agree(args) {
    console.log("同意加入：" + args);
  }
  FetchMsgList() {
    console.log("拉取未处理信息列表。");
  }
  FetchWorkInfo(){
    console.log("拉取当前选中作品的信息。");
  }
}

//http://103.61.39.178:21011/api/v1/model/webrpc
const web = new Web(`${window.location.protocol}//${window.location.host}/api/v1/model/webrpc`);

export default web;