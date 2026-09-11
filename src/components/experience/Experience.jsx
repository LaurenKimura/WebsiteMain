import { useRef } from "react";
import { motion, useInView } from "motion/react";
import "./experience.css";
import hyveLogo from "./hyve.svg";
import trackflyLogo from "./trackfly.svg";

const jobs = [
  {
    id: 1,
    company: "Hyve Solutions",
    role: "Software Engineer Intern",
    dates: "Jun 2026 – Aug 2026",
    logo: hyveLogo,
    logoAlt: "Hyve Solutions logo",
    logoClass: "expLogoHyve",
    description:
      "Built the AI test-coverage workflow (AnalAIze/GenerAIte/ValidAIte) and shipped RAG-grounded LLM features on a Flask + Neo4j + Azure OpenAI stack.",
    tags: ["Flask", "Neo4j", "Azure OpenAI", "LangChain"],
  },
  {
    id: 2,
    company: "TrackFly",
    role: "Software Engineer Intern",
    dates: "Sep 2025 – Dec 2025",
    logo: trackflyLogo,
    logoAlt: "TrackFly logo",
    logoClass: "expLogoTrackfly",
    description:
      "Shipped 15+ reusable React/TypeScript components from Figma in Next.js, with MySQL schemas and a Node.js email automation pipeline.",
    tags: ["React", "TypeScript", "Next.js", "MySQL", "Node.js"],
  },
];

const listVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants = {
  initial: {
    y: 36,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="experience" ref={ref}>
      <motion.div
        className="expHeaderBlock"
        initial={{ y: -40, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="expTitle">EXPERIENCE</h1>
        <p className="expSubtitle">
          <span className="expSubtitleMark" aria-hidden="true">
            ~
          </span>
          <span className="expSubtitleArrow" aria-hidden="true">
            →
          </span>
          my journey so far
        </p>
      </motion.div>

      <motion.div
        className="expList"
        variants={listVariants}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
      >
        {jobs.map((job) => (
          <motion.article className="expItem" variants={itemVariants} key={job.id}>
            <div className={`expLogo ${job.logoClass}`}>
              <img src={job.logo} alt={job.logoAlt} />
            </div>
            <div className="expBody">
              <div className="expHeading">
                <h2 className="expCompany">
                  {job.company}
                  <span className="expRole">{job.role}</span>
                </h2>
                <p className="expDates">{job.dates}</p>
              </div>
              <p className="expDesc">{job.description}</p>
              <ul className="expTags">
                {job.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
};

export default Experience;
