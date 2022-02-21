import React from 'react'
import Mesh from './Mesh'
const MeshFamily = props => {
  const { meshData } = props
  return (
    <>
      <Mesh prop={meshData} />
      {meshData.childres && // prettier-ignore
        meshData.childres.map(mesh => <MeshFamily meshData={mesh} />)}
    </>
  )
}
export default MeshFamily
