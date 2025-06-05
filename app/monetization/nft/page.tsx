"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Plus, TrendingUp, DollarSign, ImageIcon, Star, Eye, Heart } from "lucide-react"

export default function NFTPage() {
  const [nfts, setNfts] = useState([
    {
      id: 1,
      name: "Viral Meme #001",
      price: "0.5 ETH",
      floorPrice: "0.3 ETH",
      volume: "12.4 ETH",
      owners: 1,
      views: 5420,
      likes: 342,
      rarity: "Legendary",
      image: "/placeholder.svg?height=200&width=200&text=NFT+1",
    },
    {
      id: 2,
      name: "Content Creator Avatar",
      price: "0.8 ETH",
      floorPrice: "0.6 ETH",
      volume: "8.7 ETH",
      owners: 1,
      views: 3210,
      likes: 189,
      rarity: "Epic",
      image: "/placeholder.svg?height=200&width=200&text=NFT+2",
    },
    {
      id: 3,
      name: "Trending Post Collection",
      price: "0.2 ETH",
      floorPrice: "0.1 ETH",
      volume: "15.6 ETH",
      owners: 8,
      views: 7890,
      likes: 567,
      rarity: "Rare",
      image: "/placeholder.svg?height=200&width=200&text=NFT+3",
    },
  ])

  const { toast } = useToast()

  const handleCreateNFT = () => {
    toast({
      title: "🎨 NFT Created!",
      description: "Your digital masterpiece is ready to mint",
    })
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
      case "Epic":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      case "Rare":
        return "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                NFT Marketplace 🎨
              </h1>
              <p className="text-muted-foreground mt-2">Turn your viral content into valuable digital assets</p>
            </div>
            <Button
              onClick={handleCreateNFT}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create NFT
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Total Volume</p>
                  <p className="text-3xl font-bold">36.7 ETH</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Floor Price</p>
                  <p className="text-3xl font-bold">0.1 ETH</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Items Listed</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <ImageIcon className="h-8 w-8 text-green-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Owners</p>
                  <p className="text-3xl font-bold">156</p>
                </div>
                <Star className="h-8 w-8 text-orange-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* NFTs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <Card
              key={nft.id}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="pb-3">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={nft.image || "/placeholder.svg"}
                    alt={nft.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={getRarityColor(nft.rarity)}>{nft.rarity}</Badge>
                  </div>
                </div>
                <CardTitle className="text-lg">{nft.name}</CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">{nft.price}</span>
                  <span className="text-sm text-muted-foreground">Floor: {nft.floorPrice}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">Volume</p>
                      <p className="text-lg font-bold">{nft.volume}</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">Owners</p>
                      <p className="text-lg font-bold">{nft.owners}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{nft.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{nft.likes}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 hover:bg-purple-50">
                      Edit Listing
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      View on OpenSea
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
