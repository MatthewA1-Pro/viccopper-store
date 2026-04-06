"use client";

import { PRODUCTS, Product } from "@/src/data/products";
import { formatCurrency, cn } from "@/lib/utils";
import { useCart } from "@/src/store/useCart";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Plus, Minus, Instagram, X, ArrowRight, ShieldCheck, Truck, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addItem, setIsOpen: setIsCartOpen } = useCart();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (product) {
       setActiveImage(product.image);
       setSelectedSize(product.sizes[0]);
       setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background space-y-8">
        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">Protocol Error</p>
        <h1 className="text-4xl font-black uppercase">Asset missing from registry</h1>
        <Button onClick={() => router.push("/shop")}>Return to Shop</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
    });
    setIsCartOpen(true);
    toast.success("Added to Terminal");
  };

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="flex flex-col w-full bg-background pt-32">
      <div className="container px-6 mx-auto mb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Column: Images */}
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
           {/* Thumbnails */}
           <div className="order-2 md:order-1 flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4">
              {[product.image, product.hoverImage, product.image, product.hoverImage].map((img, i) => (
                <button 
                  key={i}
                  onMouseEnter={() => setActiveImage(img)}
                  className={cn(
                    "relative h-24 w-24 overflow-hidden border transition-all duration-300",
                    activeImage === img ? "border-accent scale-105" : "border-white/5 opacity-40 hover:opacity-100 hover:border-white/20"
                  )}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${i}`} fill className="object-cover" />
                </button>
              ))}
           </div>
           
           {/* Main Image */}
           <div className="order-1 md:order-2 flex-1 relative aspect-[3/4] overflow-hidden bg-white/5 border border-white/5 group">
              <motion.div 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/0 to-black/0 opacity-20 pointer-events-none" />
           </div>
        </div>

        {/* Right Column: Info */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col space-y-12 h-fit md:sticky md:top-40">
           <div className="space-y-4">
              <div className="flex items-center space-x-3 text-[10px] font-black tracking-[0.4em] uppercase text-accent mb-4">
                 <span>{product.category}</span>
                 <span className="opacity-30">/</span>
                 <span className="opacity-30">Asset {product.id}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">{product.name}</h1>
              <p className="text-2xl font-bold tracking-widest">{formatCurrency(product.price)}</p>
           </div>

           <div className="space-y-8">
              <p className="text-sm font-medium tracking-tight text-muted-foreground leading-relaxed italic border-l-2 border-accent pl-6">
                 "{product.description}"
              </p>

              {/* Variants Selector */}
              <div className="space-y-8 py-8 border-y border-white/5">
                 {/* Color Selector */}
                 <div className="space-y-4">
                    <p className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground">Spectrum: {selectedColor}</p>
                    <div className="flex space-x-3">
                       {product.colors.map((color) => (
                         <button
                           key={color}
                           onClick={() => setSelectedColor(color)}
                           className={cn(
                             "w-12 h-12 flex items-center justify-center border transition-all",
                             selectedColor === color ? "border-white bg-white text-black" : "border-white/10 hover:border-white/30"
                           )}
                         >
                           <span className="text-[8px] font-bold tracking-widest uppercase">{color}</span>
                         </button>
                       ))}
                    </div>
                 </div>

                 {/* Size Selector */}
                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <p className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground">Dimensions: {selectedSize}</p>
                       <button className="text-[10px] font-bold tracking-widest uppercase text-accent underline opacity-0 animate-fade-in delay-200">Size Guide</button>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                       {product.sizes.map((size) => (
                         <button
                           key={size}
                           onClick={() => setSelectedSize(size)}
                           className={cn(
                             "px-6 py-4 border text-[10px] font-bold tracking-widest uppercase transition-all min-w-[3.5rem]",
                             selectedSize === size ? "border-white bg-white text-black" : "border-white/10 hover:border-white/30"
                           )}
                         >
                           {size}
                         </button>
                       ))}
                    </div>
                 </div>

                 {/* Quantity Selector */}
                 <div className="space-y-4">
                    <p className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground">Volume</p>
                    <div className="flex items-center space-x-6 border border-white/10 w-fit px-4 py-2">
                       <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:text-accent p-2 transition-colors"><Minus size={16} /></button>
                       <span className="text-sm font-bold w-4 text-center">{quantity}</span>
                       <button onClick={() => setQuantity(quantity + 1)} className="hover:text-accent p-2 transition-colors"><Plus size={16} /></button>
                    </div>
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-4 pt-4">
                <Button size="lg" className="w-full text-base group" onClick={handleAddToCart}>
                   <span>Add to Terminal</span>
                   <div className="ml-3 h-px w-0 bg-white transition-all group-hover:w-12 group-hover:bg-accent" />
                </Button>
                <Button variant="ghost" size="lg" className="w-full border border-white/5 hover:border-white/20">
                   Wishlist Entry [0]
                </Button>
              </div>

              {/* Shipping/Security Details */}
              <div className="grid grid-cols-2 gap-8 pt-8 opacity-40">
                 <div className="flex items-start space-x-3">
                   <Truck size={14} className="mt-1" />
                   <div className="space-y-1">
                      <p className="text-[9px] font-black tracking-widest uppercase">Stealth Logistics</p>
                      <p className="text-[8px] font-bold uppercase">2-4 Days Expedited</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-3">
                   <ShieldCheck size={14} className="mt-1" />
                   <div className="space-y-1">
                      <p className="text-[9px] font-black tracking-widest uppercase">Verified Secure</p>
                      <p className="text-[8px] font-bold uppercase">SSL Hardware Encrypted</p>
                   </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Product Deep Information */}
      <section className="section bg-[#050505] border-t border-white/5">
         <div className="container px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
               <div className="space-y-16">
                  <div className="space-y-4">
                     <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">Technical Specs</p>
                     <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Architectural Integrity</h2>
                  </div>
                  <div className="space-y-12">
                     {product.details.map((detail, i) => (
                       <div key={i} className="flex items-center space-x-6 border-b border-white/5 pb-4 group cursor-default">
                          <span className="text-[10px] font-bold text-accent">0{i+1}</span>
                          <p className="text-lg font-bold tracking-tight uppercase group-hover:translate-x-2 transition-transform">{detail}</p>
                       </div>
                     ))}
                  </div>
               </div>
               
               <div className="relative aspect-square border border-white/5 overflow-hidden group">
                  <Image src={product.hoverImage} alt="Details" fill className="object-cover opacity-60 grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[2s]" />
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
            </div>
         </div>
      </section>

      {/* Collection Continuation (Related) */}
      <section className="section bg-background overflow-hidden border-t border-white/5 py-40">
        <div className="container px-6 mx-auto">
          <div className="flex items-end justify-between mb-24">
            <div className="space-y-4">
               <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">Continue Exploring</p>
               <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Similar Assets</h2>
            </div>
            <Link href="/shop" className="group flex items-center space-x-2 text-[10px] font-bold tracking-[0.3em] text-muted-foreground hover:text-white transition-all">
               <span>View Collection</span>
               <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
             {relatedProducts.map((p) => (
               <ProductCard key={p.id} product={p} />
             ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
