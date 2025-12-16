'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['Promised Land Estate', 'London, United Kingdom'],
      link: null
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+44 20 1234 5678', 'Mon-Fri: 9am-6pm'],
      link: 'tel:+442012345678'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@promisedlandestate.com', 'We reply within 24 hours'],
      link: 'mailto:info@promisedlandestate.com'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Monday - Friday: 9am - 6pm', 'Saturday: 10am - 4pm', 'Sunday: Closed'],
      link: null
    },
  ]

  const offices = [
    {
      name: 'London Office',
      address: 'Chelsea, London SW3 2RA',
      phone: '+44 20 1234 5678',
      email: 'london@promisedlandestate.com'
    },
    {
      name: 'Manchester Office',
      address: 'Northern Quarter, M3 6AP',
      phone: '+44 161 123 4567',
      email: 'manchester@promisedlandestate.com'
    },
    {
      name: 'Birmingham Office',
      address: 'Edgbaston, B15 3AA',
      phone: '+44 121 123 4567',
      email: 'birmingham@promisedlandestate.com'
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
              GET IN TOUCH
            </p>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-neutral-600">
              Have a question or ready to start your property journey? We're here to help.
              Get in touch with our friendly team today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <div key={index} className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      info.link && idx === 0 ? (
                        <a
                          key={idx}
                          href={info.link}
                          className="block text-primary-600 hover:text-primary-700 font-medium"
                        >
                          {detail}
                        </a>
                      ) : (
                        <p key={idx} className="text-neutral-600">{detail}</p>
                      )
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h2 className="text-3xl font-display font-bold mb-6">Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  Something went wrong. Please try again or call us directly.
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
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field"
                      placeholder="john@example.com"
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
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-field"
                      placeholder="+44 123 456 7890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="input-field"
                      placeholder="Property inquiry"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-field resize-none"
                    placeholder="Tell us about your property needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>

            {/* Map Placeholder & Offices */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-neutral-100 rounded-2xl overflow-hidden h-80 flex items-center justify-center">
                <div className="text-center text-neutral-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Map integration available</p>
                </div>
              </div>

              {/* Office Locations */}
              <div className="space-y-4">
                <h3 className="text-2xl font-display font-bold mb-4">Our Offices</h3>
                {offices.map((office, index) => (
                  <div key={index} className="bg-primary-50 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-2">{office.name}</h4>
                    <div className="space-y-1 text-neutral-600">
                      <p className="flex items-start">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        {office.address}
                      </p>
                      <p className="flex items-start">
                        <Phone className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <a href={`tel:${office.phone}`} className="hover:text-primary-600">
                          {office.phone}
                        </a>
                      </p>
                      <p className="flex items-start">
                        <Mail className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <a href={`mailto:${office.email}`} className="hover:text-primary-600">
                          {office.email}
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-neutral-600">Quick answers to common questions</p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: 'How quickly do you respond to inquiries?',
                a: 'We aim to respond to all inquiries within 24 hours during business days. Urgent matters are typically addressed within a few hours.'
              },
              {
                q: 'Do you charge for property valuations?',
                a: 'We offer free market appraisals for properties you\'re considering selling or letting. Formal RICS valuations are charged based on the property type.'
              },
              {
                q: 'What areas do you cover?',
                a: 'We cover major cities across the UK including London, Manchester, Birmingham, Edinburgh, and surrounding areas. Contact us to check coverage in your area.'
              },
              {
                q: 'Can I book a viewing online?',
                a: 'Yes! Each property listing has a "Contact Agent" button where you can request viewings. We\'ll confirm the appointment via email or phone.'
              },
            ].map((faq, index) => (
              <details key={index} className="bg-white p-6 rounded-xl shadow-md group">
                <summary className="font-bold text-lg cursor-pointer flex items-center justify-between">
                  {faq.q}
                  <span className="ml-4 text-primary-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-neutral-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}