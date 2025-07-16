"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
const ProductCard = ({ product }) => {
    const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/product-page/${product.id}`}
      className="block w-[300px] group cursor-pointer"
    >
      <div className="relative rounded-md overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
        {/* Tag */}
        {product.property_tag && (
          <div className="absolute top-2 left-2 z-10 bg-black text-white text-xs px-3 py-1 rounded-full">
            {product.property_tag}
          </div>
        )}

        {/* Image Container */}
        <div
          className="aspect-[3/4] relative cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src={hovered ? product.images[1] : product.images[0]}
            alt={product.name}
            fill
            className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Product Info */}
        <div className="bg-white p-4 text-center space-y-2">
          <h3 className="text-[16px] font-medium">{product.name}</h3>
          <div className="text-[15px] space-y-1">
            {product.discounted_price && product.discounted_price !== 0 ? (
              <>
                <p className="line-through text-gray-500">₹{product.price}</p>
                <p className="text-black font-semibold">
                  ₹{product.discounted_price}
                </p>
              </>
            ) : (
              <p className="text-black font-semibold pb-6">₹{product.price}</p>
            )}
          </div>

          <button className="w-full bg-gray-800 text-white py-2 text-sm hover:bg-black transition rounded-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
