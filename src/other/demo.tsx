import React , {useState} from 'react'

import {
    // eslint-disable-next-line no-unused-vars
    motion,
    useScroll,
    useTransform,
    useMotionValueEvent 
} from "framer-motion";

const App = () => {
  return (
    <div>
      <div>
        <Hero/>
      </div>
    </div>
  )
}


const SECTION_HEIGHT = 1500

const Hero = () => {
  return (
    <>
    <div className="relative w-full bg-black flex justify-center"
    style={{
      height: `calc(${SECTION_HEIGHT}px + 100vh)`,
    }}
    >
      <CenterImage/>
    </div>
    
    </>
  )
}


const CenterImage = () => {

  const { scrollY } = useScroll()

  // const opacity = useTransform(scrollY , [SECTION_HEIGHT , SECTION_HEIGHT + 500] , [1 , 0]);

  const backgroundSize = useTransform(scrollY , [0 , SECTION_HEIGHT + 500] ,["170%" , "100%"]);

  
  const scale = useTransform(scrollY , [0, 1500] , [.8 , .2]);

   // Text color animation - changes from one color to another
  const textColor = useTransform(
    scrollY,
    [0, 1500],
    ['#ffffff' , '#000000']
  );
  
  // For changing text content, we need to use a different approach
  // since we can't directly interpolate strings with useTransform
   const [currentText, setCurrentText] = useState("This is the first text");

   const textProgress = useTransform(scrollY, [0,  1500], [0,  2]);

   const textY = useTransform(scrollY, [0, 1500], ["0%", "500%"]);

   const backgroundColor = useTransform(scrollY, [0 , 1500] , ['#0000FF', '#ffffff'])
  
  // Function to determine which text to display based on scroll progress
  useMotionValueEvent(textProgress, "change", (latest) => {
    if (latest < 0.5) {
      setCurrentText("This is the first text");
    } else {
      setCurrentText("This is the final text");
    }
  });
  return (
    <>
    
    <motion.div className='sticky top-0 h-screen aspect-square justify-center items-center'
     style ={{
       backgroundSize,
      scale,
      backgroundColor
     }}
     >
      <motion.p 
        className="p-6 font-extrabold text-6xl"
        style={{ color: textColor,  translateY: textY }}
      >
       {currentText}
      </motion.p>
     
    </motion.div>
    </>     
  )
}



export default App