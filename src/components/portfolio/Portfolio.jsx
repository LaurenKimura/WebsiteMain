import React, { useRef } from "react";
import "./portfolio.css";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const items = [
  {
    id: 1,
    img: "/p1.jpg",
    title: "CardBot",
    desc: "There's always something to celebrate, but not everyone has time to make a sentimental card. CardBot solves this for both businesses producing cards at scale and individuals who want something personal, fast. It uses 3 omni wheels for movement, an Arduino Uno with an Adafruit Motor Shield (I2C) for motor control, quadrature Hall encoders for odometry, and a servo for pen lift/lower.",

    link: "https://www.linkedin.com/posts/lnk2029_as-we-wrap-up-this-winter-quarter-my-engineering-activity-7439948884296085504-vi-B?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFwrXqABr19aCgJmsYczhFj6UbpOMgchcmw",
  },
  {
    id: 2,
    img: "/p2.jpg",
    title: "MindGarden",
    desc: "Won\"Top Game\" at 2026 Hack For Humanity. A study timer that grows a garden as you focus, with a built-in to-do list and calming music. Built with React, Vite, and Tailwind CSS; Firebase for auth and data storage.",
    link: "https://devpost.com/software/mindgarden-l7d2ac",
  },
  {
    id: 3,
    img: "/p3.jpg",
    title: "Gravitree",
    desc: "An app connecting young volunteers with local elders for yard work, tech support, errands, or companionship—reducing elder loneliness while volunteers gain mentorship. Built with React 19, React Router, and Vite; AWS Amplify Gen 2 (Cognito, AppSync, DynamoDB) on the backend.",
    link: "https://main.d1az53v7gjfgbw.amplifyapp.com",
  },
//   {
//     id: 4,
//     img: "/p4.jpg",
//     title: "Social Media Project",
//     desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure laboriosam tempore consectetur, atque maiores culpa quia, repellat id, dicta esse fugit neque voluptatem provident itaque voluptates minima. Repudiandae, provident hic.",
//     link: "https://devpost.com/software/opendoor-obf9m7",
//   },
//   {
//     id: 5,
//     img: "/p5.jpg",
//     title: "Animated Portfolio Website",
//     desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure laboriosam tempore consectetur, atque maiores culpa quia, repellat id, dicta esse fugit neque voluptatem provident itaque voluptates minima. Repudiandae, provident hic.",
//     link: "/",
//   },
];

const imgVariants = {
  initial: {
    x: -500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  initial: {
    x: 500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.05,
    },
  },
};

const ListItem = ({item})=> {
    const ref = useRef();

    const isInView = useInView(ref,{ margin: "-100px"});

    return (
        <div className="pItem" ref={ref}>
            <motion.div 
                variants={imgVariants} 
                animate = {isInView ? "animate" : "initial"} 
                className="pImg"
            >
            <img src={item.img} alt="" />
            </motion.div>
            <motion.div 
                variants={textVariants} 
                animate = {isInView ? "animate" : "initial"} 
                className = "pText"
            >
                <motion.h1 variants={textVariants} >{item.title}</motion.h1>
                <motion.p variants={textVariants} >{item.desc}</motion.p>
                <motion.a variants={textVariants}  href={item.link}>
                    <button>View Project</button>
                </motion.a>
            </motion.div>

        </div>
    )
}

const Portfolio = () => {
    const ref = useRef(null);

    const {scrollYProgress} = useScroll({target:ref});
    const {scrollYProgress: leaveProgress} = useScroll({
        target: ref,
        offset: ["end end", "end start"],
    });

    const xTranslate = useTransform(
        scrollYProgress, 
        [0,1], 
        [0,-(window.innerWidth * (items.length - 1))])

    const overlayOpacity = useTransform(leaveProgress, [0, 0.15], [1, 0]);

    return (
        <div className = "portfolio" ref={ref} style={{ height: `${items.length * 100}vh` }}>
            <motion.div className="pViewport" style={{ opacity: overlayOpacity }}>
                <motion.div className="pList" style={{ x: xTranslate}}>
                    {items.map(item=>(
                        <ListItem item ={item} key={item.id}/>
                    ))}
                </motion.div>
                <div className="pProgress">
                    <svg width="100%" height="100%" viewBox="0 0 160 160">
                        <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="#c5b1a4"
                        strokeWidth={20}
                        />
                        <motion.circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="#785A47"
                        strokeWidth={20}
                        style={{ pathLength: scrollYProgress }}
                        transform="rotate(-90 80 80)"
                        />
                    </svg>
                </div>
            </motion.div>
            {items.map((item) => (
                <section key={`snap-${item.id}`} />
            ))}
        </div>
    )
}

export default Portfolio 