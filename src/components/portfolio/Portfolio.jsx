import React, { useRef, useState, useEffect} from "react";
import "./portfolio.css";
import { motion, useScroll, useTransform } from "framer-motion";

const items = [
  {
    id: 1,
    img: "/p1.jpg",
    title: "Open Door",
    desc: "Created a full stack web page using AWS services to solve the problem of homelessness and low-income in SF. This was achieved through API datasets which provided information regarding available rent space that fit a client\’s needs. Coded during the AWS x INRIX Hackathon.",
    link: "/",
  },
  {
    id: 2,
    img: "/p2.jpg",
    title: "MindGarden",
    desc: "Won the 2026 Hack For Humanity \“Top Game In the Hackathon\” According to the American College Health Association (ACHA), over 60% report overwhelming anxiety in the past year, making anxiety the #1 mental health concern among college students. Our goal was to treat time management not as a chore, but as a rewarding journey where every minute spent in deep work contributes to a tangible, visual representation of personal growth. We introduce to you the website that every college student needs to calm their anxiety, take charge of their life, and actually focus on the tasks that need to be done: Mind Garden. MindGarden allows students to track how long they study, giving custom-designed garden incentives such as flowers, bushes, and even animals as prizes. We created a to-do list alongside the timer so that the student would be able to allocate time to specific tasks. After the timer starts, classical music plays in the background to calm the mind and create an atmosphere that is optimal for studying. Additionally, we integrated a Firebase backend to save points for every study session to buy features for growing the user's garden. We used Node and Vite to run our apps, and we coded in React, JSX, and Tailwind CSS. For the backend we used Firebase for authentication and data storage.",
    link: "/",
  },
  {
    id: 3,
    img: "/p3.jpg",
    title: "Gravitree",
    desc: "Purpose: There is a rising issue affecting both youth and the elderly: loneliness. In the past, screens promised connection but, in reality left us isolated. Swiping through idealized relationships leaves us returning to empty rooms, a trend with severe health consequences. Loneliness raises elders\' risk of dementia by 50% (\“Elderly Loneliness Statistics,\” Consumer Affairs) and increases early death risk by up to 30% (U.S. Surgeon General\'s Advisory, 2023). I however believe that technology can be repurposed to point us back toward real-world bonding. With my app, Gravitree, young people are able to connect with local elders to build meaningful, in-person relationships. Volunteers provide yard work, tech support, errands, or simple conversation, gaining mentorship and intergenerational wisdom in return. On the other hand, elders receive essential help and regain a sense of matter—rebuilding community trust and bridging the generational divide. Technical Architecture: Frontend Stack: React 19 (with React Router and qrcode.react), Vite, CSS. Backend & Cloud Infrastructure: AWS Amplify Gen 2 for Cognito (access rules, user auth), AppSync, and DynamoDB, configured via typescript",
    link: "/",
  },
  {
    id: 4,
    img: "/p4.jpg",
    title: "Social Media Project",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure laboriosam tempore consectetur, atque maiores culpa quia, repellat id, dicta esse fugit neque voluptatem provident itaque voluptates minima. Repudiandae, provident hic.",
    link: "/",
  },
  {
    id: 5,
    img: "/p5.jpg",
    title: "Animated Portfolio Website",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure laboriosam tempore consectetur, atque maiores culpa quia, repellat id, dicta esse fugit neque voluptatem provident itaque voluptates minima. Repudiandae, provident hic.",
    link: "/",
  },
];

const ListItem = ({item})=> {
    return (
        <div className="pItem">
            <div className="pImg">
                <img src={item.img} alt="" />
            </div>
            <div className = "pText">
                <h1>{item.title}</h1>
                <p>{item.desc}</p>
                <a href={item.link}>
                    <button>View Project</button>
                </a>
            </div>

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
                    backgroundColor: "pink",
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
            <section/>
        </div>
    )
}

export default Portfolio 