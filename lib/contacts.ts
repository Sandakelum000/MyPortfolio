import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

import type { ComponentType } from "react";
import {
  Mail,
} from "lucide-react";

import { site } from "@/data/site";

export type Contact = {
  label: string;
  value: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const pretty = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const { email, github, linkedin } = site.links;

export const contacts: Contact[] = [
  ...(email
    ? [{ label: "Email", value: email, href: `mailto:${email}`, icon: Mail }]
    : []),
  ...(github
    ? [{ label: "GitHub", value: pretty(github), href: github, icon: FaLinkedin }]
    : []),
  ...(linkedin
    ? [{ label: "LinkedIn", value: pretty(linkedin), href: linkedin, icon: SiGithub }]
    : []),
];

export const contactEmail = email || null;