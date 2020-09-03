import React from "react"
import Header from "./Header"
import ObjectsSection from "../objects/ObjectsSection"
import BucketPolicyModal from "../buckets/BucketPolicyModal"
import MakeBucketModal from "../buckets/MakeBucketModal"
import UploadModal from "../uploads/UploadModal"
import ObjectsBulkActions from "../objects/ObjectsBulkActions"
import Dropzone from "../uploads/Dropzone"

export const MainContent = () => (
  <div>
    <ObjectsBulkActions />
    {/* 适应屏幕 */}
    <Dropzone>
      {/* 头部 */}
      <Header />  
      <ObjectsSection />
    </Dropzone>
    {/* 添加桶模型 */}
    <MakeBucketModal /> 
    <BucketPolicyModal />

    {/* 上传文件，进度条 等 */}
    <UploadModal />
  </div>
)

export default MainContent
