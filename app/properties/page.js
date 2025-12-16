import { Suspense } from 'react'
import Filters from '../../components/Filters'
import PropertyCard from '../../components/PropertyCard'
import { client } from '../../lib/sanity'
import { allPropertiesQuery } from '../../lib/queries'

// Force this page to be dynamic (not pre-rendered)
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Property Listings - Promised Land Estate',
  description: 'Browse our collection of properties for sale and rent across the UK',
}

async function getProperties(searchParams) {
  try {
    const status = searchParams?.status
    const propertyType = searchParams?.propertyType
    const minPrice = searchParams?.minPrice
    const maxPrice = searchParams?.maxPrice
    const bedrooms = searchParams?.bedrooms
    const location = searchParams?.location

    let query = allPropertiesQuery
    const params = {}

    // Build dynamic query based on filters
    const conditions = []
    
    if (status) {
      conditions.push('status == $status')
      params.status = status
    }
    if (propertyType) {
      conditions.push('propertyType == $propertyType')
      params.propertyType = propertyType
    }
    if (minPrice) {
      conditions.push('price >= $minPrice')
      params.minPrice = parseInt(minPrice)
    }
    if (maxPrice) {
      conditions.push('price <= $maxPrice')
      params.maxPrice = parseInt(maxPrice)
    }
    if (bedrooms) {
      conditions.push('bedrooms >= $bedrooms')
      params.bedrooms = parseInt(bedrooms)
    }
    if (location) {
      conditions.push('location.city match $location || location.county match $location')
      params.location = `*${location}*`
    }

    if (conditions.length > 0) {
      query = `*[_type == "property" && (${conditions.join(' && ')})]{
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
        featured,
        description
      } | order(_createdAt desc)`
    }

    const properties = await client.fetch(query, params)
    return properties
  } catch (error) {
    console.error('Error fetching properties:', error)
    return []
  }
}

export default async function PropertiesPage({ searchParams }) {
  const properties = await getProperties(searchParams)

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Property <span className="text-primary-600">Listings</span>
          </h1>
          <p className="text-neutral-600 text-lg">
            {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
          </p>
        </div>

        {/* Filters */}
        <Suspense fallback={<div className="h-32 bg-white rounded-xl animate-pulse"></div>}>
          <Filters />
        </Suspense>

        {/* Properties Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-neutral-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">No properties found</h3>
            <p className="text-neutral-600 mb-6">
              Try adjusting your filters or search criteria
            </p>
            <a
              href="/properties"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all"
            >
              Clear Filters
            </a>
          </div>
        )}
      </div>
    </div>
  )
}