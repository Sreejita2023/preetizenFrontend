"use client"
import React, { useRef, useState } from "react";
import { Play } from "lucide-react";
import Image from "next/image";
const Story = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    videoRef.current.currentTime = 0;
  };

  return (
    <div className="relative flex flex-col md:flex-row justify-between items-center px-6 py-12 bg-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://static.wixstatic.com/media/cf391b_2c8e98cf1d1d4af0929ebdb64f0ef085~mv2.jpeg/v1/fill/w_1092,h_816,al_c,q_85,enc_avif,quality_auto/cf391b_2c8e98cf1d1d4af0929ebdb64f0ef085~mv2.jpeg')",
        }}
      ></div>
      {/* Left Side - Text */}
      <div className="w-full md:w-1/2 text-center  space-y-4">
        <h2 className="text-4xl font-bold">THE WILDFLOWER STORY</h2>
        <p className="text-gray-700">
          “I am a wildflower. And my nature is to bloom” <br />
          — This isn&#39;t just a line from a poem I wrote last year, <br />
          it is a truth I have lived by. <br />
          Wildflowers don&#39;t grow in manicured gardens. <br />
          They grow on stones, through cracks, in deserts; <br />
          Unnoticed. Unnurtured. Unloved. <br />
          Yet, they bloom. <br />
          Because that’s what they’re meant to do. <br />
          The Wildflower collection is my story in stitches. <br />
          It’s not about looking delicate. <br />
          It’s about being unstoppable. <br />
          It’s about blooming — <br />
          especially when no one expects you to. <br />
          Because for some of us, <br />
          Blooming isn’t a luxury. <br />
          It’s our nature.
        </p>
        <button className="bg-black text-white px-6 py-2 font-semibold mt-4">
          SHOP COLLECTION
        </button>
      </div>

      {/* Right Side - Video */}
      <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center relative">
        <div className="relative w-full max-w-md h-[500px] overflow-hidden rounded-md">
          {/* Placeholder Image with Play Button */}
          {!isPlaying && (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 hover:bg-black/70 transition cursor-pointer"
              onClick={handlePlayPause}
            >
              <Image
                src="https://static.wixstatic.com/media/cf391b_bca2a9b40d674aea84d307c72f2af117f002.jpg/v1/fill/w_578,h_948,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/cf391b_bca2a9b40d674aea84d307c72f2af117f002.jpg"
                alt="Video Preview"
                width={367}
                height={602}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-16 h-16 text-white" />
              </div>
            </div>
          )}

          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-[500px] object-cover rounded-md"
            controls
            onEnded={handleEnded}
            style={{ display: isPlaying ? "block" : "none" }}
          >
            <source
              src="https://video.wixstatic.com/video/cf391b_bca2a9b40d674aea84d307c72f2af117/720p/mp4/file.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Story;
