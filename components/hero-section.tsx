"use client"

import Script from 'next/script'
import dynamic from 'next/dynamic'

const ModelViewer = dynamic(() => import('./model-viewer'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-200 animate-pulse" />
})

export default function HeroSection() {
  return (
    <>
      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
      />
      <div className="hero-gradient min-h-screen relative overflow-hidden snap-start">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="flex flex-col lg:flex-row gap-12 items-center min-h-[60vh]">
            {/* Left Content */}
            <div className="space-y-8 w-full pt-0 sm:pt-4">
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="text-blue-500">Discover the HORN you</span><br />
                  <span className="text-blue-600">own,</span><br />
                  <span className="text-blue-500">sharpen it,</span><br />
                  <span className="text-blue-600">sharpen, sharpen it.</span>
                </h1>
              </div>
              <div className="space-y-4">
                <div className="text-lg sm:text-xl md:text-3xl text-gray-800 font-medium">
                  We're <span className="text-[#3B82F6]">SAI</span>.<br />
                  And so are you.
                </div>
              </div>
            </div>
            {/* 3D Model - PC時は右カラムに表示 */}
            <div className="hidden lg:flex justify-center items-center w-full mt-56">
              <div className="relative flex justify-center items-center w-[350px] h-[450px]">
                <div className="absolute inset-0 scale-[2.625] origin-center pointer-events-none">
                  <div className="w-full h-full flex justify-center items-center pointer-events-auto">
                    <ModelViewer />
                  </div>
                </div>
              </div>
            </div>
            {/* 3Dモデル - モバイル時はテキスト下に表示し、幅を調整 */}
            <div className="flex justify-center items-center mt-8 lg:hidden w-full">
              <div className="w-full max-w-xs sm:max-w-sm h-[300px] mt-16" style={{ transform: 'scale(1.2)' }}>
                <ModelViewer />
              </div>
            </div>
          </div>

          {/* STUDIO SAITAMA左揃え・大きく・さらに下に配置 */}
          <div className="mt-56 mb-8 flex flex-col items-start justify-center px-0">
            <span className="font-extrabold text-[#3B82F6] text-left leading-[0.9] tracking-[-0.02em] font-inter block" style={{fontSize: 'clamp(80px,18vw,236px)'}}>STUDIO</span>
            <span className="font-extrabold text-[#3B82F6] text-left leading-[0.9] tracking-[-0.02em] font-inter block" style={{fontSize: 'clamp(80px,18vw,236px)'}}>SAITAMA</span>
          </div>

          {/* Bottom Indicator */}
          <div className="flex justify-center mt-8">
            <div className="w-16 h-1 bg-gray-800 rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  )
}
