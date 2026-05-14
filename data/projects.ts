export interface Project {
  id: string;
  title: string;
  category: "architecture" | "interior" | "residential" | "commercial";
  year: number;
  location: string;
  description: string;
  thumbnail: string;
  images: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "villa-facade-design",
    title: "Villa Façade Design",
    category: "residential",
    year: 2024,
    location: "Algeria",
    description:
      "A contemporary residential villa featuring an expressive façade that merges textured stone panels with a precision-perforated metal screen. The design creates a dialogue between solid and void, light and shadow — providing privacy without sacrificing visual interest.\n\nThe rooftop terrace with its pergola structure and lush greenery integrates biophilic elements into the urban context, while vertical bamboo plantings frame the entrance and soften the architectural geometry.",
    thumbnail: "/images/project-villa-facade.jpg",
    images: [
      "/images/project-villa-facade.jpg",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80",
    ],
    featured: true,
  },
  {
    id: "es-safoua-mall",
    title: "Es-Safoua Mall",
    category: "commercial",
    year: 2023,
    location: "Algeria",
    description:
      "A landmark commercial center that redefines retail culture in the region. The building's façade combines weathered Corten steel cladding with curtain-wall glazing and monumental columns — a bold statement that commands its urban context.\n\nThe towering entrance, flanked by mature palm trees and terracotta architectural columns, creates a memorable arrival sequence. The mixed-use program houses boutique retail, dining, and entertainment across multiple floors.",
    thumbnail: "/images/project-es-safoua-mall.jpg",
    images: [
      "/images/project-es-safoua-mall.jpg",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80",
    ],
    featured: true,
  },
  {
    id: "urban-loft",
    title: "Urban Loft",
    category: "interior",
    year: 2022,
    location: "Algiers, Algeria",
    description:
      "A converted loft space that balances industrial elements with warm, contemporary design. This project preserved original architectural features like exposed brick walls and steel beams, while introducing modern furniture and custom millwork that creates functional zones within the open plan.",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80",
    ],
    featured: true,
  },
  {
    id: "coastal-retreat",
    title: "Coastal Retreat",
    category: "residential",
    year: 2023,
    location: "Annaba, Algeria",
    description:
      "A luxurious seaside residence designed to maximize coastal views while providing a comfortable escape from urban life. Terraced spaces follow the natural topography, connecting indoor living areas with exterior decks that seem to merge with the horizon.",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "zen-garden-house",
    title: "Zen Garden House",
    category: "architecture",
    year: 2021,
    location: "Constantine, Algeria",
    description:
      "A residential project inspired by the principles of tranquility and natural harmony. The house is organized around a central courtyard garden visible from all main living spaces. Materials like cedar wood, natural stone, and woven screens create a serene atmosphere that changes with the seasons.",
    thumbnail: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "modern-office",
    title: "Modern Office",
    category: "commercial",
    year: 2023,
    location: "Oran, Algeria",
    description:
      "A forward-thinking office design that promotes collaboration and wellbeing in the workplace. This project features flexible spaces, abundant natural light, biophilic elements, and acoustically optimized zones for focused work.",
    thumbnail: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?auto=format&fit=crop&q=80",
    ],
  },
];
