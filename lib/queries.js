
export const propertyFields = `
  _id,
  title,
  slug,
  propertyType,
  status,
  price,
  currency,
  description,
  location,
  bedrooms,
  bathrooms,
  area,
  images,
  features,
  yearBuilt,
  parking,
  virtualTourUrl,
  featured,
  publishedAt
`

// Get all properties with optional filters
export const getAllPropertiesQuery = (filters = {}) => {
  const { status, propertyType, minPrice, maxPrice, bedrooms } = filters
  
  let filterConditions = []
  
  if (status) filterConditions.push(`status == "${status}"`)
  if (propertyType) filterConditions.push(`propertyType == "${propertyType}"`)
  if (minPrice) filterConditions.push(`price >= ${minPrice}`)
  if (maxPrice) filterConditions.push(`price <= ${maxPrice}`)
  if (bedrooms) filterConditions.push(`bedrooms >= ${bedrooms}`)
  
  const whereClause = filterConditions.length > 0 
    ? `[${filterConditions.join(' && ')}]` 
    : ''
  
  return `*[_type == "property"${whereClause}] | order(publishedAt desc) {
    ${propertyFields}
  }`
}

// Get featured properties
export const featuredPropertiesQuery = `
  *[_type == "property" && featured == true && status in ["sale", "rent"]] | order(publishedAt desc) [0...6] {
    ${propertyFields}
  }
`

// Get property by slug
export const getPropertyBySlugQuery = (slug) => `
  *[_type == "property" && slug.current == "${slug}"][0] {
    ${propertyFields}
  }
`

// Get similar properties (same type and price range)
export const getSimilarPropertiesQuery = (propertyType, price, excludeId) => `
  *[_type == "property" 
    && propertyType == "${propertyType}" 
    && _id != "${excludeId}"
    && price >= ${price * 0.7} 
    && price <= ${price * 1.3}
    && status in ["sale", "rent"]
  ] | order(publishedAt desc) [0...3] {
    ${propertyFields}
  }
`

// Get property counts by status
export const getPropertyCountsQuery = `
  {
    "total": count(*[_type == "property"]),
    "forSale": count(*[_type == "property" && status == "sale"]),
    "forRent": count(*[_type == "property" && status == "rent"])
  }
`