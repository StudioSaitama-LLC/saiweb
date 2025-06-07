'use client';

import * as React from "react"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src: string;
        alt: string;
        'auto-rotate'?: boolean;
        'camera-controls'?: boolean;
        'shadow-intensity'?: string;
        'camera-orbit'?: string;
        'min-camera-orbit'?: string;
        'max-camera-orbit'?: string;
        'rotation-per-second'?: string;
      }, HTMLElement>;
    }
  }
}

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