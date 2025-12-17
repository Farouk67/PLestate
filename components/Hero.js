'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchParams, setSearchParams] = useState({
    status: 'sale',
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
  })

  // UK Locations for dropdown
  const ukLocations = [
    { value: '', label: 'Select Location' },
    { value: 'London', label: 'London' },
    { value: 'Manchester', label: 'Manchester' },
    { value: 'Birmingham', label: 'Birmingham' },
    { value: 'Leeds', label: 'Leeds' },
    { value: 'Liverpool', label: 'Liverpool' },
    { value: 'Bristol', label: 'Bristol' },
    { value: 'Edinburgh', label: 'Edinburgh' },
    { value: 'Glasgow', label: 'Glasgow' },
    { value: 'Cardiff', label: 'Cardiff' },
    { value: 'Belfast', label: 'Belfast' },
    { value: 'Sheffield', label: 'Sheffield' },
    { value: 'Newcastle', label: 'Newcastle' },
    { value: 'Nottingham', label: 'Nottingham' },
    { value: 'Leicester', label: 'Leicester' },
    { value: 'Brighton', label: 'Brighton' },
    { value: 'Oxford', label: 'Oxford' },
    { value: 'Cambridge', label: 'Cambridge' },
    { value: 'Bath', label: 'Bath' },
    { value: 'York', label: 'York' },
  ]

  // YOUR OWN IMAGES from public folder
  const carouselImages = [
    '/2149360591.jpg',
    '/2149360648.jpg',
    '/2149377154.jpg',
    '/2151469863.jpg',
    '/1982.jpg',
    '/1987.jpg',
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [carouselImages.length])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    
    router.push(`/properties?${params.toString()}`)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  return (
    <div className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-right">
            <div>
              <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
                REAL ESTATE
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
                Find a perfect<br />
                home you love..!
              </h1>
              <p className="text-lg text-neutral-600 max-w-lg">
                Discover exceptional properties in prime locations across the UK. 
                We make finding your dream home simple and stress-free.
              </p>
            </div>

            {/* Image Carousel - Desktop Only */}
            <div className="hidden lg:block">
              <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Property ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
                
                {/* Carousel Controls */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-neutral-100 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-neutral-100 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentSlide ? 'w-8 bg-primary-600' : 'w-2 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Search Form */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <form onSubmit={handleSearch} className="space-y-6">
                {/* Status Tabs */}
                <div className="flex rounded-xl overflow-hidden border border-neutral-200">
                  <button
                    type="button"
                    onClick={() => setSearchParams({ ...searchParams, status: 'sale' })}
                    className={`flex-1 py-4 px-6 font-semibold transition-all ${
                      searchParams.status === 'sale'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    For Sale
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchParams({ ...searchParams, status: 'rent' })}
                    className={`flex-1 py-4 px-6 font-semibold transition-all ${
                      searchParams.status === 'rent'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    For Rent
                  </button>
                </div>

                {/* Search Fields */}
                <div className="space-y-4">
                  {/* Location Dropdown */}
                  <select
                    value={searchParams.location}
                    onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                    className="input-field appearance-none bg-white"
                  >
                    {ukLocations.map((location) => (
                      <option key={location.value} value={location.value}>
                        {location.label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={searchParams.propertyType}
                    onChange={(e) => setSearchParams({ ...searchParams, propertyType: e.target.value })}
                    className="input-field appearance-none bg-white"
                  >
                    <option value="">Select Property Type</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="land">Land</option>
                  </select>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={searchParams.minPrice}
                      onChange={(e) => setSearchParams({ ...searchParams, minPrice: e.target.value })}
                      className="input-field"
                    />
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={searchParams.maxPrice}
                      onChange={(e) => setSearchParams({ ...searchParams, maxPrice: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-3xl"></div>
    </div>
  )
}