import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import "./navbar.css";

const links = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const sectionOrder = ["home", "experience", "projects", "contact"];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/LaurenKimura",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.56 1.42.21 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"
        />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lnk2029/",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.5h4.56V23H.22V8.5zM8.34 8.5h4.37v1.98h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v7.9h-4.56v-7c0-1.67-.03-3.81-2.32-3.81-2.32 0-2.68 1.81-2.68 3.69V23H8.34V8.5z"
        />
      </svg>
    ),
  },
  {
    label: "Resume",
    href: "/resume.pdf",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7 3.8h7.2L19 8.5V20.2a1.7 1.7 0 0 1-1.7 1.7H7A1.7 1.7 0 0 1 5.3 20.2V5.5A1.7 1.7 0 0 1 7 3.8z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path d="M14 3.8V8.4h5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8.3 12.4h7.4M8.3 15.6h7.4M8.3 18.7h4.4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
];

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [socialsOpen, setSocialsOpen] = useState(false);
  const socialWrapRef = useRef(null);

  useEffect(() => {
    const updateActive = () => {
      const marker = 140;
      let current = sectionOrder[0];

      for (const id of sectionOrder) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= marker) current = id;
      }

      setActive(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSocialsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!socialsOpen) return undefined;

    const onPointerDown = (event) => {
      if (!socialWrapRef.current?.contains(event.target)) {
        setSocialsOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [socialsOpen]);

  const handleNavClick = (id) => {
    setActive(id);
  };

  return (
    <motion.header
      className="siteNav"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <nav className="navPill" aria-label="Primary">
        <div id="primary-nav-links" className="navLinks">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={active === link.id ? "isActive" : undefined}
              aria-current={active === link.id ? "page" : undefined}
              onClick={() => handleNavClick(link.id)}
            >
              {link.label}
            </a>
          ))}

          <div className="navSocialWrap" ref={socialWrapRef}>
            <button
              type="button"
              className={`navSocialToggle${socialsOpen ? " isOpen" : ""}`}
              aria-expanded={socialsOpen}
              aria-controls="follow-panel"
              onClick={() => setSocialsOpen((open) => !open)}
            >
              <span className="srOnly">{socialsOpen ? "Close socials" : "Open socials"}</span>
              <span className="navSocialBar" />
              <span className="navSocialBar" />
              <span className="navSocialBar" />
            </button>

            <AnimatePresence>
              {socialsOpen && (
                <motion.div
                  id="follow-panel"
                  className="navFollowPanel"
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className="navFollowIcons">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className="navFollowLink"
                        aria-label={social.label}
                        data-tooltip={social.label}
                        {...(social.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
