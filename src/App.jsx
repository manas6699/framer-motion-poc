import React, { useRef , useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { useScroll, useTransform, motion } from 'framer-motion';

import Lenis from '@studio-freight/lenis'

import RedBox from './components/RedBox';
import AnimatedBox from './other/AnimatedBox';

export default function App() {


   useEffect( () => {
        const lenis = new Lenis()
       
        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    },[])


  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [4, 1]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [5, 1]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [6, 1]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [8, 1]);

  const boxes = [
    { color: '#8911ff', width: 35, height: 30, scale: scale4 , heading: 'Box'},
    { color: '#ff8c19', width: 20, height: 45, scale: scale6 , heading: 'Box'},
    { color: '#FF13F0', width: 25, height: 25, scale: scale5 , heading: 'Box'},
    { color: '#283750', width: 20, height: 25, scale: scale8 , heading: 'Box'},
    { color: '#892055', width: 30, height: 25, scale: scale6 , heading: 'Box'},
    { color: '#fa551e', width: 30, height: 25, scale: scale8 , heading: 'Hovered Box'},
  ];

  return (
    <div 
      ref={container} 
      className="container bg-black"
      style={{
        backgroundImage: `
          linear-gradient(to right, white 1px, transparent 1px),
          linear-gradient(to bottom, white 1px, transparent 1px)
        `,
        backgroundSize: '200px 200px', // adjust for spacing
        backgroundRepeat: 'repeat',
      }}
    >
            <div className="sticky">
                <AnimatedBox/>
                {
                    boxes.map(({color , width, height , scale , heading} , index) => {
                      return <motion.div key={index} style={{scale}} className='el'>
                       <motion.div className="imageContainer">
                        <RedBox
                        color={color}
                        width={width}
                        height={height}
                        heading={heading}
                      />
                       </motion.div>
                      </motion.div>
                    })
                }
            </div>
        </div>
  );
}
