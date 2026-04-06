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

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <Image
          src="https://images.unsplash.com/photo-1523398002811-999ca8dec234"
          alt="Hero"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="z-10 px-4">
          <h1 className="text-6xl font-bold">VicCoopper Store</h1>
          <p className="mt-4 text-lg text-gray-300">
            Own Your Style. Define Your Presence.
          </p>
          <button className="mt-6 px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl text-center mb-12">Collections</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {["Men", "Women", "Streetwear", "Essentials"].map((item) => (
            <div key={item} className="bg-zinc-900 p-10 text-center rounded-xl hover:scale-105 transition">
              <p className="text-xl">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-4xl text-center mb-12">Best Sellers</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((item, index) => (
            <div key={index} className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition duration-300">
              <div className="relative h-80">
                <Image
                  src={`${item.image}?auto=format&fit=crop&w=800&q=80`}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg">{item.name}</h3>
                <p className="text-gray-400">{item.price}</p>
                <button className="mt-4 w-full bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER SECTION */}
      <section className="py-24 text-center bg-zinc-950">
        <h2 className="text-4xl mb-4">Elevate Your Wardrobe</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Premium materials. Timeless designs. Street-ready confidence.
        </p>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl mb-12">What People Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["Amazing quality!", "Feels premium!", "Best streetwear ever!"].map((text, i) => (
            <div key={i} className="bg-zinc-900 p-6 rounded-xl hover:scale-105 transition duration-300">
              <p className="text-gray-300">"{text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 bg-zinc-950 text-center px-6">
        <h2 className="text-3xl mb-4">Join VicCoopper</h2>
        <p className="text-gray-400 mb-6">
          Get updates on drops, exclusive deals, and more.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg bg-black border border-gray-700 text-white w-full outline-none focus:border-white transition"
          />
          <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl mb-4">About VicCoopper</h2>
        <p className="text-gray-400">
          VicCoopper Store blends luxury with street culture. Built for those who refuse to blend in.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500">
        © {new Date().getFullYear()} VicCoopper Store
      </footer>

    </main>
  );
}
