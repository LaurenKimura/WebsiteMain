import "./hero.css";
import Speech from "./Speech"
import { motion, useMotionValue, useTransform } from "framer-motion";

const Hero = () => {
    /*THIS MAKES FACE PHOTO MOVE*/
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [15, -15]);
    const rotateY = useTransform(x, [-100, 100], [-15, 15]);

    function handleMouseMove(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;
        x.set(offsetX);
        y.set(offsetY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }


    return ( <div className ="hero">
        <div className="hSection left">
            {/*TITLE*/}
            <h1 className="hTitle">
                <span>I'm Lauren Kimura</span>
            </h1>
            {/*TITLE*/}
            <div className ="awards">
                <h2>Computer Science Engineer</h2>
                <p>Sophmore Student at Santa Clara University</p>
                <div className="awardList"> 
                    <img src = "/skateboard.png" alt=""/>
                    <img src = "/basketball.png" alt=""/>
                    <img src = "/running.png" alt=""/>
                    <img src = "/guitar.png" alt=""/>
                </div>
            </div>
            {/*SCROLL SVG (google it, copied and pasted)*/}
            <a href ="#service">
                <svg
                    width="50px"
                    height="50px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9Z"
                        stroke="white"
                        strokeWidth="1"
                    />

                    <path
                        d="M12 5V8"
                        stroke="white"
                        strokeWidth="1"
                        strokeLinecap="round"
                    />
                </svg>
            </a>
        </div>

        <div className="hSection right">
            {/*FOLLOW*/}
            <div className= "follow">
                <a href="/" className="socialLink" data-tooltip="GitHub">
                    <img src="/github.png" alt=""/>
                </a>
                <a href="https://www.linkedin.com/in/lnk2029/" className="socialLink" data-tooltip="LinkedIn">
                    <img src="/linkedin.png" alt=""/>
                </a>
                <a href="/" className="socialLink" data-tooltip="Resume">
                    <img src="/resume.png" alt=""/>
                </a>
                <div className= "followTextContainer">
                    <div className= "followText"> FOLLOW ME
                    </div>
                </div>
            </div>
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
                            stroke="black"
                            strokeWidth="2"
                        >
                        <line x1="6" y1="18" x2="18" y2="6" />
                        <polyline points="9 6 18 6 18 15" />
                        </svg>
                    </div>
                </div>
                 
            </a>
        </div>

        {/*FACE PHOTO*/} 
        <div className="bg">
            {/*3D image*/}
            <motion.div
                className="hImg"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformPerspective: 800,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
                <img src="/face.png" alt="" />
            </motion.div>
        </div>
    </div>
    )
}

export default Hero 