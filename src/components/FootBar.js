import Image from "next/image";
export default function FooterBar() {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
        {/* Left: Get in Touch + Icons */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h2 className="text-lg font-semibold tracking-widest">
            GET IN TOUCH
          </h2>
          <div className="flex space-x-6 text-2xl">
            <Image
              src="/whatsapp.avif"
              alt="WhatsApp"
              width={30}
              height={30}
              className="cursor-pointer"
            />
            <Image
              src="/instagram.avif"
              alt="Instagram"
              width={30}
              height={30}
              className="cursor-pointer"
            />
            <Image
              src="/facebook.avif"
              alt="Facebook"
              width={30}
              height={30}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* Right: Policy Links */}
        <div className="text-center md:text-right space-y-2 text-sm tracking-wide">
          <p>PRIVACY POLICY</p>
          <p>TERMS AND CONDITIONS</p>
          <p>SHIPPING & DELIVERY POLICY</p>
          <p>RETURNS, EXCHANGE, & REFUNDS POLICY</p>
          <p>CONTACT US</p>
        </div>
      </div>
    </footer>
  );
}
