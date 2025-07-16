"use client"
import {use, useEffect, useState } from "react";
import Accordion from "@/components/Accordion";
import sizes from "@/data/sizes.json";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";
export default function ProductPage({params}) {

  const { product } = use(params);
  const [products, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [customSize, setCustomSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const { setSidebarOpen } = useModal();
  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login to add items to your cart.");
      return;
    }

    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/users/${user.user_id}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: products.id,
            quantity,
            size: selectedSize,
          }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to add to cart");
      }
     
      const data = await res.json();
      console.log("Added to cart:", data);
      alert("Item added to cart!");
      setSidebarOpen(true);
    } catch (error) {
      console.error("Add to cart failed:", error.message);
      alert("Error: " + error.message);
    }
  };

 

 const fetchProduct = async () => {
   try {
     const res = await fetch(
       `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${product}`
     );
     if (!res.ok) throw new Error("Product not found");
     const json = await res.json();
     setProduct(json);
     console.log(json); // For debugging
   } catch (err) {
     console.error("Error fetching product:", err);
     setError(true);
   } 
 };

 useEffect(() => {
   if (!product) return;
   fetchProduct();
 }, [product]);

  const toggleAccordion = (key) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  if (!products) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left Image Section */}
      <div>
        <Image
          src={products.images[selectedImage]}
          alt={products.name}
          width={400} // you can adjust based on your layout
          height={533}
          objectFit="cover"
          className="w-full object-cover rounded-md"
        />
        <div className="flex gap-2 mt-4">
          {products.images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              width={64} // 16 * 4 = 64px
              height={80} // 20 * 4 = 80px
              objectFit="cover"
              alt={`thumb-${idx}`}
              onClick={() => setSelectedImage(idx)}
              className={`w-16 h-20 object-cover cursor-pointer border-2 ${
                selectedImage === idx ? "border-black" : "border-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Info Section */}
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <div className="text-xl font-medium text-gray-800">
          ₹
          {products.discounted_price !== 0 ? (
            <>
              <span className="line-through mr-2 text-gray-400">
                {products.price}
              </span>
              <span>{products.discounted_price}</span>
            </>
          ) : (
            products.price
          )}
        </div>

        {/* Size Dropdown */}
        <div>
          <label className="block mb-1 text-sm">Sizes *</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="">Select</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Size */}
        <div>
          <label className="block mb-1 text-sm">
            Custom Size (if selected) (optional)
          </label>
          <textarea
            value={customSize}
            onChange={(e) => setCustomSize(e.target.value)}
            maxLength={500}
            rows={2}
            className="w-full border border-gray-300 rounded p-2"
          />
          <p className="text-xs text-right text-gray-400">
            {customSize.length}/500
          </p>
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1 text-sm">Quantity *</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 border text-lg font-bold"
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 border text-lg font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800"
            onClick={() => handleAddToCart()}
          >
            Add to Cart
          </button>
          <button
            onClick={() => setWishlist((w) => !w)}
            className="w-10 h-10 border rounded flex items-center justify-center text-xl"
          >
            {wishlist ? "♥" : "♡"}
          </button>
        </div>
        <button className="w-full bg-gray-900 text-white py-2 rounded hover:bg-black">
          Buy Now
        </button>

        {/* Accordion */}
        <div className="mt-6">
          <Accordion
            title="Material Description"
            content={products.material}
            isOpen={openAccordion === "material"}
            onToggle={() => toggleAccordion("material")}
          />
          <Accordion
            title="Model Details"
            content={products.model}
            isOpen={openAccordion === "model"}
            onToggle={() => toggleAccordion("model")}
          />
        </div>
      </div>
    </div>
  );
}
