import { Compass, Palette, Code2, Search, Megaphone, Share2, type LucideIcon } from "lucide-react";

export interface Service { title: string; description: string; icon: LucideIcon }

export const services: Service[] = [
  { title: "Digital Strategy", description: "Market research and a channel plan tied to revenue targets.", icon: Compass },
  { title: "Branding", description: "Identity systems that make a young company look established.", icon: Palette },
  { title: "Web Design & Development", description: "Fast, accessible sites built to convert visitors.", icon: Code2 },
  { title: "SEO", description: "Technical audits and content that earns lasting organic traffic.", icon: Search },
  { title: "Performance Marketing", description: "Paid campaigns optimised weekly against cost per acquisition.", icon: Megaphone },
  { title: "Social & Content", description: "A steady publishing rhythm that builds an audience.", icon: Share2 },
];
