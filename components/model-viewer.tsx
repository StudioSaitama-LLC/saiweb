'use client';

import * as React from "react"
import dynamic from 'next/dynamic'
import { useEffect, useState } from "react";

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
        'disable-pan'?: boolean;
        'disable-zoom'?: boolean;
        'disable-tap'?: boolean;
        reveal?: string;
      }, HTMLElement>;
    }
  }
}

const ModelViewerComponent = () => {
  const [mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => setMobile(typeof window !== "undefined" && window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <model-viewer
      src="/suigetsu-rhino.glb"
      alt="水月の3Dモデル"
      auto-rotate
      shadow-intensity="1"
      rotation-per-second="60deg"
      reveal={!mobile ? "auto" : undefined}
      {...(!mobile && { "camera-controls": true })}
      {...(mobile && { "disable-pan": true, "disable-zoom": true, "disable-tap": true })}
      style={{ width: '100%', height: '100%' }}
      onLoad={() => setLoading(false)}
    />
  );
}

// クライアントサイドのみでレンダリング
const ModelViewer = dynamic(() => Promise.resolve(ModelViewerComponent), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-200 animate-pulse" />
});

export default ModelViewer; 