import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import "./contact.css";

const EMAIL = "Laurenkimura23@gmail.com";
const MAILTO = `mailto:${EMAIL}`;

const FLAP_CLOSED = "M6 12 L32 28 L58 12";
const FLAP_OPEN = "M6 12 L32 1 L58 12";

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lnk2029/",
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/LaurenKimura",
    external: true,
  },
  {
    label: "Resume",
    href: "/resume.pdf",
    external: true,
  },
];

const Envelope = ({ open }) => {
  return (
    <svg
      className="envelope"
      viewBox="0 0 64 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        className="envelopeBody"
        x="4"
        y="10"
        width="56"
        height="26"
        rx="3.5"
        strokeWidth="2"
      />
      <motion.path
        className="envelopeFlap"
        d={open ? FLAP_OPEN : FLAP_CLOSED}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ d: open ? FLAP_OPEN : FLAP_CLOSED }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      />
    </svg>
  );
};

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  return (
    <div className="contact" ref={ref}>
      <motion.div
        className="contactInner"
        initial={{ y: 28, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 28, opacity: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <a
          href={MAILTO}
          className="envelopeLink"
          aria-label={`Email ${EMAIL}`}
          onMouseEnter={() => setEnvelopeOpen(true)}
          onMouseLeave={() => setEnvelopeOpen(false)}
          onFocus={() => setEnvelopeOpen(true)}
          onBlur={() => setEnvelopeOpen(false)}
        >
          <Envelope open={envelopeOpen} />
        </a>

        <h1 className="contactTitle">Let’s talk.</h1>
        <p className="contactBio">
          Sophomore in Computer Science at Santa Clara University, open to
          internships and new opportunities.
        </p>

        <a className="contactEmail" href={MAILTO}>
          {EMAIL.toLowerCase()}
        </a>

        <nav className="contactLinks" aria-label="Contact links">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
            >
              {link.label}
              <span className="contactLinkArrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </nav>
      </motion.div>
    </div>
  );
};

export default Contact;
