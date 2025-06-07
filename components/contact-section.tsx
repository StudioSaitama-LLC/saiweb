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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ email: "", title: "", content: "" })
  }

  return (
    <div id="contact" className="hero-gradient py-24 snap-start">
      <div className="max-w-7xl mx-auto px-6">
        {/* Contact Title */}
        <div className="mb-16">
          <div className="hilowave-text text-left text-[84px] sm:text-[128px] md:text-[192px] lg:text-[256px]">CONTACT</div>
        </div>
        {/* Contact Form */}
        <div className="max-w-4xl mx-auto">
          <div className="nav-pill rounded-3xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-blue-600 mb-3 japanese-text">
                  メールアドレス
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white bg-opacity-80"
                  placeholder="お問い合わせの件名を入力してください"
                />
              </div>

              {/* Content Field */}
              <div>
                <label htmlFor="content" className="block text-lg font-medium text-blue-600 mb-3 japanese-text">
                  内容
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white bg-opacity-80 resize-vertical"
                  placeholder="お問い合わせ内容を詳しくご記入ください"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  送信
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
