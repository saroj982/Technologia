import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { orderService } from '../services/orderService';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, isLoading: cartLoading } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    console.log(cart);
    if (!cartLoading && (!cart || cart.length === 0)) {
      navigate('/products');
    }
  }, [cart, cartLoading, navigate]);

  const calculateTotal = () => {
    if (!cart || !Array.isArray(cart)) return 0;
    return cart.reduce((total, item) => {
      return total + (item.productId?.price || 0) * item.quantity;
    }, 0);
  };

  const handleCheckout = async () => {
    if (!cart || cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      // Create order and get eSewa payment data
      const response = await orderService.createOrder();

      if (response.paymentData && response.esewaPaymentUrl) {
        const { paymentData, esewaPaymentUrl } = response;

        // Create a form and submit to eSewa (same as original author's approach)
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = esewaPaymentUrl;

        // Add all payment parameters as hidden inputs
        Object.keys(paymentData).forEach((key) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = paymentData[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to process checkout');
      setIsProcessing(false);
    }
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Review your order and proceed to payment</p>
        </div>

        {/* Cart Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          
          {/* Cart Items */}
          <div className="space-y-3 mb-6">
            {cart?.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <img
                  src={item.productId?.imageUrl}
                  alt={item.productId?.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm">{item.productId?.name}</h3>
                  <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    NPR{((item.productId?.price || 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-700">Total</span>
              <span className="text-2xl font-bold text-orange-500">
                NPR{total.toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isProcessing || !cart || cart.length === 0}
              className="w-full py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Pay with eSewa'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="text-center text-gray-500 text-sm">
          <p>🔒 Secure payment powered by eSewa</p>
          <p className="mt-1">You will be redirected to eSewa for payment</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
