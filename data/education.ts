export type EducationEntry = {
  period: string;
  title: string;
  institution: string;
  location?: string;
  description?: string;
  highlights?: string[];
  type: "university" | "school" | "course";
  current?: boolean;
};

export const education: EducationEntry[] = [
  {
    period: "2023 - Present",
    title: "BSc (Hons) in Software Engineering",
    institution: "Java Institute For Advanced Technology",
    location: "Colombo, Sri Lanka",
    description:
      "Pursuing a degree in Software Engineering, developing a strong foundation in software design, programming, and application development.",
    highlights: ["Web Development","AI & Research", "IoT Development"],
    type: "university",
    current: true,
  },
  {
    period: "2020 - 2022",
    title: "GCE Advanced Level, Science Stream",
    institution: "Gurukula College",
    location: "Kelaniya, Sri Lanka",
    description:
      "Completed Advanced Level studies in the Science stream, strengthening analytical thinking, logical reasoning, mathematical knowledge, and problem-solving abilities.",
    type: "school",
  },
  {
    period: "2014 - 2019",
    title: "GCE Ordinary Level",
    institution: "Gurukula College",
    location: "Kelaniya, Sri Lanka",
    description:"Completed secondary education, building a foundation in academic knowledge, independent learning, communication, and critical thinking.",
    type: "school",
  },
];