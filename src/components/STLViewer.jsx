"use client";
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

function Model({ url, rotation }) {
  const extension = url.split('.').pop().toLowerCase();
  const Loader = extension === 'obj' ? OBJLoader : STLLoader;
  const geomOrGroup = useLoader(Loader, url);

  const objGroup = React.useMemo(() => {
    if (extension === 'obj') {
      const cloned = geomOrGroup.clone();
      cloned.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({ color: "#0ea5e9" });
        }
      });
      return cloned;
    }
    return null;
  }, [geomOrGroup, extension]);

  return (
    <group rotation={rotation || [-Math.PI / 2, 0, 0]}>
      {extension === 'obj' ? (
        <primitive object={objGroup} />
      ) : (
        <mesh geometry={geomOrGroup}>
          <meshStandardMaterial color="#0ea5e9" attach="material" />
        </mesh>
      )}
    </group>
  );
}

export default function STLViewer({ url, rotation }) {
  return (
    <div className="glass-panel" style={{ height: '500px', width: '100%', borderRadius: '16px', overflow: 'hidden', marginBottom: '2rem' }}>
      <Canvas shadows camera={{ position: [0, 0, 150], fov: 50 }}>
        <Suspense fallback={<axesHelper args={[50]} />}>
          <Stage environment="city" intensity={0.5}>
            <Model url={url} rotation={rotation} />
          </Stage>
        </Suspense>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
