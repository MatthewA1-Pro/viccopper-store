export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  hoverImage: string;
  sizes: string[];
  colors: string[];
  description: string;
  details: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "h-001",
    name: "Architectural Hoodie",
    category: "Streetwear",
    price: 32000,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Silver"],
    description: "A heavy-weight, structured hoodie featuring architectural side-seams and a laser-cut hem.",
    details: ["450GSM Cotton Fleece", "Reinforced shoulders", "Boxy fit", "Made in Italy"]
  },
  {
    id: "t-001",
    name: "Neon-Line Tee",
    category: "Men",
    price: 18000,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    description: "Ultra-fine Supima cotton tee with reactive neon graphic lines that glow under UV.",
    details: ["100% Supima Cotton", "Oversized fit", "Reactive printing", "Tagless design"]
  },
  {
    id: "a-001",
    name: "Cyber Mesh Tote",
    category: "Essentials",
    price: 24500,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
    sizes: ["ONE SIZE"],
    colors: ["Chrome", "Black"],
    description: "Heavy-duty industrial mesh tote with chrome hardware and detachable carabiner system.",
    details: ["Industrial grade mesh", "Waterproof liner", "Aircraft aluminum clips", "Modular attachments"]
  },
  {
    id: "h-002",
    name: "Vantage Parka",
    category: "Streetwear",
    price: 89000,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=800&auto=format&fit=crop",
    sizes: ["M", "L"],
    colors: ["Grey"],
    description: "Multi-layered technical parka with adaptive thermal lining and integrated harness.",
    details: ["3-Layer Gore-Tex", "Heat-sealed seams", "Internal harness", "Micro-fleece pockets"]
  },
  {
    id: "b-001",
    name: "Grid Shorts",
    category: "Women",
    price: 21000,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop",
    sizes: ["S", "M", "L"],
    colors: ["Grey", "Black"],
    description: "Technical shorts featuring a subtle grid texture and high-frequency welded zippers.",
    details: ["Ripstop Nylon", "Welded pockets", "Elastic drawstring", "Reflective logos"]
  },
  {
    id: "a-002",
    name: "Linear Sunglasses",
    category: "Essentials",
    price: 34000,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=800&auto=format&fit=crop",
    sizes: ["ONE SIZE"],
    colors: ["Black", "White"],
    description: "Acetate frame sunglasses with polarized Zeiss lenses and titanium hinges.",
    details: ["Italian Acetate", "Zeiss Optics", "Titanium Hardware", "UV400 Protection"]
  }
];
