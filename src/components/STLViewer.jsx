"use client";
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

function Model({ url }) {
  const geom = useLoader(STLLoader, url);
  return (
    <mesh geometry={geom}>
      <meshStandardMaterial color="#0ea5e9" attach="material" />
    </mesh>
  );
}

export default function STLViewer({ url }) {
  return (
    <div className="glass-panel" style={{ height: '500px', width: '100%', borderRadius: '16px', overflow: 'hidden', marginBottom: '2rem' }}>
      <Canvas shadows camera={{ position: [0, 0, 150], fov: 50 }}>
        <Suspense fallback={<axesHelper args={[50]} />}>
          <Stage environment="city" intensity={0.5}>
            <Model url={url} />
          </Stage>
        </Suspense>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
