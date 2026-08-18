import React, { useRef, useState, useEffect} from "react";
import "./portfolio.css";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const items = [
  {
    id: 1,
    img: "/p1.jpg",
    title: "Open Door",
    desc: "Full-stack web app addressing homelessness and low-income housing in SF, using AWS services and API datasets to match clients with available rent space. Built during the AWS x INRIX Hackathon.",
    link: "https://devpost.com/software/opendoor-obf9m7",
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
    const [containerDistance, setContainerDistance] = useState(0);
    const ref = useRef(null);

    useEffect(()=> {
        if(ref.current){
            const rect= ref.current.getBoundingClientRect();
            setContainerDistance(rect.left);
        }
    }, []);

    const {scrollYProgress} = useScroll({target:ref});

    const xTranslate = useTransform(
        scrollYProgress, 
        [0,1], 
        [0,-(window.innerWidth * items.length)])

    return (
        <div className = "portfolio" ref={ref}>
            <motion.div className="pList" style={{ x: xTranslate}}>
                <div 
                className= "empty"
                style={{
                    width: window.innerWidth - containerDistance, 
                    backgroundColor: "#e1dbd8",
                }}
                />
                {items.map(item=>(
                    <ListItem item ={item} key={item.id}/>
                ))}
            </motion.div>
            <section/>
            <section/>
            <section/>
            <section/>
            {/* <section/>
            <section/> 
            IF I ADD EXTRA PROJECTS UNSLASH THESE
            */}
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
        </div>
    )
}

export default Portfolio 