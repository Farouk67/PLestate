'use client'

import Image from 'next/image'
import { Home, Users, Award, TrendingUp, Target, Heart } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { label: 'Properties Sold', value: '500+', icon: Home },
    { label: 'Happy Clients', value: '1,200+', icon: Users },
    { label: 'Years Experience', value: '15+', icon: Award },
    { label: 'Success Rate', value: '98%', icon: TrendingUp },
  ]

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide exceptional real estate services that exceed our clients\' expectations, making property transactions smooth, transparent, and successful.'
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'Integrity, professionalism, and dedication to our clients. We believe in building lasting relationships based on trust and exceptional service.'
    },
  ]

  const team = [
    {
      name: 'Sarah Mitchell',
      role: 'Founder & CEO',
      image: '/1982.jpg',
      bio: '15 years of experience in luxury property sales'
    },
    {
      name: 'James Thompson',
      role: 'Head of Sales',
      image: '/1987.jpg',
      bio: 'Specialist in commercial and residential properties'
    },
    {
      name: 'Emma Roberts',
      role: 'Lettings Director',
      image: '/2146.jpg',
      bio: 'Expert in property management and lettings'
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
              ABOUT PROMISED LAND ESTATE
            </p>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Your Trusted Partner in Real Estate
            </h1>
            <p className="text-xl text-neutral-600">
              Since 2008, we've been helping families and individuals find their perfect homes across the UK. 
              Our commitment to excellence and personalized service sets us apart.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-4xl font-display font-bold text-primary-700 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-neutral-600 font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                OUR STORY
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Building Dreams Since 2008
              </h2>
              <div className="space-y-4 text-lg text-neutral-700">
                <p>
                  Promised Land Estate was founded with a simple vision: to make finding the perfect property 
                  a joyful and stress-free experience for everyone.
                </p>
                <p>
                  What started as a small local agency has grown into one of the UK's most trusted property 
                  platforms, helping thousands of families find their dream homes.
                </p>
                <p>
                  Our team of dedicated professionals brings together decades of combined experience in 
                  property sales, lettings, and market analysis. We pride ourselves on our deep knowledge 
                  of local markets and our commitment to exceptional customer service.
                </p>
                <p>
                  Today, we continue to innovate and adapt, using the latest technology while maintaining 
                  the personal touch that our clients value most.
                </p>
              </div>
            </div>
            <div className="relative h-96 lg:h-full">
              <Image
                src="/2149360591.jpg"
                alt="Modern living room"
                fill
                className="object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
              WHAT DRIVES US
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Our Mission & Values
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-primary-50 p-8 rounded-2xl">
                  <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-neutral-700 text-lg">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
              OUR TEAM
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Meet the Experts
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Our dedicated team of property professionals is here to guide you every step of the way
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className="relative h-80">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-neutral-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-700 to-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let our experienced team help you find the perfect property
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/properties"
              className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Browse Properties
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}