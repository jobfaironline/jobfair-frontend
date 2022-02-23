/* eslint-disable no-unused-vars */
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'

export const handleDownloadModel = ref => {
  const exporter = new GLTFExporter()
  exporter.parse(
    ref.current.parent,
    // called when the gltf has been generated
    function (gltf) {
      const link = document.createElement('a')
      link.style.display = 'none'
      document.body.appendChild(link)
      const blob = new Blob([gltf], { type: 'application/octet-stream' })
      link.href = URL.createObjectURL(blob)
      link.download = 'scene.glb'
      link.click()
      document.body.removeChild(link)
    },
    // called when there is an error in the generation
    function (error) {
      console.log('An error happened')
    },
    {
      binary: true,
      trs: true
    }
  )
}
