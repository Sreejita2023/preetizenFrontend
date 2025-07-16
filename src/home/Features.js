"use client";
import Image from "next/image";
const features = [
  {
    icon: "https://static.wixstatic.com/media/cf391b_003e08d43e67463392f974d3ef0a022c~mv2.png/v1/fill/w_72,h_72,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/knitting.png",
    title: "HANDCRAFTED WITH HEART",
    description: "Each piece is made mindfully with local artisans",
  },
  {
    icon: "https://static.wixstatic.com/media/cf391b_721fdbed41034e968439cf2adc95b405~mv2.png/v1/fill/w_72,h_72,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ecological_17002218.png",
    title: "SUSTAINABLY STYLED",
    description: "Eco-friendly fabrics & packaging — conscious in every step.",
  },
  {
    icon: "https://static.wixstatic.com/media/cf391b_9bb3504c909b43aabed4dd33e52a0f16~mv2.png/v1/fill/w_72,h_72,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/hands_9077935.png",
    title: "EMPOWERING EVERY BODY",
    description:
      "No size, height, color, or label rules here — just style for all.",
  },
  {
    icon: "https://static.wixstatic.com/media/cf391b_a033ac99b93e4abd96df48846709e9e4~mv2.png/v1/fill/w_72,h_72,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/team.png",
    title: "COMMUNITY DRIVEN",
    description: "From followers to models — we create with real people",
  },
  {
    icon: "https://static.wixstatic.com/media/cf391b_9dbdc50bab81465ba7e7e177891bd3c0~mv2.png/v1/fill/w_72,h_72,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/limited.png",
    title: "LIMITED AND LOVED",
    description:
      "We produce in small, purposeful batches so nothing is wasted.",
  },
  {
    icon: "https://static.wixstatic.com/media/cf391b_caf1db55e1f84078a9827d5483a7b49f~mv2.png/v1/fill/w_72,h_72,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/india%20(1).png",
    title: "MADE IN INDIA",
    description: "Designed in Kolkata, Made with ♥ in India",
  },
];

export default function Features() {
  return (
    <section className="max-w-6xl mx-auto py-16 px-4 text-center">
      <h2 className="text-4xl font-semibold tracking-widest mb-12">
        ROOTED IN INTENTION
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition"
          >
            <Image
              width={40}
              height={40}
              alt="Image"
              src={item.icon}
            />
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
