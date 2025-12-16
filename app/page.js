import Hero from '../components/Hero'
import PropertyCard from '../components/PropertyCard'
import { client } from '../lib/sanity'
import { featuredPropertiesQuery } from '../lib/queries'
import { Home, TrendingUp, Shield, Users, Building2, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 60

async function getFeaturedProperties() {
  try {
    const properties = await client.fetch(featuredPropertiesQuery)
    return properties
  } catch (error) {
    console.error('Error fetching featured properties:', error)
    return []
  }
}

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties()

  const companies = [
    { name: 'Google', logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' },
    { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
  ]

  const features = [
    {
      icon: Home,
      title: 'Wide Selection',
      description: 'Browse through hundreds of verified properties across the UK with detailed information',
    },
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Get real-time market data and property valuations from industry experts',
    },
    {
      icon: Shield,
      title: 'Secure Process',
      description: 'Safe and transparent transaction process with legal support every step',
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Dedicated team of real estate professionals available 24/7 to assist you',
    },
  ]

  return (
    <div>
      <Hero />

      {/* Trusted Companies Section */}
      <section className="py-12 bg-white border-y border-neutral-100">
        <div className="container-custom">
          <p className="text-center text-neutral-600 mb-8">
            Trusted by 100+ Companies across the globe!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all">
            {companies.map((company, index) => (
              <div key={index} className="h-8">
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={120}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=500&fit=crop"
                      alt="Modern living room"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=500&fit=crop"
                      alt="Bedroom interior"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Badge */}
              <div className="absolute -top-4 -right-4 bg-primary-600 text-white rounded-full w-32 h-32 flex items-center justify-center text-center shadow-2xl">
                <div>
                  <p className="text-xs">Since 2022</p>
                  <p className="text-2xl font-bold">Real</p>
                  <p className="text-xs">Estate</p>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-6">
              <div>
                <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                  WHO ARE WE
                </p>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Assisting individuals in locating the appropriate real estate.
                </h2>
                <p className="text-lg text-neutral-600 mb-8">
                  We are a dedicated team of real estate professionals committed to helping you find your perfect property. 
                  With years of experience and deep market knowledge, we make your property journey seamless and successful.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  'Expert guidance from certified professionals',
                  'Access to exclusive property listings',
                  'Transparent pricing with no hidden fees',
                  'Complete legal and documentation support'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-block px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {featuredProperties.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                FEATURED PROPERTIES
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Discover Our Best Properties
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Hand-picked properties that match your lifestyle and budget preferences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/properties"
                className="inline-block px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
              >
                View All Properties
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
              OUR SERVICES
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Why Choose PlEstate
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We provide exceptional service to make your property journey smooth and successful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-neutral-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Join thousands of happy homeowners who found their perfect property with PlEstate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/properties?status=sale"
              className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Browse Properties
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}