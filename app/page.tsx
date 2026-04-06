"use client";

import Image from "next/image";

export default function Home() {
  const products = [
    {
      name: "Black Hoodie",
      price: "$120",
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990",
    },
    {
      name: "White Tee",
      price: "$60",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    },
    {
      name: "Street Jacket",
      price: "$180",
      image: "https://images.unsplash.com/photo-1520975922284-9f6f1b92b6a1",
    },
  ];

  return (
    <main className="bg-black text-white min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <Image
          src="https://images.unsplash.com/photo-1523398002811-999ca8dec234"
          alt="Hero"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold">
            VicCoopper Store
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Own Your Style. Define Your Presence.
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Best Sellers
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition duration-300"
            >
              <div className="relative h-80">
                <Image
                  src={`${item.image}?auto=format&fit=crop&w=800&q=80`}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-400">{item.price}</p>

                <button className="mt-4 w-full bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-16 bg-zinc-950 text-center">
        <h2 className="text-3xl font-semibold mb-4">About VicCoopper</h2>
        <p className="max-w-2xl mx-auto text-gray-400">
          VicCoopper Store blends luxury with street culture. Designed for
          individuals who move different, think different, and dress with
          purpose.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} VicCoopper Store. All rights reserved.
      </footer>
    </main>
  );
}

/*
@nextjs @react @typescript @vercel  
@deployment @build-optimization @debugging  
@clean-code @scalable-architecture  
@performance-optimization @seo @security-best-practices  
@responsive-design @ui-ux @accessibility  
@component-architecture @modular-design
*/
