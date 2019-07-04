import React from 'react'
import BucketSearch from "../buckets/BucketSearch" //搜索栏
import BucketList from "../buckets/BucketList"//文件列表

import web from "../web"

export const MainLeftContent = () => {
    return (
        <div className="fes-list">
            {web.LoggedIn() && <BucketSearch />}
            <BucketList />
        </div>
    )
}

export default MainLeftContent