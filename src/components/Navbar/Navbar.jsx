import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrolled } from "../../hooks/useScrollPosition.js";
import { useActiveSection } from "../../hooks/useActiveSection.js";
import { useTheme } from "../../hooks/useTheme.js";
import ThemeToggle from "../ui/ThemeToggle.jsx";
import { cn } from "../../utils/cn.js";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

function NavPath({ id, label, active, onClick }) {
  return (
    <a
      href={`#${id}`}
      onClick={onClick}
      className={cn(
        "font-mono text-sm font-bold transition-colors duration-200",
        active ? "text-accent" : "text-ink/70 hover:text-accent",
      )}
    >
      {label}
    </a>
  );
}

function Navbar() {
  const scrolled = useScrolled(24);
  const activeId = useActiveSection(NAV_LINKS.map((l) => l.id));
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4">
      <motion.div
        animate={{
          marginTop: scrolled ? 12 : 20,
          paddingTop: scrolled ? 10 : 14,
          paddingBottom: scrolled ? 10 : 14,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn(
          "w-full max-w-content rounded-2xl px-5 transition-colors duration-300",
          scrolled
            ? "glass border border-border-strong shadow-lg shadow-black/20"
            : "bg-transparent border border-transparent",
        )}
      >
        <nav className="flex items-center justify-between" aria-label="Primary">
          {/* Logo */}
          <a
            href="#home"
            className="group inline-flex items-center font-mono font-extrabold text-2xl tracking-[-0.08em] transition-transform duration-200 hover:scale-105"
          >
            <span className="text-accent">&lt;MT/&gt;</span>
            <span className="ml-1 h-1.5 w-1.5 rounded-full bg-accent opacity-80 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavPath key={link.id} {...link} active={activeId === link.id} />
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />

            <a
              href="#contact"
              className="font-mono text-sm font-semibold rounded-lg border border-accent text-accent px-4 py-2 hover:bg-accent hover:text-bg transition-colors duration-200"
            >
              let&rsquo;s talk
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
              }}
              className="md:hidden overflow-hidden border-t border-border mt-4"
            >
              <div className="py-6 flex flex-col gap-5">
                {NAV_LINKS.map((link) => (
                  <NavPath
                    key={link.id}
                    {...link}
                    active={activeId === link.id}
                    onClick={closeMobile}
                  />
                ))}

                <a
                  href="#contact"
                  onClick={closeMobile}
                  className="font-mono text-sm font-semibold rounded-lg border border-accent text-accent px-4 py-2 text-center hover:bg-accent hover:text-bg transition-colors duration-200"
                >
                  let&rsquo;s talk
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}

export default Navbar;
