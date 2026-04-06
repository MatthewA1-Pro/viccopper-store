"use client";

import { Product } from "@/src/data/products";
import { formatCurrency, cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/src/store/useCart";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, setIsOpen } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: product.sizes[0],
    });
    setIsOpen(true);
  };

  return (
    <Link 
      href={`/product/${product.id}`}
      className={cn("group relative flex flex-col space-y-4 transition-all duration-700", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/5 border border-white/5">
        <Image
          src={isHovered ? product.hoverImage : product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Badges/Tags */}
        <div className="absolute left-4 top-4">
           {product.id.startsWith('h') && (
             <span className="bg-accent px-3 py-1 text-[8px] font-black tracking-widest text-white uppercase">New Drop</span>
           )}
        </div>

        {/* Quick Add Button */}
        <div className="absolute inset-0 flex items-end p-4 opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-white text-black py-4 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-accent hover:text-white transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingBag size={14} />
            <span>Quick Shop</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center text-center space-y-1">
        <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">{product.category}</p>
        <h3 className="text-sm font-bold tracking-widest uppercase transition-colors group-hover:text-accent">{product.name}</h3>
        <p className="text-sm font-bold tracking-widest transition-opacity">{formatCurrency(product.price)}</p>
      </div>
    </Link>
  );
}

export function ProductSkeleton() {
  return (
    <div className="flex flex-col space-y-4 animate-pulse">
      <div className="aspect-[3/4] w-full bg-white/5" />
      <div className="flex flex-col items-center space-y-2">
        <div className="h-2 w-16 bg-white/10" />
        <div className="h-4 w-32 bg-white/10" />
        <div className="h-3 w-12 bg-white/10" />
      </div>
    </div>
  );
}
