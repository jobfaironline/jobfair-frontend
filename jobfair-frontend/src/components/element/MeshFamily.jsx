import React from 'react'
import Mesh from './Mesh'
const MeshFamily = props => {
  const { meshData } = props
  return (
    <>
      <Mesh prop={meshData} />;
      {meshData.childres &&
        meshData.childres.map((mesh, index) => <MeshFamily meshData={mesh} />)}
    </>
  )
}
export default MeshFamily
