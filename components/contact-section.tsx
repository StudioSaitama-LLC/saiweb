"use client"

import type React from "react"

import { useState } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    email: "",
    title: "",
    content: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div id="contact" className="hero-gradient py-24 snap-start">
      <div className="max-w-7xl mx-auto px-6">
        {/* Contact Title */}
        <div className="mb-16">
          <div className="hilowave-text text-left text-[clamp(40px,16vw,256px)]">CONTACT</div>
        </div>
        {/* Contact Form */}
        <div className="max-w-4xl mx-auto">
          <div className="nav-pill rounded-3xl p-8 md:p-12">
            <form action="https://formspree.io/f/xgvyoboy" method="POST" className="space-y-8">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-blue-600 mb-3 japanese-text">
                  メールアドレス
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white bg-opacity-80"
                  placeholder="your@email.com"
                />
              </div>

              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-lg font-medium text-blue-600 mb-3 japanese-text">
                  件名
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white bg-opacity-80"
                  placeholder="お問い合わせの件名を入力してください"
                />
              </div>

              {/* Content Field */}
              <div>
                <label htmlFor="content" className="block text-lg font-medium text-blue-600 mb-3 japanese-text">
                  お問い合わせ内容
                </label>
                <textarea
                  id="content"
                  name="content"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white bg-opacity-80 min-h-[120px]"
                  placeholder="お問い合わせ内容を入力してください"
                />
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 rounded-full transition-colors duration-300">
                送信
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
