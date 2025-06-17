'use client';

import * as React from "react"
import dynamic from 'next/dynamic'

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

const ModelViewerComponent = () => {
  return (
    <model-viewer
      src="/rhino-suigetsu.glb"
      alt="水月の3Dモデル"
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

// クライアントサイドのみでレンダリング
const ModelViewer = dynamic(() => Promise.resolve(ModelViewerComponent), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-200 animate-pulse" />
});

export default ModelViewer; 