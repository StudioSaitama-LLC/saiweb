"use client"

export default function HeroSection() {
  return (
    <div className="hero-gradient min-h-screen relative overflow-hidden snap-start">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
          {/* Left Content */}
          <div className="space-y-8 order-1 lg:order-none w-full pt-20 sm:pt-32">
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
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

            {/* 3D Model - モバイル時はテキスト下に表示し、幅を調整 */}
            <div className="flex justify-center items-center mt-8 lg:hidden">
              <div className="model-viewer-container w-full max-w-xs sm:max-w-sm">
                <div className="model-viewer-inner">
                  <div className="model-viewer-core"></div>
                </div>
                <div className="absolute bottom-4 text-gray-400 text-sm font-medium">3D Model will be here</div>
              </div>
            </div>
          </div>

          {/* 3D Model - PC時は右カラムに表示 */}
          <div className="hidden lg:flex justify-center items-center mt-12 order-2 w-full">
            <div className="model-viewer-container">
              <div className="model-viewer-inner">
                <div className="model-viewer-core"></div>
              </div>
              <div className="absolute bottom-16 text-gray-400 text-sm font-medium">3D Model will be here</div>
            </div>
          </div>
        </div>

        {/* HILOWAVE Text - Adjusted position */}
        <div className="mt-4 lg:mt-6">
          <div className="hilowave-text text-center lg:text-left text-[clamp(40px,16vw,84px)]">HILOWAVE</div>
        </div>

        {/* Bottom Indicator */}
        <div className="flex justify-center mt-8">
          <div className="w-16 h-1 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
