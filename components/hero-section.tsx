"use client"

export default function HeroSection() {
  return (
    <div className="hero-gradient min-h-screen relative overflow-hidden snap-start">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-blue-500">Discover the HORN you</span><br />
                <span className="text-blue-600">own,</span><br />
                <span className="text-blue-500">sharpen it,</span><br />
                <span className="text-blue-600">sharpen, sharpen it.</span>
              </h1>
            </div>

            <div className="space-y-4">
              <div className="text-3xl md:text-4xl text-gray-800 font-medium">
                Are you ready?<br />
                The <span className="text-blue-600">SAI</span> has arrived.
              </div>
            </div>
          </div>

          {/* Right Content - 3D Model Placeholder */}
          <div className="flex justify-center items-center">
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
          <div className="hilowave-text text-center lg:text-left">HILOWAVE</div>
        </div>

        {/* Bottom Indicator */}
        <div className="flex justify-center mt-8">
          <div className="w-16 h-1 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
