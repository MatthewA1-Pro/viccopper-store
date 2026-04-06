"use client";

import { PRODUCTS } from "@/src/data/products";
import { ProductCard, ProductSkeleton } from "@/components/ui/ProductCard";
import { Footer } from "@/components/Footer";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Men", "Women", "Streetwear", "Essentials"];
const SIZES = ["All", "S", "M", "L", "XL", "ONE SIZE"];
const COLORS = ["All", "Black", "White", "Silver", "Grey", "Chrome"];
const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: 1000000 },
  { label: "Under $200", min: 0, max: 20000 },
  { label: "$200 - $500", min: 20000, max: 50000 },
  { label: "Over $500", min: 50000, max: 1000000 },
];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState(PRICE_RANGES[0]);
  const [sortBy, setSortBy] = useState("featured");
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      const matchCategory = selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSize = selectedSize === "All" || p.sizes.includes(selectedSize);
      const matchColor = selectedColor === "All" || p.colors.includes(selectedColor);
      const matchPrice = p.price >= selectedPrice.min && p.price <= selectedPrice.max;
      return matchCategory && matchSize && matchColor && matchPrice;
    });

    if (sortBy === "price_asc") {
      result = result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      result = result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, selectedSize, selectedColor, selectedPrice, sortBy]);

  return (
    <div className="flex flex-col w-full pt-32 min-h-screen bg-background">
      <div className="container px-6 mx-auto mb-20">
         <div className="flex flex-col md:flex-row md:items-end justify-between space-y-8 md:space-y-0">
           <div className="space-y-4">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">Studio Shop</p>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">Full Catalog</h1>
           </div>
           
           <div className="flex flex-wrap items-center gap-6">
             <button 
               onClick={() => setIsFilterOpen(!isFilterOpen)}
               className={cn(
                 "flex items-center space-x-3 text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-300",
                 isFilterOpen ? "text-accent" : "text-foreground hover:text-accent"
               )}
             >
               <SlidersHorizontal size={14} />
               <span>Refine Search</span>
             </button>
             
             <select 
               value={sortBy}
               onChange={(e) => setSortBy(e.target.value)}
               className="bg-transparent border-b border-white/20 pb-1 text-[10px] font-bold tracking-[0.3em] uppercase text-foreground focus:outline-none appearance-none cursor-pointer hover:border-accent transition-colors"
             >
               {SORT_OPTIONS.map(opt => (
                 <option key={opt.value} value={opt.value} className="bg-background text-foreground">
                   {opt.label}
                 </option>
               ))}
             </select>

             <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground whitespace-nowrap hidden sm:block">
               Showing {filteredProducts.length} Results
             </p>
           </div>
         </div>

         {/* Filters Panel */}
         <AnimatePresence>
           {isFilterOpen && (
             <motion.div
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: "auto", opacity: 1 }}
               exit={{ height: 0, opacity: 0 }}
               className="overflow-hidden border-b border-white/5 mt-12 pb-12"
             >
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                 {/* Category Filter */}
                 <div className="space-y-6">
                    <p className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground">Category</p>
                    <div className="flex flex-wrap gap-3">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={cn(
                            "px-4 py-2 border text-[10px] font-bold tracking-widest uppercase transition-all",
                            selectedCategory === cat ? "border-accent bg-accent text-white" : "border-white/10 hover:border-white/30"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                 </div>

                 {/* Size Filter */}
                 <div className="space-y-6">
                    <p className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground">Size</p>
                    <div className="flex flex-wrap gap-3">
                      {SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={cn(
                            "w-12 h-12 border flex items-center justify-center text-[10px] font-bold tracking-widest uppercase transition-all",
                            selectedSize === size ? "border-accent bg-accent text-white" : "border-white/10 hover:border-white/30"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                 </div>

                 {/* Color Filter */}
                 <div className="space-y-6">
                    <p className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground">Color</p>
                    <div className="flex flex-wrap gap-3">
                      {COLORS.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={cn(
                            "px-4 py-2 border text-[10px] font-bold tracking-widest uppercase transition-all",
                            selectedColor === color ? "border-accent bg-accent text-white" : "border-white/10 hover:border-white/30"
                          )}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                 </div>

                 {/* Price Filter */}
                 <div className="space-y-6">
                    <p className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground">Investment</p>
                    <div className="flex flex-col space-y-4">
                      {PRICE_RANGES.map((range) => (
                        <button
                          key={range.label}
                          onClick={() => setSelectedPrice(range)}
                          className={cn(
                            "text-left text-[10px] font-bold tracking-widest uppercase transition-all",
                            selectedPrice.label === range.label ? "text-accent" : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                 </div>
               </div>
             </motion.div>
           )}
         </AnimatePresence>
      </div>

      <div className="container px-6 mx-auto mb-32">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-24">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 space-y-8">
             <p className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground">System: No matches found</p>
             <h2 className="text-3xl font-black uppercase text-center max-w-md">Refine your search parameters</h2>
             <Button variant="outline" onClick={() => {
                setSelectedCategory("All");
                setSelectedSize("All");
                setSelectedColor("All");
                setSelectedPrice(PRICE_RANGES[0]);
             }}>Reset Access</Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
