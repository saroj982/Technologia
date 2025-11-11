import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../stores/cartStore'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

export default function CartDrawer() {
  const { cart, isOpen, closeCart, removeItem, getTotal, fetchCart, addItem, getItemCount } = useCartStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const total = getTotal()
  const items = cart || []
  const itemCount = getItemCount()

  useEffect(() => {
    if (isOpen && user) {
      fetchCart()
    }
  }, [isOpen, user, fetchCart])

  const handleQuantityIncrease = async (productId) => {
    try {
      await addItem(productId)
    } catch (error) {
      toast.error('Failed to update quantity')
    }
  }

  const handleQuantityDecrease = async (productId) => {
    try {
      await removeItem(productId)
    } catch (error) {
      toast.error('Failed to update quantity')
    }
  }

  const handleCheckout = () => {
    closeCart()
    navigate('/checkout')
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Shopping Cart ({itemCount})</h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-sm text-gray-500 mb-6">Add products to get started!</p>
              <button
                onClick={() => {
                  closeCart()
                  navigate('/products')
                }}
                className="px-6 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId?._id}
                  className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                    <img
                      src={item.productId?.imageUrl}
                      alt={item.productId?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm truncate mb-1">
                      {item.productId?.name}
                    </h3>
                    <p className="text-sm font-semibold text-orange-500 mb-2">
                      NPR {item.productId?.price?.toFixed(2)}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityDecrease(item.productId?._id)}
                        className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityIncrease(item.productId?._id)}
                        className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      NPR {((item.productId?.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-gray-200 space-y-3 bg-gray-50">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-base">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-semibold text-gray-900">NPR {total.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={closeCart}
              className="w-full py-2 text-gray-700 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
