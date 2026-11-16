export type Project = {
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  images?: string[];
  features?: string[];
  role?: string;
  year?: string;
  category: "Web" | "Mobile" | "Backend";
  tags: string[];
  github?: string;
  live?: string;
};

