import { ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../stores/cartStore'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addItem, openCart } = useCartStore()

  const handleAddToCart = async (e) => {
    e.stopPropagation()
    try {
      await addItem(product._id)
      toast.success('Added to cart!')
      setTimeout(() => openCart(), 500)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart')
    }
  }

  return (
    <div
      onClick={() => navigate(`/products/${product._id}`)}
      className="group cursor-pointer bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Add to Cart Button - Appears on hover */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 left-3 right-3 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-orange-600"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        {product.category && (
          <p className="text-xs text-gray-500 mb-1">{product.category}</p>
        )}
        
        {/* Product Name */}
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>

        {/* Price and Stock */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-orange-500">
            NPR{product.price?.toFixed(2)}
          </span>
          {product.stock !== undefined && (
            <span className="text-xs text-gray-500">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
