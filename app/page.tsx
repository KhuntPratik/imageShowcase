"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Download, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import JSZip from "jszip"

const IMAGES_PER_PAGE = 6
const TOTAL_IMAGES = 99

// Generate image paths - adjust this based on your actual image naming convention
// const generateImagePaths = () => {
//   const paths = []
//   for (let i = 1; i <= TOTAL_IMAGES; i++) {
//     paths.push(`/image-${i}.jpg`) // Adjust extension and naming as needed
//   }
//   return paths
// }

const imagePaths = [
  "IMG-20250623-WA0012.jpg",
  "IMG-20250623-WA0013.jpg",
  "IMG-20250623-WA0014.jpg",
  "IMG-20250623-WA0015.jpg",
  "IMG-20250623-WA0016.jpg",
  "IMG-20250623-WA0017.jpg",
  "IMG-20250623-WA0018.jpg",
  "IMG-20250623-WA0019.jpg",
  "IMG-20250623-WA0020.jpg",
  "IMG-20250623-WA0021.jpg",
  "IMG-20250623-WA0022.jpg",
  "IMG-20250623-WA0023.jpg",
  "IMG-20250623-WA0024.jpg",
  "IMG-20250623-WA0025.jpg",
  "IMG-20250623-WA0026.jpg",
  "IMG-20250623-WA0027.jpg",
  "IMG-20250623-WA0028.jpg",
  "IMG-20250623-WA0029.jpg",
  "IMG-20250623-WA0030.jpg",
  "IMG-20250623-WA0031.jpg",
  "IMG-20250623-WA0032.jpg",
  "IMG-20250623-WA0033.jpg",
  "IMG-20250623-WA0034.jpg",
  "IMG-20250623-WA0035.jpg",
  "IMG-20250623-WA0036.jpg",
  "IMG-20250623-WA0037.jpg",
  "IMG-20250623-WA0038.jpg",
  "IMG-20250623-WA0039.jpg",
  "IMG-20250623-WA0040.jpg",
  "IMG-20250623-WA0041.jpg",
  "IMG-20250623-WA0042.jpg",
  "IMG-20250623-WA0043.jpg",
  "IMG-20250623-WA0044.jpg",
  "IMG-20250623-WA0045.jpg",
  "IMG-20250623-WA0046.jpg",
  "IMG-20250623-WA0047.jpg",
  "IMG-20250623-WA0048.jpg",
  "IMG-20250623-WA0049.jpg",
  "IMG-20250623-WA0050.jpg",
  "IMG-20250623-WA0051.jpg",
  "IMG-20250623-WA0052.jpg",
  "IMG-20250623-WA0053.jpg",
  "IMG-20250623-WA0054.jpg",
  "IMG-20250623-WA0055.jpg",
  "IMG-20250623-WA0056.jpg",
  "IMG-20250623-WA0057.jpg",
  "IMG-20250623-WA0058.jpg",
  "IMG-20250623-WA0059.jpg",
  "IMG-20250623-WA0060.jpg",
  "IMG-20250623-WA0061.jpg",
  "IMG-20250623-WA0062.jpg",
  "IMG-20250623-WA0063.jpg",
  "IMG-20250623-WA0064.jpg",
  "IMG-20250623-WA0065.jpg",
  "IMG-20250623-WA0066.jpg",
  "IMG-20250623-WA0067.jpg",
  "IMG-20250623-WA0068.jpg",
  "IMG-20250623-WA0069.jpg",
  "IMG-20250623-WA0070.jpg",
  "IMG-20250623-WA0071.jpg",
  "IMG-20250623-WA0072.jpg",
  "IMG-20250623-WA0073.jpg",
  "IMG-20250623-WA0074.jpg",
  "IMG-20250623-WA0075.jpg",
  "IMG-20250623-WA0076.jpg",
  "IMG-20250623-WA0077.jpg",
  "IMG-20250623-WA0078.jpg",
  "IMG-20250623-WA0079.jpg",
  "IMG-20250623-WA0080.jpg",
  "IMG-20250623-WA0081.jpg",
  "IMG-20250623-WA0082.jpg",
  "IMG-20250623-WA0083.jpg",
  "IMG-20250623-WA0084.jpg",
  "IMG-20250623-WA0085.jpg",
  "IMG-20250623-WA0086.jpg",
  "IMG-20250623-WA0087.jpg",
  "IMG-20250623-WA0088.jpg",
  "IMG-20250623-WA0089.jpg",
  "IMG-20250623-WA0090.jpg",
  "IMG-20250623-WA0091.jpg",
  "IMG-20250623-WA0092.jpg",
  "IMG-20250623-WA0093.jpg",
  "IMG-20250623-WA0094.jpg",
  "IMG-20250623-WA0095.jpg",
  "IMG-20250623-WA0096.jpg",
  "IMG-20250623-WA0097.jpg",
  "IMG-20250623-WA0098.jpg",
  "IMG-20250623-WA0099.jpg",
  "IMG-20250623-WA0100.jpg",
  "IMG-20250623-WA0101.jpg",
  "IMG-20250623-WA0102.jpg",
  "IMG-20250623-WA0103.jpg",
  "IMG-20250623-WA0104.jpg",
  "IMG-20250623-WA0105.jpg",
  "IMG-20250623-WA0106.jpg",
  "IMG-20250623-WA0107.jpg",
  "IMG-20250623-WA0108.jpg",
  "IMG-20250623-WA0109.jpg",
  "IMG-20250623-WA0110.jpg",
  "IMG-20250623-WA0111.jpg"
]

