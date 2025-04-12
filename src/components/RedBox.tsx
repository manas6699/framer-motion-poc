import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion";


const RedBox = (props) => {

  const useIsLargeScreen = (minWidth = 768) => {
    const [isLarge, setIsLarge] = useState(() => window.innerWidth >= minWidth);

    useEffect(() => {
      const handleResize = () => setIsLarge(window.innerWidth >= minWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [minWidth]);

    return isLarge;
  };


  const isLargeScreen = useIsLargeScreen();

  return (
    <motion.div
      style={{
        backgroundColor: props.color,
        width: `${props.width}vw`,
        height: `${props.height}vh`,
        color: `${props.fontclr}`
      }}
      className="items-center shadow-lg text-white cursor-pointer"
      initial={false} 
      whileHover={
        isLargeScreen
          ? {
            scale: 1.05,
            background: `linear-gradient(135deg, ${props.color}, rgba(0,0,0,0.7))`,
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.35)",
            transition: {
              duration: 0.6,
              ease: [0.25, 1, 0.5, 1],
              type: "spring",
              stiffness: 120,
              damping: 8,
            },
          }
          : {}
      }
    >
      <div className="text-left">
        <h2 className="lg:p-6 p-2 font-extrabold lg:text-6xl">{props.heading}</h2>
        <p className='p-2'>{props.color}</p>
      </div>
    </motion.div>
  );
};


export default RedBox