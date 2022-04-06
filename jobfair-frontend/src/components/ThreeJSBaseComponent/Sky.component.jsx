import { Sky, Stars } from '@react-three/drei'
import React from 'react'

const Morning = () => {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight intensity={0.4} position={[5, 1, 8]} />
      <Sky distance={450000} sunPosition={[5, 1, 8]} inclination={0} azimuth={0.25} />
    </>
  )
}

const Night = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Sky
        distance={3000}
        inclination={0.0}
        azimuth={0.25}
        turbidity={8}
        rayleigh={6}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      <Stars
        radius={100} // Radius of the inner sphere (default=100)
        depth={50} // Depth of area where stars should fit (default=50)
        count={5000} // Amount of stars (default=5000)
        factor={4} // Size factor (default=4)
        saturation={0} // Saturation 0-1 (default=0)
        fade // Faded dots (default=false)
      />
    </>
  )
}

const Sunset = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} position={[1, 0, 1]} />
      <Sky
        sunPosition={[1, 0, 1]}
        distance={3000}
        turbidity={8}
        rayleigh={6}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      <Stars
        radius={100} // Radius of the inner sphere (default=100)
        depth={50} // Depth of area where stars should fit (default=50)
        count={1000} // Amount of stars (default=5000)
        factor={4} // Size factor (default=4)
        saturation={0} // Saturation 0-1 (default=0)
        fade // Faded dots (default=false)
      />
    </>
  )
}

export const SkyType = {
  Night: 0,
  Sunset: 1,
  Morning: 2
}

export const SkyComponent = props => {
  const { style } = props
  switch (style) {
    case SkyType.Morning:
      return <Morning />
    case SkyType.Sunset:
      return <Sunset />
    case SkyType.Night:
      return <Night />
    default:
      return <Morning />
  }
}
