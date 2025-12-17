import Hero from '../components/Hero'
import FeaturedPropertiesSlider from '../components/FeaturedPropertiesSlider'
import PropertyCard from '../components/PropertyCard'
import { client } from '../lib/sanity'
import { Home, Users, Award, TrendingUp, Search, Heart, Shield, Clock, MapPin, CheckCircle } from 'lucide-react'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

async function getFeaturedProperties() {
  const query = `*[_type == "property" && featured == true] | order(_createdAt desc)[0...6]{
    _id,
    title,
    slug,
    price,
    currency,
    propertyType,
    status,
    bedrooms,
    bathrooms,
    area,
    location,
    images,
    featured
  }`
  
  try {
    const properties = await client.fetch(query)
    return properties || []
  } catch (error) {
    console.error('Error fetching featured properties:', error)
    return []
  }
}

async function getRecentProperties() {
  const query = `*[_type == "property"] | order(_createdAt desc)[0...3]{
    _id,
    title,
    slug,
    price,
    currency,
    propertyType,
    status,
    bedrooms,
    bathrooms,
    area,
    location,
    images,
    featured
  }`
  
  try {
    const properties = await client.fetch(query)
    return properties || []
  } catch (error) {
    console.error('Error fetching recent properties:', error)
    return []
  }
}

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties()
  const recentProperties = await getRecentProperties()

  return (
    <div className="min-h-screen">
      {/* Featured Properties Hero Slider */}
      {featuredProperties.length > 0 ? (
        <FeaturedPropertiesSlider properties={featuredProperties} />
      ) : (
        // Fallback Hero with Search
        <Hero />
      )}

      {/* About Section with Images */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src="/2149360591.jpg"
                    alt="Luxury Property"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src="/1982.jpg"
                    alt="Modern Interior"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src="/2149360648.jpg"
                    alt="Beautiful Home"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src="/2149377154.jpg"
                    alt="Property View"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                ABOUT PROMISED LAND ESTATE
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Your Trusted Partner in Finding the Perfect Home
              </h2>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                With years of experience in the UK property market, Promised Land Estate has helped hundreds of families find their dream homes. Our commitment to excellence and personalized service sets us apart.
              </p>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Whether you're buying your first home, upgrading to a larger space, or looking for an investment property, our expert team is here to guide you every step of the way.
              </p>

              {/* Key Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Expert Guidance</h3>
                    <p className="text-neutral-600">Professional advice from certified real estate specialists</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Transparent Process</h3>
                    <p className="text-neutral-600">Clear pricing with no hidden fees or surprises</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Full Support</h3>
                    <p className="text-neutral-600">Complete legal and documentation assistance</p>
                  </div>
                </div>
              </div>

              <a
                href="/about"
                className="inline-block px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
              >
                Learn More About Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
              OUR SERVICES
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Why Choose Promised Land Estate
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We provide exceptional service to make your property journey smooth and successful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Search,
                title: 'Wide Selection',
                description: 'Browse through hundreds of verified properties across the UK with detailed information',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: TrendingUp,
                title: 'Market Insights',
                description: 'Get real-time market data and property valuations from industry experts',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: Shield,
                title: 'Secure Process',
                description: 'Safe and transparent transaction process with legal support every step',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: Users,
                title: 'Expert Support',
                description: 'Dedicated team of real estate professionals available 24/7 to assist you',
                color: 'from-orange-500 to-orange-600'
              },
            ].map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent Properties Section */}
      {recentProperties.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                LATEST LISTINGS
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Recently Added Properties
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Discover our newest property listings across the UK
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="/properties"
                className="inline-block px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
              >
                View All Properties
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Image Banner with Overlay Text */}
      <section className="relative h-96 bg-neutral-900">
        <Image
          src="/2151469863.jpg"
          alt="Your Dream Home Awaits"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        <div className="relative h-full container-custom flex items-center">
          <div className="max-w-2xl text-white">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Your Dream Home is Just a Click Away
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start your property search today with Promised Land Estate
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/properties"
                className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-all shadow-xl text-center"
              >
                Browse Properties
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg hover:shadow-xl transition-all text-center"
              >
                Schedule Viewing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Find Your Perfect Home?
            </h2>
            <p className="text-xl text-neutral-600 mb-8">
              Let our experienced team help you navigate the property market with confidence
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Quick Response</h3>
                <p className="text-neutral-600">Get answers within 24 hours</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Personalized Service</h3>
                <p className="text-neutral-600">Tailored to your unique needs</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">UK-Wide Coverage</h3>
                <p className="text-neutral-600">Properties across England, Scotland & Wales</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/properties"
                className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
              >
                Start Your Search
              </a>
              <a
                href="/contact"
                className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-all"
              >
                Contact Us Today
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}