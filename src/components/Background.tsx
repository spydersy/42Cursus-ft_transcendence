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
                    opacity: 0.3,
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
                        distance: 200,
                        duration: 0.5,
                    },
                    },
                },
                particles: {
                    color: {
                    value: "#296390",
                    },
                    links: {
                    color: "#194b64",
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
                    speed: 2,
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
                    value: 0.5,
                    },
                    shape: {
                    type: "polygon",
                    },
                    size: {
                    value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
        }} />
    )
}