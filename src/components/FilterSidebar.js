"use client";
import { useState } from "react";
import sizes from "@/data/sizes.json";
import colorMap from "@/data/colors.json";

export default function FilterSidebar({
  colors = [],
  minPrice = 999,
  maxPrice = 2699,
  description,
}) {
  const [showPrice, setShowPrice] = useState(true);
  const [showColor, setShowColor] = useState(true);
  const [showSizes, setShowSizes] = useState(true);

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <div className=" p-4 rounded-xl  space-y-6 w-full">
      <h2 className="text-xl font-semibold">Filter by</h2>

      {/* Price Filter */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowPrice(!showPrice)}
        >
          <h3 className="font-medium">Price</h3>
          <span>{showPrice ? "−" : "+"}</span>
        </div>

        {showPrice && (
          <>
            <div className="relative w-full mt-4 h-6">
              {/* Calculate percentages for gradient */}
              {(() => {
                const rangeTotal = maxPrice - minPrice;
                const minPercent =
                  ((priceRange[0] - minPrice) / rangeTotal) * 100;
                const maxPercent =
                  ((priceRange[1] - minPrice) / rangeTotal) * 100;

                const background = `linear-gradient(
            to right,
            #ccc 0%,
            #ccc ${minPercent}%,
            black ${minPercent}%,
            black ${maxPercent}%,
            #ccc ${maxPercent}%,
            #ccc 100%
          )`;

                return (
                  <div
                    className="absolute w-full h-[2px] rounded-full top-[12px]"
                    style={{ background }}
                  />
                );
              })()}

              {/* Min Range */}
              <input
                type="range"
                min={minPrice}
                max={priceRange[1] - 1}
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="absolute w-full pointer-events-none appearance-none h-1 bg-transparent z-10"
                style={{ zIndex: priceRange[0] > minPrice ? 20 : 10 }}
              />

              {/* Max Range */}
              <input
                type="range"
                min={priceRange[0] + 1}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="absolute w-full pointer-events-none appearance-none h-1 bg-transparent z-20"
              />

              {/* Custom range thumb styling */}
              <style jsx>{`
                input[type="range"]::-webkit-slider-thumb {
                  pointer-events: auto;
                  -webkit-appearance: none;
                  height: 14px;
                  width: 14px;
                  background: black;
                  border-radius: 50%;
                  cursor: pointer;
                  margin-top: 4px;
                }

                input[type="range"]::-webkit-slider-runnable-track {
                  height: 2px;
                  background: transparent;
                }

                input[type="range"]::-moz-range-thumb {
                  height: 14px;
                  width: 14px;
                  background: black;
                  border-radius: 50%;
                  cursor: pointer;
                }

                input[type="range"]::-moz-range-track {
                  height: 2px;
                  background: transparent;
                }
              `}</style>
            </div>

            <div className="flex justify-between text-sm text-gray-600 mt-3">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </>
        )}
      </div>
      {/* Colour Filter */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowColor(!showColor)}
        >
          <h3 className="font-medium">Colour</h3>
          <span>{showColor ? "−" : "+"}</span>
        </div>
        {showColor && (
          <div className="flex gap-3 mt-3 items-center flex-wrap">
            {colors.map((color, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div
                  onClick={() =>
                    setSelectedColor(selectedColor === color ? null : color)
                  }
                  className={`w-6 h-6 rounded-full border-2 cursor-pointer ${
                    selectedColor === color ? "ring-2 ring-black" : ""
                  }`}
                  title={color}
                  style={{
                    backgroundColor: colorMap[color] || "#ccc",
                  }}
                ></div>
                {selectedColor === color && (
                  <span className="text-sm">{color}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sizes Filter */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowSizes(!showSizes)}
        >
          <h3 className="font-medium">Sizes</h3>
          <span>{showSizes ? "−" : "+"}</span>
        </div>
        {showSizes && (
          <div className="mt-3 space-y-2">
            {sizes.map((size) => (
              <label key={size} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => toggleSize(size)}
                  className="form-checkbox accent-black"
                />
                {size}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
