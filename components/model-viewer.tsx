'use client';

export default function ModelViewer() {
  return (
    <model-viewer
      src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
      alt="3Dモデル"
      auto-rotate
      camera-controls
      shadow-intensity="1"
      camera-orbit="0deg 75deg 105%"
      min-camera-orbit="auto auto 50%"
      max-camera-orbit="auto auto 150%"
      rotation-per-second="30deg"
      style={{ width: '100%', height: '100%' }}
    />
  );
} 