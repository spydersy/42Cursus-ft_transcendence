import  React, {useCallback }  from 'react';
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export default function Background() {
    const particlesInit = useCallback(async (engine: Engine) => { 
        // console.log(engine);   
        await loadFull(engine);
       }, []);
    
       const particlesLoaded = useCallback(async (container: Container | undefined) => {
          // console.log(container);
        }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                    value: "#100f110",
                    },
                    opacity: 0.5,
                },
                fpsLimit: 150,
                interactivity: {
                    events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    resize: true,
                    },
                    modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 150,
                        duration: 0.6,
                    },
                    },
                },
                particles: {
                    color: {
                    value: "#1c73b4",
                    },
                    links: {
                    color: "#ffffff",
                    distance: 180,
                    enable: true,
                    opacity: 0.2,
                    width: 1.5,
                    },
                    collisions: {
                    enable: true,
                    },
                    move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: true,
                    speed: 3,
                    straight: true,
                    },
                    number: {
                    density: {
                        enable: true,
                        area: 1000,
                    },
                    value: 90,
                    },
                    opacity: {
                    value: 0.8,
                    },
                    shape: {
                    type: "polygon",
                    },
                    size: {
                    value: { min: 1, max: 6 },
                    },
                },
                detectRetina: true,
        }} />
    )
}