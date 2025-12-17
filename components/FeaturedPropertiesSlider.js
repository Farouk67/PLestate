'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '../lib/sanity'
import { ChevronLeft, ChevronRight, Bed, Bath, Maximize, MapPin } from 'lucide-react'

// Image URL builder
const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}

export default function FeaturedPropertiesSlider({ properties }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || properties.length <= 1) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [currentIndex, isAutoPlaying, properties.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % properties.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false) // Stop auto-play when user manually navigates
  }

  if (!properties || properties.length === 0) {
    return null
  }

  const currentProperty = properties[currentIndex]

  // Format price
  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currentProperty.currency || 'GBP',
    maximumFractionDigits: 0,
  }).format(currentProperty.price)

  return (
    <div className="relative h-[600px] md:h-[700px] bg-neutral-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {currentProperty.images?.[0] && (
          <Image
            src={urlFor(currentProperty.images[0]).width(1920).height(1080).url()}
            alt={currentProperty.title}
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container-custom flex items-center">
        <div className="max-w-2xl text-white space-y-6 animate-slide-up">
          {/* Featured Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary-600 px-4 py-2 rounded-full">
            <span className="text-sm font-semibold">⭐ Featured Property</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
            {currentProperty.title}
          </h1>

          {/* Location */}
          <div className="flex items-center space-x-2 text-lg">
            <MapPin className="w-5 h-5" />
            <span>
              {currentProperty.location?.city}, {currentProperty.location?.county}
            </span>
          </div>

          {/* Property Details */}
          <div className="flex items-center space-x-6 text-lg">
            <div className="flex items-center space-x-2">
              <Bed className="w-5 h-5" />
              <span>{currentProperty.bedrooms} Beds</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bath className="w-5 h-5" />
              <span>{currentProperty.bathrooms} Baths</span>
            </div>
            <div className="flex items-center space-x-2">
              <Maximize className="w-5 h-5" />
              <span>{currentProperty.area} sq ft</span>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center space-x-6 pt-4">
            <div>
              <p className="text-sm opacity-80 mb-1">Starting from</p>
              <p className="text-4xl md:text-5xl font-bold">{formattedPrice}</p>
            </div>
            <Link
              href={`/properties/${currentProperty.slug?.current}`}
              className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {properties.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
          <button
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {properties.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {properties.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full ${
                index === currentIndex
                  ? 'w-12 h-3 bg-white'
                  : 'w-3 h-3 bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}

      {/* Property Counter */}
      <div className="absolute top-8 right-8 px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-lg font-medium">
        {currentIndex + 1} / {properties.length}
      </div>
    </div>
  )
}