import React, { useEffect, useState } from 'react'
import {addVideoTexture, fixTextureOffset, loadGLBModel} from '../../utils/threeJSUtil'
import {
  CompanyBoothCanvasComponent,
  CompanyBoothCanvasContainer
} from '../../components/AttendantJobFair/CompanyBoothCanvas.component'
import { getCompanyBoothLatestLayout } from '../../services/company-booth-layout-controller/CompanyBoothLayoutControllerService'

export const AttendantJobFairBoothContainer = props => {
  const { companyBoothId } = props
  const [boothMesh, setBoothMesh] = useState(null)
  useEffect(async () => {
    const response = await getCompanyBoothLatestLayout(companyBoothId)
    const companyBoothLayoutVideos = {}
    const url = response.data.url
    response.data.companyBoothLayoutVideos?.forEach(data => {
      companyBoothLayoutVideos[data.itemName] = data.url;
    })
    const glb = await loadGLBModel(url)
    for (const mesh of glb.scene.children) {
      addVideoTexture(mesh, companyBoothLayoutVideos)
      fixTextureOffset(mesh)
    }
    setBoothMesh(glb.scene)
  }, [])
  if (boothMesh === null) return null
  return <CompanyBoothCanvasContainer boothMesh={boothMesh} />
}