export default function PhotoGallery() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set())
  const [isDownloading, setIsDownloading] = useState(false)
  // const [imagePaths] = useState(generateImagePaths())

  const totalPages = Math.ceil(TOTAL_IMAGES / IMAGES_PER_PAGE)

  const getCurrentImages = () => {
    const startIndex = (currentPage - 1) * IMAGES_PER_PAGE
    const endIndex = startIndex + IMAGES_PER_PAGE
    return imagePaths.slice(startIndex, endIndex)
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setIsLoading(true)
      setCurrentPage(page)

      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" })

      // Simulate loading delay for smooth transition
      setTimeout(() => setIsLoading(false), 300)
    }
  }

  const toggleImageSelection = (imagePath: string) => {
    const newSelected = new Set(selectedImages)
    if (newSelected.has(imagePath)) {
      newSelected.delete(imagePath)
    } else {
      newSelected.add(imagePath)
    }
    setSelectedImages(newSelected)
  }

  const downloadSelectedImages = async () => {
    if (selectedImages.size === 0) return

    setIsDownloading(true)
    try {
      // Download each selected image individually
      await Promise.all(
        Array.from(selectedImages).map(async (imagePath) => {
          const response = await fetch(`/${imagePath}`)
          const blob = await response.blob()
          const url = URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.download = imagePath
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
        })
      )
      // Clear selection after download
      setSelectedImages(new Set())
    } catch (error) {
      console.error("Failed to download images:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const currentImages = getCurrentImages()

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/logoo.png"
                alt="Logo"
                width={154}
                height={39}
                className="rounded-lg"
                onError={(e) => {
                  // Fallback if logo doesn't exist
                  e.currentTarget.style.display = "none"
                }}
              />
              {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg ml-0 [&:has(+img[style*='display: none'])]:block [&:has(+img:not([style*='display: none']))]:hidden">
                A
              </div> */}
            </div>
            <div className="flex items-center space-x-3">
              {selectedImages.size > 0 && (
                <Badge variant="secondary" className="animate-fade-in">
                  {selectedImages.size} selected
                </Badge>
              )}
              <h1 className="text-xl font-semibold text-gray-800 tracking-wide">Photos</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pb-24 overflow-hidden">
        {/* Page Info */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Photo Gallery</h2>
          <p className="text-gray-600">
            Page {currentPage} of {totalPages} • {TOTAL_IMAGES} photos total
          </p>
          {selectedImages.size > 0 && (
            <p className="text-blue-600 font-medium mt-2">
              {selectedImages.size} photo{selectedImages.size !== 1 ? "s" : ""} selected
            </p>
          )}
        </div>

        {/* Image Grid */}
        <div className={`transition-all duration-300 ${isLoading ? "opacity-50 scale-95" : "opacity-100 scale-100"}`}>
          <div className="grid grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
            {currentImages.map((imagePath, index) => {
              const isSelected = selectedImages.has(imagePath)
              return (
                <Card
                  key={`${currentPage}-${index}`}
                  className={`overflow-hidden group hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up cursor-pointer relative ${
                    isSelected ? "ring-2 ring-blue-500 ring-offset-2" : ""
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => toggleImageSelection(imagePath)}
                >
                  <div className="aspect-square relative bg-gray-100">
                    <Image
                      src={imagePath || "/placeholder.svg"}
                      alt={`Photo ${(currentPage - 1) * IMAGES_PER_PAGE + index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      priority={index < 2} // Prioritize first 2 images
                      onError={(e) => {
                        // Fallback placeholder
                        e.currentTarget.src = `/placeholder.svg?height=400&width=400&text=Photo+${(currentPage - 1) * IMAGES_PER_PAGE + index + 1}`
                      }}
                    />
                    <div
                      className={`absolute inset-0 transition-colors duration-300 ${
                        isSelected ? "bg-blue-500/20" : "bg-black/0 group-hover:bg-black/10"
                      }`}
                    />

                    {/* Selection indicator */}
                    <div
                      className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                        isSelected
                          ? "bg-blue-500 border-blue-500 scale-110"
                          : "bg-white/80 border-white/80 group-hover:bg-white group-hover:border-white"
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white absolute top-0.5 left-0.5" />}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className="bg-white hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <div className="flex items-center space-x-2">
            {/* Show page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  disabled={isLoading}
                  className={currentPage === pageNum ? "bg-black text-white" : "bg-white hover:bg-gray-50"}
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className="bg-white hover:bg-gray-50"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Quick Navigation */}
        <div className="text-center text-sm text-gray-500">
          <p>Click on images to select • Swipe or use arrow keys to navigate</p>
        </div>
      </main>

      {/* Download Button - Fixed Position */}
      {selectedImages.size > 0 && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <Button
            onClick={downloadSelectedImages}
            disabled={isDownloading}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 py-3 flex items-center space-x-2"
          >
            <Download className={`h-5 w-5 ${isDownloading ? "animate-spin" : ""}`} />
            <span>
              {isDownloading
                ? "Downloading..."
                : `${selectedImages.size} photo${selectedImages.size !== 1 ? "s" : ""}`}
            </span>
          </Button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800 text-lg">Apexion Tech Solutions</h3>
              <p className="text-gray-600">Web Development Agency</p>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium"> Pratik Khunt, Viraj Vasoya </span>
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                <a href="tel:7016960514" className="hover:text-blue-600 transition-colors">
                  7016960514
                </a>
              </p>
              <p>
                <span className="font-medium">Location:</span> Rajkot, Gujarat
              </p>
              <p>
                <span className="font-medium">Website:</span>{" "}
                <a
                  href="https://apexion-tech-solution.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Apexion tech Solution
                </a>
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">© 2024 Apexion Tech Solutions. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
