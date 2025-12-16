'use client'

import { Home, Key, Calculator, FileText, Users, TrendingUp, Shield, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export default function ServicesPage() {
  const mainServices = [
    {
      icon: Home,
      title: 'Property Sales',
      description: 'Expert guidance in buying and selling residential and commercial properties across the UK.',
      image: '/2149360591.jpg',
      features: [
        'Free property valuations',
        'Professional photography',
        'Virtual tours',
        'Marketing across major portals',
        'Viewings management',
        'Negotiation support'
      ]
    },
    {
      icon: Key,
      title: 'Property Lettings',
      description: 'Comprehensive lettings service for landlords and tenants with full management options.',
      image: '/2149360648.jpg',
      features: [
        'Tenant finding service',
        'Full property management',
        'Rent collection',
        'Property maintenance',
        'Legal compliance',
        'Inventory services'
      ]
    },
    {
      icon: Calculator,
      title: 'Property Valuations',
      description: 'Accurate property valuations from our experienced team of qualified surveyors.',
      image: '/2149377154.jpg',
      features: [
        'Free market appraisals',
        'RICS valuations',
        'Investment analysis',
        'Market reports',
        'Rental valuations',
        'Development appraisals'
      ]
    },
    {
      icon: FileText,
      title: 'Legal Services',
      description: 'Complete conveyancing and legal support throughout your property transaction.',
      image: '/2151469863.jpg',
      features: [
        'Conveyancing services',
        'Contract reviews',
        'Lease agreements',
        'Property searches',
        'Title deeds',
        'Legal advice'
      ]
    },
  ]

  const additionalServices = [
    {
      icon: Users,
      title: 'Property Management',
      description: 'Full property management for landlords'
    },
    {
      icon: TrendingUp,
      title: 'Investment Advice',
      description: 'Expert guidance on property investments'
    },
    {
      icon: Shield,
      title: 'Insurance Services',
      description: 'Home and landlord insurance options'
    },
    {
      icon: Calculator,
      title: 'Mortgage Advice',
      description: 'Independent mortgage broker services'
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
              OUR SERVICES
            </p>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Comprehensive Real Estate Solutions
            </h1>
            <p className="text-xl text-neutral-600">
              From property sales to lettings and valuations, we offer a complete range of services 
              to meet all your property needs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-12">
            {mainServices.map((service, index) => {
              const Icon = service.icon
              return (
                <div 
                  key={index} 
                  className="grid lg:grid-cols-2 gap-8 items-center bg-gradient-to-br from-neutral-50 to-white p-8 md:p-12 rounded-3xl shadow-lg hover:shadow-xl transition-all"
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-neutral-600 mb-6">
                      {service.description}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0" />
                          <span className="text-neutral-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`relative h-80 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
              MORE SERVICES
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Additional Support Services
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We partner with trusted professionals to offer comprehensive support throughout your property journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                    <Icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-neutral-600">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
              HOW WE WORK
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Our Simple 4-Step Process
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', description: 'We discuss your needs and requirements in detail' },
              { step: '02', title: 'Property Search', description: 'We find properties that match your criteria' },
              { step: '03', title: 'Viewings', description: 'We arrange and accompany you to viewings' },
              { step: '04', title: 'Completion', description: 'We support you through to completion' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-700 to-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Let's Get Started
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Contact us today to discuss how we can help with your property needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Contact Us
            </a>
            <a
              href="/properties"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all"
            >
              View Properties
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}