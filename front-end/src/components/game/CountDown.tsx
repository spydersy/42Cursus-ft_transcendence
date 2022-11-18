// @ts-nocheck

import React from 'react'
// import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import useCountdown from "@bradgarropy/use-countdown"
// import Confetti from "react-confetti";
interface countDownProps {start: boolean , setstart : (e : boolean)=>void, show: boolean , setshow : (e : boolean)=>void , onComplete : (e : any)=>void }

const CountDownContainer = styled(motion.div)`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: "Poppins" , sans-serif;
    font-size: 100px;
    color :  ${props => props.theme.colors.primaryText};
    `;
export default function CountDown(props : countDownProps) {
    // const [complete, setComplete] = useState(false);
    
    const countdown = useCountdown({
        seconds: 3,
        onCompleted: () => {
            props.onComplete()
            // setComplete(true)
            // props.setshow(false)
            // props.setstart(true)
        },
    })

    return (
            <CountDownContainer>
                <AnimatePresence>
                    <motion.h1
                        key={countdown.seconds}
                        exit={{ y: 75, opacity: 0, position: "absolute" }}
                        initial={{ y: -150, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            ease: "easeOut",
                            duration: 1,
                        }}
                    >
                        {countdown.seconds}
                    </motion.h1>
                </AnimatePresence>
             </CountDownContainer>
    )
}
