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

import * as actionsCommon from "./actions"

export default (
  state = {
    sidebarOpen: false,
    storageInfo: { total: 0, free: 0 },
    serverInfo: {},
    showChangePasswordModal: false,
    accessKey: '',
    modalType: null,
    userInfo: {
      userName: "三水1",
      role: "student",
      class: "二班三班",
      department: "xxx学院",
      works: [
        {
          name: "三水的作业1",
          status: "completed",
          score: 97,
        },
        {
          name: "这是未完成的作业",
          status: "uncompleted",
          score: 0
        }
      ]
    }
  },
  action
) => {
  switch (action.type) {
    case actionsCommon.TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        sidebarOpen: !state.sidebarOpen
      })
    case actionsCommon.CLOSE_SIDEBAR:
      return Object.assign({}, state, {
        sidebarOpen: false
      })
    case actionsCommon.SET_STORAGE_INFO:
      return Object.assign({}, state, {
        storageInfo: action.storageInfo
      })
    case actionsCommon.SET_SERVER_INFO:
      return { ...state, serverInfo: action.serverInfo }
    case actionsCommon.SHOW_CHANGE_PASSWORD_MODAL:
      return {
        ...state,
        showChangePasswordModal: action.show
      }
    case actionsCommon.SHOW_WND_MODAL: {
      return Object.assign({}, state, {
        modalType: action.modalType
      })
    }
    default:
      return state
  }
}
