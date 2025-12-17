import { notFound } from 'next/navigation'
import { client } from '../../../lib/sanity'
import ImageCarousel from '../../../components/ImageCarousel'
import { Bed, Bath, Maximize, MapPin, Mail, Phone } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getProperty(slug) {
  const query = `*[_type == "property" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
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
    amenities
  }`

  const property = await client.fetch(query, { slug })
  return property
}

export default async function PropertyDetailPage({ params }) {
  const property = await getProperty(params.slug)

  if (!property) {
    notFound()
  }

  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: property.currency || 'GBP',
    maximumFractionDigits: 0,
  }).format(property.price)

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-custom py-8">
        <a
          href="/properties"
          className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-6 transition-colors"
        >
          ← Back to Properties
        </a>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ImageCarousel images={property.images} title={property.title} />

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                    property.status === 'sale' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    For {property.status === 'sale' ? 'Sale' : 'Rent'}
                  </span>
                  <span className="px-4 py-1.5 bg-neutral-100 text-neutral-700 rounded-full text-sm font-semibold capitalize">
                    {property.propertyType}
                  </span>
                </div>
                <h1 className="text-4xl font-display font-bold mb-4">{property.title}</h1>
                <div className="flex items-center text-neutral-600 mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="text-lg">
                    {property.location?.address}, {property.location?.city}, {property.location?.postcode}
                  </span>
                </div>
                <div className="text-4xl font-bold text-primary-600">
                  {formattedPrice}
                  {property.status === 'rent' && <span className="text-2xl text-neutral-600">/month</span>}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 py-6 border-y border-neutral-200 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Bed className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{property.bedrooms}</p>
                    <p className="text-sm text-neutral-600">Bedrooms</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Bath className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{property.bathrooms}</p>
                    <p className="text-sm text-neutral-600">Bathrooms</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Maximize className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{property.area}</p>
                    <p className="text-sm text-neutral-600">sq ft</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-neutral-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Contact Agent</h2>
              <form className="space-y-4" action="/api/contact" method="POST">
                <input type="hidden" name="propertyTitle" value={property.title} />
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    required 
                    placeholder="Your full name" 
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    required 
                    placeholder="your.email@example.com" 
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="+44 123 456 7890" 
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Message *</label>
                  <textarea 
                    name="message"
                    required 
                    rows={4} 
                    placeholder="I'm interested in this property..." 
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-neutral-200">
                <p className="text-sm text-neutral-500 mb-4">Contact Information</p>
                <div className="space-y-4">
                  <a 
                    href="tel:+442012345678"
                    className="flex items-center space-x-3 text-neutral-700 hover:text-primary-600 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="font-medium">+44 20 1234 5678</span>
                  </a>
                  <a 
                    href="mailto:info@plestate.com"
                    className="flex items-center space-x-3 text-neutral-700 hover:text-primary-600 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="font-medium">info@plestate.com</span>
                  </a>
                </div>
                
                <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                  <p className="text-sm text-primary-800">
                    <strong>Office Hours:</strong><br />
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}