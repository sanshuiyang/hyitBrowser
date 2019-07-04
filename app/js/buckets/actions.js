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

import web from "../web"
import history from "../history"
import * as alertActions from "../alert/actions"
import * as objectsActions from "../objects/actions"
import { pathSlice } from "../utils"

export const SET_LIST = "buckets/SET_LIST"
export const ADD = "buckets/ADD"
export const REMOVE = "buckets/REMOVE"
export const SET_FILTER = "buckets/SET_FILTER"
export const SET_CURRENT_BUCKET = "buckets/SET_CURRENT_BUCKET"
export const SHOW_MAKE_BUCKET_MODAL = "buckets/SHOW_MAKE_BUCKET_MODAL"
export const SHOW_BUCKET_POLICY = "buckets/SHOW_BUCKET_POLICY"
export const SET_POLICIES = "buckets/SET_POLICIES"

export const fetchBuckets = () => {
  return function (dispatch) {
    return web.ListBuckets().then(res => {
      const buckets = res.objects ? res.objects.map(bucket => bucket.name) : []
      for (let i = 0; i < buckets.length; i++) {
        if (buckets[i].indexOf('/') !== -1) {
          buckets[i] = buckets[i].substr(0, buckets[i].length - 1);
        }
        if (buckets[i] === "public") {
          let temp = buckets[i];
          buckets[i] = buckets[0];
          buckets[0] = temp;
        }
      }
      dispatch(setList(buckets));
      if (buckets.length > 0) {
        const { bucket, prefix } = pathSlice(history.location.pathname)
        if (bucket && buckets.indexOf(bucket) > -1) {
          dispatch(selectBucket(bucket, prefix))
        } else {
          dispatch(selectBucket(buckets[0]))
        }
      } else {
        dispatch(selectBucket(""))
        history.push("/")
      }
    })
  }
}

export const setList = buckets => {
  return {
    type: SET_LIST,
    buckets
  }
}

export const setFilter = filter => {
  return {
    type: SET_FILTER,
    filter
  }
}

export const selectBucket = (bucket, prefix) => {
  return function (dispatch) {
    dispatch(setCurrentBucket(bucket))
    dispatch(objectsActions.selectPrefix(prefix || ""))
  }
}

export const setCurrentBucket = bucket => {
  return {
    type: SET_CURRENT_BUCKET,
    bucket
  }
}

export const makeBucket = bucketName => {
  return function (dispatch) {
    return web
      .MakeBucket({
        bucketName: bucketName
      })
      .then(() => {
        dispatch(addBucket(bucketName))
        dispatch(selectBucket(bucketName))
      })
      .catch(err =>
        dispatch(
          alertActions.set({
            type: "danger",
            message: err.message
          })
        )
      )
  }
}

export const makeObjectFile = objectFile => {
  return function (dispatch) {
    return web
      .MakeObjectFile({
        bucket: `${objectFile.bucketName}`,
        param: `${objectFile.param}`,
        method: "bucket.mkdir"
      })
      .then(() => {
        dispatch(selectBucket(objectFile.bucketName, objectFile.param + '/'))
      })
      .catch(err =>
        dispatch(
          alertActions.set({
            type: "danger",
            message: err.message
          })
        )
      )
  }
}

export const deleteBucket = bucket => {
  return function (dispatch) {
    return web
      .DeleteBucket({
        bucketName: bucket
      })
      .then((res) => {
        dispatch(
          alertActions.set({
            type: "info",
            message: "文件夹 '" + bucket + "'已经被删除"
          })
        )
        dispatch(removeBucket(bucket))
        dispatch(fetchBuckets())
      })
      .catch(err => {
        dispatch(
          alertActions.set({
            type: "danger",
            message: err.message
          })
        )
      })
  }
}

export const addBucket = bucket => ({
  type: ADD,
  bucket
})

export const removeBucket = bucket => ({
  type: REMOVE,
  bucket
})

export const showMakeBucketModal = () => ({
  type: SHOW_MAKE_BUCKET_MODAL,
  show: true
})

export const hideMakeBucketModal = () => ({
  type: SHOW_MAKE_BUCKET_MODAL,
  show: false
})

export const fetchPolicies = bucket => {
  return function (dispatch) {
    return web
      .ListAllBucketPolicies({
        bucketName: bucket
      })
      .then(res => {
        let policies = res.policies
        if (policies)
          dispatch(setPolicies(policies))
        else
          dispatch(setPolicies([]))
      })
      .catch(err => {
        dispatch(
          alertActions.set({
            type: "danger",
            message: err.message
          })
        )
      })
  }
}

export const setPolicies = policies => ({
  type: SET_POLICIES,
  policies
})

export const showBucketPolicy = () => ({
  type: SHOW_BUCKET_POLICY,
  show: true
})

export const hideBucketPolicy = () => ({
  type: SHOW_BUCKET_POLICY,
  show: false
})
