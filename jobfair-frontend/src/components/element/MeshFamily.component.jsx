import React from 'react'
import MeshComponent from './Mesh.component'
const MeshFamilyComponent = props => {
  const { meshData } = props
  return (
    <>
      <MeshComponent prop={meshData} />;
      {meshData.childres &&
        meshData.childres.map((mesh, index) => (
          <MeshFamilyComponent key={index} meshData={mesh} />
        ))}
    </>
  )
}
export default MeshFamilyComponent
