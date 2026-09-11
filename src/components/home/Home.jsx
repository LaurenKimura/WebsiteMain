import {Canvas} from "@react-three/fiber"
import "./home.css";
import Speech from "./Speech"
import {motion} from "motion/react"
import Shape from "./Shape";
import { Suspense, useEffect, useState } from "react";

const hobbies = [
    {
        id: "skateboard",
        icon: "/skateboard.png",
        label: "Skateboarding",
        video: "/skateboard.mp4",
    },
    {
        id: "basketball",
        icon: "/basketball.png",
        label: "Basketball",
        video: "/basketball.mp4",
    },
    {
        id: "guitar",
        icon: "/guitar.png",
        label: "Guitar",
        video: "/guitar.mp4",
    },
    {
        id: "juggling",
        icon: "/juggling.png",
        label: "Juggling",
        video: "/juggling.mp4",
    },
    {
        id: "rubix",
        icon: "/rubix.png",
        label: "Rubik's cube",
        video: "/rubix.mp4",
    },
    {
        id: "friends",
        icon: "/friends.png",
        label: "Friends",
        video: "/friends.mp4",
    },
];

const awardVariants = {
    initial: {
        x: -100,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.2,
        }
    },
        
};

const Home = () => {
    const [activeHobby, setActiveHobby] = useState(null);

    useEffect(() => {
        if (!activeHobby) return undefined;

        const onKeyDown = (event) => {
            if (event.key === "Escape") setActiveHobby(null);
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [activeHobby]);

    return ( <div className ="home">
        <div className="hSection left">
            {/*TITLE*/}
            <motion.h1 
                initial={{y:-100, opacity:0}}
                animate={{y:0, opacity:1}}
                className="hTitle">
                <span>I'm Lauren Kimura</span>
            </motion.h1>
            {/*Awards*/}
            <motion.div 
                variants={awardVariants} 
                initial="initial"
                animate="animate"
                className ="awards">
                <motion.h2 variants={awardVariants}>Computer Science Engineer</motion.h2>
                <motion.p variants={awardVariants}>Sophmore Student at Santa Clara University</motion.p>
                <motion.div variants={awardVariants} className="hobbyBlock">
                    <p className="hobbyLabel">BEYOND THE CODE:</p>
                    <div className="hobbyBox">
                    <div className="awardList"> 
                    {hobbies.map((hobby) => (
                        <motion.button
                            key={hobby.id}
                            type="button"
                            variants={awardVariants}
                            className="hobbyBtn"
                            onClick={() => hobby.video && setActiveHobby(hobby)}
                            aria-label={hobby.video ? `Play ${hobby.label} video` : hobby.label}
                            disabled={!hobby.video}
                        >
                            <img src={hobby.icon} alt="" />
                        </motion.button>
                    ))}
                    </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>

        <div className="hSection right">
            {/* BUBBLE */}
            <Speech/>
            
            {/*CONTACT BUTTON*/}
            <a href="/#contact" className="contactLink">
                <div className="contactButton">
                    <svg viewBox="0 0 200 200" width="150" height="150">
                        <circle cx="100" cy="100" r="90" fill="#C1ADA0"/>
                        <path
                            id="innerCirclePath"
                            fill="none"
                            d="M 100,100 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                        />

                        <text className ="circleText">
                            <textPath href="#innerCirclePath">Hire Now</textPath> {/*Replace with maybe mos trecent project working on*/}
                        </text>

                        <text className ="circleText">
                            <textPath href="#innerCirclePath" startOffset="44%">Contact Me</textPath> {/*Replace with maybe mos trecent project working on*/}
                        </text>
                    </svg>
                    <div className="arrow">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="50"
                            height="50"
                            fill="none"
                            stroke="#393736"
                            strokeWidth="2"
                        >
                        <line x1="6" y1="18" x2="18" y2="6" />
                        <polyline points="9 6 18 6 18 15" />
                        </svg>
                    </div>
                </div>
                 
            </a>
        </div>
        <div className="bg">
            {/*3D image*/}
            <Canvas dpr={[1, 1.5]}>
                <Suspense fallback="loading...">
                    <Shape />
                </Suspense>
            </Canvas>
            <div className="hImg">
                <img src="/face.png" alt=""/>
            </div>
        </div>
        {activeHobby?.video && (
            <div
                className="hobbyModal"
                onClick={() => setActiveHobby(null)}
                role="dialog"
                aria-modal="true"
                aria-label={activeHobby.label}
            >
                <div className="hobbyModalCard" onClick={(event) => event.stopPropagation()}>
                    <button
                        type="button"
                        className="hobbyModalClose"
                        onClick={() => setActiveHobby(null)}
                        aria-label="Close video"
                    >
                        ×
                    </button>
                    <video
                        key={activeHobby.video}
                        src={activeHobby.video}
                        className="hobbyModalVideo"
                        autoPlay
                        muted
                        controls
                        playsInline
                    />
                    <p className="hobbyModalLabel">{activeHobby.label}</p>
                </div>
            </div>
        )}
    </div>
    )
}

export default Home 