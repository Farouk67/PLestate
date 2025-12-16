import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client, urlFor, formatPrice, formatArea } from '../../../lib/sanity'
import { getPropertyBySlugQuery, getSimilarPropertiesQuery } from '../../../lib/queries'
import { Bed, Bath, Maximize, MapPin, Calendar, Car, Check, ArrowLeft, ExternalLink } from 'lucide-react'
import ContactForm from '../../../components/ContactForm'
import PropertyCard from '../../../components/PropertyCard'

export const revalidate = 60

async function getProperty(slug) {
  try {
    const query = getPropertyBySlugQuery(slug)
    const property = await client.fetch(query)
    return property
  } catch (error) {
    console.error('Error fetching property:', error)
    return null
  }
}

async function getSimilarProperties(property) {
  try {
    const query = getSimilarPropertiesQuery(
      property.propertyType,
      property.price,
      property._id
    )
    const properties = await client.fetch(query)
    return properties
  } catch (error) {
    console.error('Error fetching similar properties:', error)
    return []
  }
}

export default async function PropertyDetailPage({ params }) {
  const property = await getProperty(params.slug)

  if (!property) {
    notFound()
  }

  const similarProperties = await getSimilarProperties(property)

  const statusLabels = {
    sale: 'For Sale',
    rent: 'For Rent',
    sold: 'Sold',
    rented: 'Rented',
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/properties"
          className="inline-flex items-center space-x-2 text-neutral-600 hover:text-primary-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Properties</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              {property.images && property.images.length > 0 && (
                <>
                  <div className="relative h-[500px]">
                    <Image
                      src={urlFor(property.images[0]).width(1200).height(800).url()}
                      alt={property.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  
                  {property.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2 p-4">
                      {property.images.slice(1, 5).map((image, index) => (
                        <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                          <Image
                            src={urlFor(image).width(300).height(200).url()}
                            alt={`${property.title} - Image ${index + 2}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                    {statusLabels[property.status]}
                  </div>
                  <h1 className="text-4xl font-display font-bold mb-2">{property.title}</h1>
                  <div className="flex items-center text-neutral-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>
                      {property.location.address}, {property.location.city}, {property.location.postcode}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-display font-bold text-primary-600">
                    {formatPrice(property.price, property.currency)}
                  </div>
                  {property.status === 'rent' && (
                    <div className="text-neutral-500">/month</div>
                  )}
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-neutral-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Bed className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{property.bedrooms}</div>
                    <div className="text-sm text-neutral-600">Bedrooms</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Bath className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{property.bathrooms}</div>
                    <div className="text-sm text-neutral-600">Bathrooms</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Maximize className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{formatArea(property.area)}</div>
                    <div className="text-sm text-neutral-600">sq ft</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Car className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{property.parking || 0}</div>
                    <div className="text-sm text-neutral-600">Parking</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-display font-bold mb-4">Description</h2>
                <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Features & Amenities */}
              {property.features && property.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-display font-bold mb-4">Features & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Details */}
              <div>
                <h2 className="text-2xl font-display font-bold mb-4">Property Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 text-neutral-700">
                    <Calendar className="w-5 h-5 text-neutral-400" />
                    <span>Built in {property.yearBuilt}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-neutral-700">
                    <MapPin className="w-5 h-5 text-neutral-400" />
                    <span className="capitalize">{property.propertyType}</span>
                  </div>
                </div>
              </div>

              {/* Virtual Tour */}
              {property.virtualTourUrl && (
                <div className="mt-8 pt-8 border-t border-neutral-200">
                  <a
                    href={property.virtualTourUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View Virtual Tour</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <ContactForm propertyId={property._id} propertyTitle={property.title} />
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-display font-bold mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}