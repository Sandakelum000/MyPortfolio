import {
  Database,
  Monitor,
  Server,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import type { TechName } from "@/lib/tech-icons";

export type SkillGroup = {
  title: string;
  icon: LucideIcon;
  items: TechName[]; 
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Monitor,
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    items: ["Java", "Jakarta EE", "SpringBoot", "Node.js"],
  },
  {
    title: "Mobile",
    icon: Smartphone,
    items: ["React Native", "Android", "Kotlin"],
  },
  {
    title: "Databases",
    icon: Database,
    items: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"],
  },
];
