import { Home, Instagram, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">STUDIO SAITAMA</h3>
            <p className="text-blue-200 japanese-text leading-relaxed">
              AI技術とクリエイティブが融合した、革新的なソリューションを提供する会社です。
              冷めかけた熱を、もう一度育て直します。
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Services</h4>
            <ul className="space-y-2 text-blue-200">
              <li>AI Development</li>
              <li>Product Design</li>
              <li>Branding</li>
              <li>Web Development</li>
              <li>Mobile App</li>
              <li>Data Analytics</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold japanese-text">お問い合わせ</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Home size={20} className="text-blue-300" />
                <span className="text-blue-200 japanese-text">埼玉県さいたま市</span>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram size={20} className="text-blue-300" />
                <span className="text-blue-200">@studio_saitama</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-blue-300" />
                <span className="text-blue-200">contact@studio-saitama.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-12 pt-8 text-center">
          <p className="text-blue-300">© 2024 Studio Saitama. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
