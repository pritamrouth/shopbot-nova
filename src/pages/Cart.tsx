
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/common/SectionHeading";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
    setSubtotal(total);
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <SectionHeading title="Your Cart is Empty" />
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/products">
            <Button className="rounded-full">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <a href="/" className="hover:text-black">
          Home
        </a>
        <span>/</span>
        <span className="font-medium text-black">Cart</span>
      </div>

      <SectionHeading 
        title="Your Cart" 
        centered={false} 
        className="mb-8"
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b text-sm text-gray-500">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-end">Subtotal</div>
          </div>

          {cart.map((item) => (
            <div
              key={item.product.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 border-b"
            >
              <div className="col-span-1 md:col-span-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-md flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Size: {item.size}, Color: {item.color}
                    </p>
                    <button 
                      onClick={() => removeFromCart(item.product.id)} 
                      className="text-sm text-red-500 inline-flex items-center gap-1"
                    >
                      <Trash2 size={14} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 flex md:justify-center items-center">
                <div className="md:hidden text-sm text-gray-500 w-20">Price:</div>
                <div>${item.product.price.toFixed(2)}</div>
              </div>

              <div className="col-span-1 md:col-span-2 flex md:justify-center items-center">
                <div className="md:hidden text-sm text-gray-500 w-20">Quantity:</div>
                <div className="flex items-center border rounded-full">
                  <button
                    onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 flex md:justify-end items-center">
                <div className="md:hidden text-sm text-gray-500 w-20">Subtotal:</div>
                <div className="font-medium">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="border rounded-lg p-6">
            <h3 className="font-medium text-lg mb-4">Order Summary</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full rounded-full mb-3">
              Proceed to Checkout
            </Button>
            
            <Link to="/products">
              <Button variant="outline" className="w-full rounded-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
