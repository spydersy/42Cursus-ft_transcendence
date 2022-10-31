import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Flame1 ,{Flame2, Flame3} from "./flame";
// import { AnimateKeyframes } from "react-simple-animate";

// import "./styles.css";

const Section = styled.div`
  & > svg {
    position: absolute;
    left: 0;
    bottom: 0;
  }
`;

export default function SICIRITY() {
  return (
    <Sicirity>
        <Section className="App">
        {/* <AnimateKeyframes
            play
            iterationCount="infinite"
            direction="alternate"
            easeType="ease-in"
            duration={5}
            keyframes={[
            { 0: "transform-origin: 0 100%; opacity: 0.3" },
            {
                50: "transform-origin: 0 100%; transform: scaleY(0.7) skew(-10deg)"
            },
            { 100: "transform-origin: 0 100%; opacity: 1 skew(10deg)" }
            ]}
            render={({ style }) => {
            return <Flame1 style={style} />;
            }}
        />

        <AnimateKeyframes
            play
            iterationCount="infinite"
            direction="alternate"
            easeType="ease-in"
            duration={6}
            keyframes={[
            { 0: "transform-origin: 0 100%; opacity: 0.5" }, // 0%
            {
                50: "transform-origin: 0 100%; transform: scaleY(0.7) skew(20deg)"
            }, // 50%
            { 100: "transform-origin: 0 100%; opacity: 1 skew(-20deg)" } // 100%
            ]}
            render={({ style }) => {
            return <Flame3 style={style} />;
            }}
        />

        <AnimateKeyframes
            play
            easeType="ease-in"
            iterationCount="infinite"
            direction="alternate"
            duration={5}
            keyframes={[
            { 0: "transform-origin: 0 100%; opacity: 0.8" }, // 0%
            {
                50: "transform-origin: 0 100%; transform: scaleY(0.7) skew(10deg)"
            }, // 50%
            { 100: "transform-origin: 0 100%; opacity: 1" } // 100%
            ]}
            render={({ style }) => {
            return <Flame2 style={style} />;
            }}
        /> */}
        </Section>
     </Sicirity> 
  );
}

const Sicirity = styled.div`
position: absolute;
background: purple;
background-color: aqua;
width: 100%;
font-family: sans-serif;
display: flex;
bottom: 0px;

`;
