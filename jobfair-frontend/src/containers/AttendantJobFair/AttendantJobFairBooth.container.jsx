import React, { useEffect, useState } from 'react'
import {addVideoTexture, fixTextureOffset, loadModel} from '../../utils/glbModelUtil'
import { CompanyBoothCanvasComponent } from '../../components/AttendantJobFair/CompanyBoothCanvas.component'
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
    const glb = await loadModel(url)
    for (const mesh of glb.scene.children) {
      addVideoTexture(mesh, companyBoothLayoutVideos)
      fixTextureOffset(mesh)
    }
    setBoothMesh(glb.scene)
  }, [])
  if (boothMesh === null) return null
  return <CompanyBoothCanvasComponent boothMesh={boothMesh} />
}
