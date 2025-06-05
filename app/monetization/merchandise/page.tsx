"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Plus, ShoppingBag, DollarSign, Package, Star, Eye, Heart } from "lucide-react"

export default function MerchandisePage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Viral Vibes T-Shirt",
      price: "$24.99",
      sales: 127,
      revenue: "$3,174.73",
      rating: 4.8,
      views: 2340,
      likes: 189,
      image: "/placeholder.svg?height=200&width=200&text=T-Shirt",
    },
    {
      id: 2,
      name: "Content Creator Hoodie",
      price: "$39.99",
      sales: 89,
      revenue: "$3,559.11",
      rating: 4.9,
      views: 1876,
      likes: 156,
      image: "/placeholder.svg?height=200&width=200&text=Hoodie",
    },
    {
      id: 3,
      name: "Meme Lord Mug",
      price: "$14.99",
      sales: 203,
      revenue: "$3,042.97",
      rating: 4.7,
      views: 3421,
      likes: 267,
      image: "/placeholder.svg?height=200&width=200&text=Mug",
    },
  ])

  const { toast } = useToast()

  const handleCreateProduct = () => {
    toast({
      title: "🎨 Product Created!",
      description: "Your new merchandise is ready to sell",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Merch Store 🛍️
              </h1>
              <p className="text-muted-foreground mt-2">Turn your viral content into cash money</p>
            </div>
            <Button
              onClick={handleCreateProduct}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Product
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Revenue</p>
                  <p className="text-3xl font-bold">$9.8K</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Products Sold</p>
                  <p className="text-3xl font-bold">419</p>
                </div>
                <Package className="h-8 w-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Active Products</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Avg. Rating</p>
                  <p className="text-3xl font-bold">4.8</p>
                </div>
                <Star className="h-8 w-8 text-orange-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="pb-3">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">{product.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{product.rating}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">Sales</p>
                      <p className="text-xl font-bold">{product.sales}</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="text-xl font-bold">{product.revenue}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{product.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{product.likes}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 hover:bg-purple-50">
                      Edit
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      View Store
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
