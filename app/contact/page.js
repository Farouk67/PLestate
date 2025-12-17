'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ type: 'success', message: data.message || 'Message sent successfully!' })
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again.' })
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please email us directly at info@plestate.com' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Get in <span className="text-primary-600">Touch</span>
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Have questions about a property or our services? We're here to help you find your perfect home.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information Cards */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
              <MapPin className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Visit Us</h3>
            <p className="text-neutral-600">
              123 Property Lane<br />
              London, UK<br />
              SW1A 1AA
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
              <Phone className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Call Us</h3>
            <a 
              href="tel:+442012345678" 
              className="text-neutral-600 hover:text-primary-600 transition-colors block mb-2"
            >
              +44 20 1234 5678
            </a>
            <a 
              href="tel:+442087654321" 
              className="text-neutral-600 hover:text-primary-600 transition-colors block"
            >
              +44 20 8765 4321
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
              <Mail className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Email Us</h3>
            <a 
              href="mailto:info@plestate.com" 
              className="text-neutral-600 hover:text-primary-600 transition-colors block mb-2"
            >
              info@plestate.com
            </a>
            <p className="text-sm text-neutral-500 mt-2">
              We'll respond within 24 hours
            </p>
          </div>
        </div>

        {/* Office Hours */}
        <div className="bg-primary-50 rounded-2xl p-8 mb-12">
          <div className="flex items-center justify-center mb-6">
            <Clock className="w-8 h-8 text-primary-600 mr-3" />
            <h2 className="text-2xl font-bold">Office Hours</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-semibold text-lg mb-2">Monday - Friday</p>
              <p className="text-neutral-600">9:00 AM - 6:00 PM</p>
            </div>
            <div>
              <p className="font-semibold text-lg mb-2">Saturday</p>
              <p className="text-neutral-600">10:00 AM - 4:00 PM</p>
            </div>
            <div>
              <p className="font-semibold text-lg mb-2">Sunday</p>
              <p className="text-neutral-600">Closed</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-2 text-center">Send us a Message</h2>
            <p className="text-neutral-600 text-center mb-8">
              Fill out the form below and we'll get back to you as soon as possible
            </p>

            {status.message && (
              <div className={`mb-6 p-4 rounded-lg ${
                status.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Smith"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+44 123 456 7890"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Property inquiry"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us about your property needs..."
                  className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>

              <p className="text-sm text-neutral-500 text-center">
                By submitting this form, you agree to our privacy policy. 
                Your information will be sent to <strong>info@plestate.com</strong>
              </p>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Us on the Map</h2>
            <p className="text-lg text-neutral-600">
              Visit our office in London for personalized property consultation
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative w-full" style={{ height: '500px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.5282788754093!2d-0.12765492346711107!3d51.50735097181325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2sLondon%2C%20UK!5e0!3m2!1sen!2s!4v1702912345678!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
            
            {/* Map Overlay Info */}
            <div className="p-6 bg-gradient-to-r from-primary-700 to-primary-600 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Promised Land Estate</h3>
                    <p className="opacity-90">123 Property Lane, London, UK, SW1A 1AA</p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/dir//London,+UK/@51.5072178,-0.1275862,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:shadow-xl transition-all text-center"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Prefer to Talk Directly?</h2>
          <p className="text-xl mb-6 opacity-90">
            Our team is ready to answer your questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+442012345678"
              className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg hover:shadow-xl transition-all"
            >
              Call Now
            </a>
            <a
              href="mailto:info@plestate.com"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}