'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'

export default function Filters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState({
    status: searchParams.get('status') || '',
    propertyType: searchParams.get('propertyType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    location: searchParams.get('location') || '',
  })

  // UK Regions and Major Cities
  const ukLocations = [
    { value: '', label: 'All Locations' },
    
    // England - Regions
    { value: 'London', label: 'London' },
    { value: 'South East England', label: 'South East England' },
    { value: 'South West England', label: 'South West England' },
    { value: 'East of England', label: 'East of England' },
    { value: 'West Midlands', label: 'West Midlands' },
    { value: 'East Midlands', label: 'East Midlands' },
    { value: 'Yorkshire and the Humber', label: 'Yorkshire and the Humber' },
    { value: 'North West England', label: 'North West England' },
    { value: 'North East England', label: 'North East England' },
    
    // Major English Cities
    { value: 'Manchester', label: 'Manchester' },
    { value: 'Birmingham', label: 'Birmingham' },
    { value: 'Leeds', label: 'Leeds' },
    { value: 'Liverpool', label: 'Liverpool' },
    { value: 'Bristol', label: 'Bristol' },
    { value: 'Sheffield', label: 'Sheffield' },
    { value: 'Newcastle', label: 'Newcastle' },
    { value: 'Nottingham', label: 'Nottingham' },
    { value: 'Leicester', label: 'Leicester' },
    { value: 'Coventry', label: 'Coventry' },
    { value: 'Bradford', label: 'Bradford' },
    { value: 'Southampton', label: 'Southampton' },
    { value: 'Brighton', label: 'Brighton' },
    { value: 'Oxford', label: 'Oxford' },
    { value: 'Cambridge', label: 'Cambridge' },
    { value: 'Reading', label: 'Reading' },
    { value: 'Bath', label: 'Bath' },
    { value: 'York', label: 'York' },
    
    // Scotland
    { value: 'Scotland', label: 'Scotland (All)' },
    { value: 'Edinburgh', label: 'Edinburgh' },
    { value: 'Glasgow', label: 'Glasgow' },
    { value: 'Aberdeen', label: 'Aberdeen' },
    { value: 'Dundee', label: 'Dundee' },
    
    // Wales
    { value: 'Wales', label: 'Wales (All)' },
    { value: 'Cardiff', label: 'Cardiff' },
    { value: 'Swansea', label: 'Swansea' },
    { value: 'Newport', label: 'Newport' },
    
    // Northern Ireland
    { value: 'Northern Ireland', label: 'Northern Ireland (All)' },
    { value: 'Belfast', label: 'Belfast' },
  ]

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value })
  }

  const applyFilters = () => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    router.push(`/properties?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      status: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      location: '',
    })
    router.push('/properties')
  }

  const activeFiltersCount = Object.values(filters).filter(v => v).length

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between py-3 px-4 bg-neutral-100 rounded-lg font-medium"
        >
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <X className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-0' : 'rotate-45'}`} />
        </button>
      </div>

      {/* Filters Grid */}
      <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Status */}
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none"
          >
            <option value="">All Status</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>

          {/* Property Type */}
          <select
            value={filters.propertyType}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            className="px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none"
          >
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>

          {/* Min Price */}
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            className="px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none"
          />

          {/* Max Price */}
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            className="px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none"
          />

          {/* Bedrooms */}
          <select
            value={filters.bedrooms}
            onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
            className="px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none"
          >
            <option value="">Any Beds</option>
            <option value="1">1+ Beds</option>
            <option value="2">2+ Beds</option>
            <option value="3">3+ Beds</option>
            <option value="4">4+ Beds</option>
            <option value="5">5+ Beds</option>
          </select>

          {/* Location - UK Regions Dropdown */}
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="px-4 py-3 rounded-lg border-2 border-primary-500 focus:border-primary-600 focus:ring-2 focus:ring-primary-100 outline-none bg-white"
          >
            {ukLocations.map((location) => (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={applyFilters}
            className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Apply Filters
          </button>
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-200 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}