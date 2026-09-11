import { useRef } from "react";
import { motion, useInView, useScroll } from "motion/react";
import "./experience.css";

const jobs = [
  {
    id: 1,
    company: "Association for Computing Machinery",
    role: "Workshop Coordinator",
    dates: "Aug 2026 - Present",
    logo: "/acm.png",
    logoAlt: "ACM logo",
    description:
      " - Planned and organized 26 technical workshops with attendence around 25 people per meeting (650 total attendence). \n -Prepare workshop materials (slides, code, demos) and coordinate presenters or TAs",
    technical: ["APIs", "Databases + SQL", "AWS", "Git/Github", "ML/AI", "React.js + React", "Native", "Firebase/Firestore", "Flutter/Mobile app dev", "Unity"],
    soft: ["Event Planning", "Mentorship", "Public Speaking", "Coordination", "Leadership"],
  },
  {
    id: 2,
    company: "Association for Computing Machinery",
    role: "Marketing Coordinator",
    dates: "Apr 2026 - Present",
    logo: "/acm.png",
    logoAlt: "ACM logo",
    description:
      "- Transformed ACM Instagram (@scu_acm) brand to a more professional appeal, boosting engagement from 20k to 50k average views per month. \n - Directed promotional campaigns for AWS x INTRIX and Hack for Humanity hackathons, driving consistent student turnout through strategic visual design.",
    technical: ["Canva", "Adobe", "LinkedIn", "CapCut"],
    soft: ["Leadership", "Campaign Direction/Partnerships", "Brand Growth/Strategy", "Communication", "Management"],
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
      <div className="expLogo">
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
        <div className="expTagGroups">
          {job.technical?.length > 0 && (
            <div className="expTagGroup">
              <h3 className="expTagLabel">Technical</h3>
              <ul className="expTags">
                {job.technical.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          )}
          {job.soft?.length > 0 && (
            <div className="expTagGroup">
              <h3 className="expTagLabel">Soft Skills</h3>
              <ul className="expTags">
                {job.soft.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
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
