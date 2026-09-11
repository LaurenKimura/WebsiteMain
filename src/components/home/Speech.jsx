
import { TypeAnimation } from 'react-type-animation';
import {motion} from "motion/react"

{/*Text bubble*/}
const Speech = () => {
    return (
        <motion.div 
            className='bubbleContainer' 
            animate={{opacity:[0,1]}}
            transition={{duration: 1}}>
            <div className="bubble">
                <TypeAnimation
                    sequence={[
                        1000,
                        'Swipe up/down for navigation',
                        1000,
                    ]}
                    wrapper="span"
                    speed={40}
                    deletionSpeed={60}
                    repeat={Infinity}
                />
            </div>
        </motion.div>
    )
}

export default Speech;