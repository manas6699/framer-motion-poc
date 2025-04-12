import React, { useState } from 'react'

import {
    // eslint-disable-next-line no-unused-vars
    motion,
    useScroll,
    useTransform,
    useMotionValueEvent
} from "framer-motion";


const SECTION_HEIGHT = 1200

export default function AnimatedBox () {

    const { scrollY } = useScroll()

    // const opacity = useTransform(scrollY , [SECTION_HEIGHT , SECTION_HEIGHT + 500] , [1 , 0]);

    const backgroundSize = useTransform(scrollY, [0, SECTION_HEIGHT + 500], ["150%", "100%"]);


    const scale = useTransform(scrollY, [0, 1500], [.5, .2]);

    // Text color animation - changes from one color to another
    const textColor = useTransform(
        scrollY,
        [0, 1500],
        ['#6c42f5', '#ffffff']
    );

    // For changing text content, we need to use a different approach
    // since we can't directly interpolate strings with useTransform
    const [currentText, setCurrentText] = useState("At Dropbox, we are building the future of work.");

    const textProgress = useTransform(scrollY, [0, 1500], [0, 2]);

    const textY = useTransform(scrollY, [0, 1500], ["0%", "200%"]);

    const backgroundColor = useTransform(scrollY, [0, 1500], ['#ffffff', '#6c42f5'])

    const borderColor = useTransform(scrollY, [0, 1500], ['#6c42f5', '#6c42f5'])
    const borderWidth = useTransform(scrollY, [0, 1500], ['2px', '0px'])

    // Function to determine which text to display based on scroll progress
    useMotionValueEvent(textProgress, "change", (latest) => {
        if (latest < 0.5) {
            setCurrentText("At Dropbox, we are building the future of work.");
        } else {
            setCurrentText("We are building the future of work.");
        }
    });
    return (
        <>

            <motion.div className='sticky z-50 h-screen w-screen aspect-square top-0 justify-center items-center'
                style={{
                    backgroundSize,
                    scale,
                    backgroundColor,
                    borderColor,
                    borderWidth
                }}
            >
                <motion.p
                    className="p-6 font-extrabold text-4xl lg:text-8xl w-3/4"
                    style={{ color: textColor, translateY: textY }}
                >
                    {currentText}
                </motion.p>

            </motion.div>
        </>
    )
}
