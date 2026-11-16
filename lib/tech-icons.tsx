import type { IconType } from "react-icons";
import { FaJava, FaHtml5, FaCss3Alt, FaJs, FaAws } from "react-icons/fa";
import { BiSolidCoffeeBean } from "react-icons/bi";
import { Coffee, Network, Mail } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiAndroid,
  SiKotlin,
  SiFlutter,
  SiSpring,
  SiMysql,
  SiPostgresql,
  SiNodedotjs,
  SiGithub,
  SiPrisma,
  SiMongodb,
  SiFirebase,
  SiDocker,
  SiPython,
  SiApachekafka,
  SiHibernate,
  SiJsonwebtokens,
  SiGooglemaps,
} from "react-icons/si";

type Tech = {
  icon: IconType;
  color: string;
};

const icons = {
  React: { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  Tailwind: { icon: SiTailwindcss, color: "#38BDF8" },
  Java: { icon: FaJava, color: "#ED8B00" },
  EJB: { icon: BiSolidCoffeeBean, color: "#6DB33F" },
  JMS: { icon: Mail, color: "#F89820" },
  JWT: { icon: SiJsonwebtokens, color: "#00F2E6" },
  ApacheMQ: { icon: SiApachekafka, color: "#D22128" },
  Python: { icon: SiPython, color: "#FFD43B" },
  "Jakarta EE": { icon: Coffee, color: "#F98200" },
  REST: { icon: Network, color: "#007AFF" },
  SpringBoot: { icon: SiSpring, color: "#6DB33F" },
  Android: { icon: SiAndroid, color: "#3DDC84" },
  Kotlin: { icon: SiKotlin, color: "#A97BFF" },
  Flutter: { icon: SiFlutter, color: "#02569B" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  Hibernate: { icon: SiHibernate, color: "#59666C" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  GitHub: { icon: SiGithub, color: "#FFFFFF" },
  HTML: { icon: FaHtml5, color: "#E34F26" },
  CSS: { icon: FaCss3Alt, color: "#1572B6" },
  JavaScript: { icon: FaJs, color: "#F7DF1E" },
  "React Native": { icon: SiReact, color: "#61DAFB" },
  Prisma: { icon: SiPrisma, color: "#FFFFFF" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  Firebase: { icon: SiFirebase, color: "#FFCA28" },
  "Google Map": { icon: SiGooglemaps, color: "#EA4335" },
  AWS: { icon: FaAws, color: "#FF9900" },
  Docker: { icon: SiDocker, color: "#2496ED" },
} satisfies Record<string, Tech>;

export type TechName = keyof typeof icons;
export const techIcons: Record<string, Tech> = icons;
