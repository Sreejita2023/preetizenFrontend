"use client"; // ✅ Explicitly declare this for clarity in app directory (optional in pages)

import Story from "@/home/Story";
import CollectionShowcase from "@/home/CollectionShowcase";
import SignupWithImage from "@/home/SignupWithImage";
import Features from '@/home/Features'
export default function Home() {

  return (
    <div>
      <CollectionShowcase collection={"teezen-collection"} />
      <CollectionShowcase collection={"wildflower-collection"} />
      <Story />
      <Features />
      <SignupWithImage />
    </div>
  );
}
