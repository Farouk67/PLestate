'use client'

import { useState } from 'react'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '../lib/sanity'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// Image URL builder
const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}

export default function ImageCarousel({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="relative h-96 bg-neutral-200 rounded-2xl flex items-center justify-center">
        <p className="text-neutral-500">No images available</p>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index) => {
    setCurrentIndex(index)
  }

  return (
    <>
      {/* Main Carousel */}
      <div className="relative">
        {/* Main Image */}
        <div className="relative h-96 md:h-[500px] bg-neutral-100 rounded-2xl overflow-hidden group">
          <Image
            src={urlFor(images[currentIndex]).width(1200).height(800).url()}
            alt={`${title} - Image ${currentIndex + 1}`}
            fill
            className="object-cover cursor-pointer"
            onClick={() => setIsFullscreen(true)}
            priority={currentIndex === 0}
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-6 h-6 text-neutral-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-6 h-6 text-neutral-800" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 px-4 py-2 bg-black/70 text-white rounded-lg text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-4 right-4 px-4 py-2 bg-white/90 hover:bg-white rounded-lg text-sm font-medium transition-all"
          >
            View Fullscreen
          </button>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="mt-4 grid grid-cols-4 md:grid-cols-6 gap-4">
            {images.slice(0, 6).map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`relative h-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? 'border-primary-600 ring-2 ring-primary-200'
                    : 'border-neutral-200 hover:border-primary-400'
                }`}
              >
                <Image
                  src={urlFor(image).width(200).height(150).url()}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {index === 5 && images.length > 6 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold">
                    +{images.length - 6}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Fullscreen Image */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              src={urlFor(images[currentIndex]).width(1920).height(1080).url()}
              alt={`${title} - Image ${currentIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full text-lg font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}