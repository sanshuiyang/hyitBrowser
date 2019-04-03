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

//动画
let delay = [0, 400]

function handleLoader(i) {
  if (i < 2) {
    setTimeout(function() {
      document.querySelector(".page-load").classList.add("pl-" + i)
      handleLoader(i + 1)
    }, delay[i])
  }
}

const hideLoader = () => handleLoader(0)

export default hideLoader
