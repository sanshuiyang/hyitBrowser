import React from "react"
import { connect } from "react-redux"
import { Scrollbars } from "react-custom-scrollbars"
import * as actionsBuckets from "./actions"
import { getVisibleBuckets } from "./selectors"
import BucketContainer from "./BucketContainer"
import web from "../web"
import history from "../history"
// import { pathSlice } from "../utils"
import "../../css/BucketList.css"

export class BucketList extends React.Component {
  componentWillMount() {
    const { fetchBuckets, setBucketList, selectBucket } = this.props
    if (web.LoggedIn()) {
      fetchBuckets()
    } else {
      // const { bucket, prefix } = pathSlice(history.location.pathname)
      // if (bucket) {
      //   setBucketList([bucket])
      //   selectBucket(bucket, prefix)
      // } else {
      //   // console.log(`${location.pathname}login`);
      //   history.replace(`/hyit/model/login`)
      // }
      history.replace(`/login`)
    }
  }
  render() {
    const { visibleBuckets } = this.props
    return (
      <div className="fesl-inner outDiv">
        <Scrollbars
          renderTrackVertical={props => <div className="scrollbar-vertical" />}
        >
          <ul>
            {visibleBuckets.map(bucket => (
              <BucketContainer key={bucket} bucket={bucket} />
            ))}
          </ul>
        </Scrollbars>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    visibleBuckets: getVisibleBuckets(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBuckets: () => dispatch(actionsBuckets.fetchBuckets()),
    setBucketList: buckets => dispatch(actionsBuckets.setList(buckets)),
    selectBucket: (bucket, prefix) =>
      dispatch(actionsBuckets.selectBucket(bucket, prefix))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BucketList)
