/*
 * Minio Cloud Storage (C) 2018 Minio, Inc.
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
import { Route, Switch } from "react-router-dom"
import Loadable from "./loadable";

const Login = Loadable(() => import("./browser/Login"));
const Register = Loadable(() => import("./browser/Register"));
const Browser = Loadable(() => import("./browser/Browser"));
const WndModal = Loadable(() => import("./wndModal"));
const TestCom =Loadable(()=>import("./testCom"));

export const App = () => {
  return (
    <>
      <Switch>
        <Route path={`/test`} component={TestCom} />
        <Route path={`/login`} component={Login} />
        <Route path={`/register`} component={Register} />
        <Route path={"/:bucket?/*"} component={Browser} />
      </Switch>
      <WndModal />
    </>
  )
}

export default App
