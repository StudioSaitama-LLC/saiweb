"use client"

import { Home, Instagram, Mail, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  const navItems = [
    { icon: Home, label: "ホーム", href: "#top" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/wazaoippon/" },
    { icon: Mail, label: "お問い合わせ", href: "#contact" },
  ]

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`nav-pill rounded-full px-8 py-4 flex items-center justify-between min-w-fit transition-all duration-300 ${scrolled ? "bg-opacity-85 shadow-lg" : ""}`}
      >
        <div className="text-blue-500 font-semibold text-lg tracking-wide whitespace-nowrap">STUDIO SAITAMA</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4 ml-8">
          {navItems.map((item, index) => (
            <NavIcon key={index} icon={item.icon} href={item.href} />
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden ml-6 text-blue-500 hover:text-blue-600 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 nav-pill rounded-2xl p-6 min-w-[200px]">
          <div className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <NavIcon icon={item.icon} href={item.href} />
                <span className="text-sm text-gray-600 japanese-text">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function NavIcon({ icon: Icon, href }: { icon: any; href?: string }) {
  return (
    <a href={href} className="p-3 bg-blue-50 bg-opacity-70 rounded-full text-blue-500 hover:bg-blue-100 hover:text-blue-600 transition-all cursor-pointer backdrop-blur-sm">
      <Icon size={20} />
    </a>
  )
}
