"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import CollectionShimmer from "./CollectionShimmer";
export default function CollectionShowcase({ collection }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
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
  }, [collection]);

  if (loading) return <div className="text-center py-10"><CollectionShimmer/></div>;
  if (error || !data)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load collection.
      </div>
    );
    const imageUrl = data.image?.replace(/^"|"$/g, "");
  return (
    <section className="text-center px-4 py-10">
      <p className="text-sm tracking-wide mb-2">INTRODUCING THE</p>
      <h2 className="text-3xl md:text-5xl font-semibold tracking-wide mb-8">
        {data.name}
      </h2>

      <div className="w-8/12 mx-auto">
        <Image
          src={imageUrl}
          alt={data.name}
          width={800} // Adjust as needed
          height={500}
          className="w-full object-cover rounded-md shadow-md"
        />
      </div>

      <button className="mt-8 bg-black text-white font-semibold px-6 py-3 rounded hover:bg-gray-800 transition">
        SHOP COLLECTION
      </button>
    </section>
  );
}
