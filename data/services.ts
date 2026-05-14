export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features?: string[];
}

export const services: Service[] = [
  {
    id: "architectural-design",
    icon: "Building2",
    title: "Architectural Design",
    description: "Comprehensive architectural design services from concept to completion, creating spaces that inspire and endure.",
    features: ["Conceptual Design", "Technical Drawings", "3D Visualization", "Permit Assistance"],
  },
  {
    id: "interior-design",
    icon: "Sofa",
    title: "Interior Design",
    description: "Thoughtful interior environments that balance aesthetics with functionality, creating spaces that reflect your unique vision.",
    features: ["Space Planning", "Material Selection", "Furniture Design", "Lighting Design"],
  },
  {
    id: "project-management",
    icon: "ClipboardList",
    title: "Project Management",
    description: "Expert oversight of your construction project from groundbreaking to completion, ensuring quality and timeline adherence.",
    features: ["Timeline Management", "Budget Control", "Contractor Coordination", "Quality Assurance"],
  },
  {
    id: "consultation",
    icon: "MessageSquare",
    title: "Design Consultation",
    description: "Professional guidance and expertise to help you make informed decisions about your architectural and design challenges.",
    features: ["Site Analysis", "Feasibility Studies", "Design Review", "Sustainable Solutions"],
  },
];
