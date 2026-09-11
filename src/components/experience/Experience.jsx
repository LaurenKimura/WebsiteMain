import { useRef } from "react";
import { motion, useInView, useScroll } from "motion/react";
import "./experience.css";

const jobs = [
  {
    id: 1,
    company: "Association for Computing Machinery",
    role: "Workshop Coordinator",
    dates: "Jun 2026 – Aug 2026",
    logo: "/acm.png",
    logoAlt: "ACM logo",
    logoClass: "expLogoHyve",
    description:
      "Built the AI test-coverage workflow (AnalAIze/GenerAIte/ValidAIte) and shipped RAG-grounded LLM features on a Flask + Neo4j + Azure OpenAI stack.",
    tags: ["Flask", "Neo4j", "Azure OpenAI", "LangChain"],
  },
  {
    id: 2,
    company: "Association for Computing Machinery",
    role: "Marketing Coordinator",
    dates: "Sep 2025 – Dec 2025",
    logo: "/acm.png",
    logoAlt: "ACM logo",
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

const JobItem = ({ job }) => {
  const itemRef = useRef(null);
  const isActive = useInView(itemRef, {
    margin: "-35% 0px -35% 0px",
  });

  return (
    <motion.article
      className={`expItem${isActive ? " isActive" : ""}`}
      variants={itemVariants}
      ref={itemRef}
    >
      <span className={`expDot${isActive ? " isActive" : ""}`} aria-hidden="true" />
      <div className={`expLogo ${job.logoClass}`}>
        <img src={job.logo} alt={job.logoAlt} />
      </div>
      <div className="expBody">
        <div className="expHeading">
          <div className="expTitleBlock">
            <h2 className="expCompany">{job.company}</h2>
            <p className="expRole">{job.role}</p>
          </div>
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
  );
};

const Experience = () => {
  const ref = useRef(null);
  const listRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 40%"],
  });

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
        ref={listRef}
        variants={listVariants}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
      >
        <div className="expTimeline" aria-hidden="true">
          <div className="expTimelineTrack" />
          <motion.div className="expTimelineFill" style={{ scaleY: scrollYProgress }} />
        </div>
        {jobs.map((job) => (
          <JobItem job={job} key={job.id} />
        ))}
      </motion.div>
    </div>
  );
};

export default Experience;
