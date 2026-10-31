// Centralized social + contact links. Replace the placeholder URLs with your
// real profiles — every component that shows social links pulls from here.
import { Github, Linkedin, Mail, Send } from "lucide-react";

export const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/merera-ta",
    icon: Github,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/merera-taddesa/",
    icon: Linkedin,
  },
  {
    id: "telegram",
    label: "Telegram",
    href: "https://t.me/maro_ta",
    icon: Send,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:mererataddesa1@gmail.com",
    icon: Mail,
  },
];
