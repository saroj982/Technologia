import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingCart, Heart, Share2, Package, Shield, Truck } from 'lucide-react'
import { productApi } from '../services/productService'
import { useCartStore } from '../stores/cartStore'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const { addItem, openCart } = useCartStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProduct(id),
  })

  const product = data?.data?.product

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    toast.success(`Added ${quantity} item(s) to cart!`)
    setTimeout(() => openCart(), 500)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/checkout')
  }

  if (isLoading) return <Loader />
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            Product not found
          </p>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="btn-ghost inline-flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Category & Share */}
            <div className="flex items-center justify-between">
              <span className="px-4 py-2 glass rounded-full text-sm font-medium capitalize">
                {product.category}
              </span>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-11 h-11 rounded-xl glass flex items-center justify-center transition-colors ${
                    isLiked
                      ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                      : 'hover:bg-dark-100 dark:hover:bg-dark-800'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    toast.success('Link copied to clipboard!')
                  }}
                  className="w-11 h-11 rounded-xl glass flex items-center justify-center hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Title & Price */}
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-baseline gap-4">
                <p className="text-5xl font-bold gradient-text">
                  NPR{product.price.toFixed(2)}
                </p>
                {product.stock < 10 && product.stock > 0 && (
                  <span className="text-orange-600 dark:text-orange-400 font-medium">
                    Only {product.stock} left!
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-dark-600 dark:text-dark-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-medium mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center glass rounded-xl">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors rounded-l-xl"
                  >
                    -
                  </motion.button>
                  <span className="w-16 text-center font-semibold">{quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors rounded-r-xl"
                  >
                    +
                  </motion.button>
                </div>
                <span className="text-sm text-dark-500">
                  {product.stock} available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 btn-secondary inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Truck, title: 'Fast Delivery', desc: '2-3 days' },
                { icon: Shield, title: 'Secure Payment', desc: '100% Protected' },
                { icon: Package, title: 'Easy Returns', desc: '30-day policy' },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="glass rounded-xl p-4 text-center space-y-2"
                >
                  <feature.icon className="w-8 h-8 mx-auto text-primary-600" />
                  <h4 className="font-semibold text-sm">{feature.title}</h4>
                  <p className="text-xs text-dark-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
