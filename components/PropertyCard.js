'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Bed, Bath, Maximize, MapPin } from 'lucide-react'
import { urlFor, formatPrice, formatArea } from '../lib/sanity'

export default function PropertyCard({ property }) {
  const imageUrl = property.images?.[0] 
    ? urlFor(property.images[0]).width(600).height(400).url()
    : '/placeholder-property.jpg'

  const statusColors = {
    sale: 'bg-green-500',
    rent: 'bg-blue-500',
    sold: 'bg-gray-500',
    rented: 'bg-gray-500',
  }

  const statusLabels = {
    sale: 'For Sale',
    rent: 'For Rent',
    sold: 'Sold',
    rented: 'Rented',
  }

  return (
    <Link href={`/properties/${property.slug.current}`}>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Status Badge */}
          <div className={`absolute top-4 left-4 ${statusColors[property.status]} text-white px-4 py-1.5 rounded-full text-sm font-semibold`}>
            {statusLabels[property.status]}
          </div>

          {/* Featured Badge */}
          {property.featured && (
            <div className="absolute top-4 right-4 bg-accent-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Price */}
          <div className="text-2xl font-display font-bold text-primary-600 mb-2">
            {formatPrice(property.price, property.currency)}
            {property.status === 'rent' && <span className="text-lg text-neutral-500">/month</span>}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-neutral-600 mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {property.location.city}, {property.location.county || property.location.country}
            </span>
          </div>

          {/* Features */}
          <div className="flex items-center justify-between text-neutral-700 pt-4 border-t border-neutral-100">
            <div className="flex items-center space-x-1">
              <Bed className="w-5 h-5 text-neutral-400" />
              <span className="font-medium">{property.bedrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath className="w-5 h-5 text-neutral-400" />
              <span className="font-medium">{property.bathrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Maximize className="w-5 h-5 text-neutral-400" />
              <span className="font-medium">{formatArea(property.area)} sq ft</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}