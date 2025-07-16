"use client";

import { use,useEffect, useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
export default function CollectionPage({ params }) {
   const { collection } = use(params);
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/collections/${collection}/products`
      );
      if (!res.ok) throw new Error("Products not found");
      const json = await res.json();
      setProducts(json); // Store the products array
    } catch (err) {
      console.error("Error fetching collection:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const fetchCollection = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/collections/${collection}`
      );
      if (!res.ok) throw new Error("Collection not found");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchCollection();
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error || !data) {
    return <div className="p-6">Collection not found.</div>;
  }

  const imageUrl = data.image?.replace(/^"|"$/g, "");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto py-6 gap-6">
        {/* Left - Filters */}
        <div className="w-full md:w-1/3">
          <FilterSidebar colors={data.colors} description={data.description} />
        </div>

        {/* Right */}
        <div className="w-full ">
          {/* - Image */}
          <div className="w-full  relative aspect-[16/10] mx-aut mb-10">
            <Image
              src={imageUrl}
              alt={data.name}
              layout="fill"
              objectFit="cover"
              className="w-full shadow"
            />

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 px-4 py-6  text-center shadow-lg backdrop-blur-sm">
              <h1 className="text-2xl font-semibold text-black">{data.name}</h1>
              <p className=" mt-2 text-gray-700">
                &quot;{data.description || "No description available."}&quot;
              </p>
            </div>
          </div>
          <div className="min-h-screen  grid grid-cols-2 w-full  gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
