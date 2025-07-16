"use client";

import { useEffect, useState } from "react";
import React from "react";
import {
  calculateCartTotal,
  calculateCartItemCount,
} from "@/utils/calculateTotal";
import { useModal } from "@/context/ModalContext";
import Image from "next/image";
export default function CartSidebar() {
  const { sidebarOpen, setSidebarOpen, setCount, count ,info,} = useModal();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchitems = async () => {
      if (!info) {
          setSidebarOpen(false);
          alert("Login to see your cart")
          return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/users/${info}/items`
      );
      const data = await res.json();
      console.log(data)
      setCount(calculateCartItemCount(data));
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch cart items:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/users/${info}/items/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) {
        const itemToRemove =items.find((item) => item.id === itemId);

        if (itemToRemove) {
          // Subtract the quantity of the removed item from count
          setCount((prevCount) => prevCount - itemToRemove.quantity);
        }
        setItems((prev) => prev.filter((item) => item.id !== itemId));
      } else {
        console.error("Failed to delete item:", response.data);
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity <= 0) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/users/${
          info
        }/items/${itemId}?quantity=${newQuantity}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const updatedItem = await response.json();
      console.log(updatedItem);
      console.log(updatedItem.quantity);
      setCount((prev)=>prev-quantity)
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: updatedItem.quantity }
            : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity", err);
    }
    };

    const createOrderFromCart = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/users/${
            info
          }/from-cart`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Failed to create order");
        }

        const order = await response.json();
        setCount(0)
          setItems([])
          alert("Order placed successfully")
        console.log("Order created:", order);
        return order;
      } catch (error) {
        console.error("Error creating order from cart:", error.message);
        throw error;
      }
    };

    
  useEffect(() => {
    if (sidebarOpen) {
      fetchitems();
      
    }
  }, [sidebarOpen]);
  
  const subtotal = calculateCartTotal(items);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transition-transform duration-300 z-50 overflow-y-auto ${
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">
          Cart ({count})
        </h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-gray-500 hover:text-black"
        >
          &times;
        </button>
      </div>
      <div className="overflow-y-auto max-h-[60vh] px-4 py-2 mb-4">
        {items.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex gap-4 border-b pb-4 mt-4">
              <Image
                width={64}
                height={80}
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-20 h-28 object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-sm">{item.product.name}</h3>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 font-bold"
                  >
                    🗑
                  </button>
                </div>
                <p className="text-xs text-gray-600 mb-1">Size: {item.size}</p>
                <p className="text-sm text-gray-800">
                  ₹
                  {item.product.discounted_price == 0
                    ? item.product.price
                    : item.product.discounted_price}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="px-2 border rounded"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                </div>

                <p className="mt-2 font-semibold text-right">
                  ₹
                  {item.quantity *
                    (item.product.discounted_price == 0
                      ? item.product.price
                      : item.product.discounted_price)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="p-4 border-t mt-auto">
          <div className="flex justify-between text-lg font-semibold">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <p className="text-xs text-gray-600 mb-4">
            Taxes and shipping are calculated at checkout.
          </p>
          <button
            className="w-full bg-black text-white py-2 rounded mb-2"
            onClick={() => createOrderFromCart()}
          >
            Checkout
          </button>
          <button className="w-full border py-2 rounded">View Cart</button>
          <p className="text-center text-xs mt-2 text-gray-500">
            🔒 Secure Checkout
          </p>
        </div>
      )}
    </div>
  );
}
