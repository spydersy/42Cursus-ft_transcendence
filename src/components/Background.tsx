import  React, {useCallback }  from 'react';
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import styled , {keyframes , css} from "styled-components"


export default function Background() {
    const particlesInit = useCallback(async (engine: Engine) => { 
        // console.log(engine);   
        await loadFull(engine);
       }, []);
    
       const particlesLoaded = useCallback(async (container: Container | undefined) => {
          // console.log(container);
        }, []);

    return (
            <BackgroundStyle>

                <div className='body'>
                <div className='box'>
                    <div className='wave -one'></div>
                    <div className='wave -two'></div>
                    <div className='wave -three'></div>
                </div>
                </div>
            </BackgroundStyle>
        
        // <Particles
        //     id="tsparticles"
        //     init={particlesInit}
        //     loaded={particlesLoaded}
        //     options={{
        //         background: {
        //             color: {
        //             value: "#100f110",
        //             },
        //             opacity: 0.5,
        //         },
        //         fpsLimit: 150,
        //         interactivity: {
        //             events: {
        //             onClick: {
        //                 enable: true,
        //                 mode: "push",
        //             },
        //             onHover: {
        //                 enable: true,
        //                 mode: "repulse",
        //             },
        //             resize: true,
        //             },
        //             modes: {
        //             push: {
        //                 quantity: 4,
        //             },
        //             repulse: {
        //                 distance: 150,
        //                 duration: 0.6,
        //             },
        //             },
        //         },
        //         particles: {
        //             color: {
        //             value: "#1c73b4",
        //             },
        //             links: {
        //             color: "#ffffff",
        //             distance: 180,
        //             enable: true,
        //             opacity: 0.2,
        //             width: 1.5,
        //             },
        //             collisions: {
        //             enable: true,
        //             },
        //             move: {
        //             direction: "none",
        //             enable: true,
        //             outModes: {
        //                 default: "bounce",
        //             },
        //             random: true,
        //             speed: 3,
        //             straight: true,
        //             },
        //             number: {
        //             density: {
        //                 enable: true,
        //                 area: 1000,
        //             },
        //             value: 90,
        //             },
        //             opacity: {
        //             value: 0.8,
        //             },
        //             shape: {
        //             type: "polygon",
        //             },
        //             size: {
        //             value: { min: 1, max: 6 },
        //             },
        //         },
        //         detectRetina: true,
        // }} />
    )
}

const BackgroundStyle = styled.div`
/* 
    .body{
        margin: 0;
        padding: 0;
        overflow-x:hidden;
        overflow-y:hidden;
        background-color: #1fa834;
        } */
        /*waves****************************/
        
    .box {
        position: fixed;
        top: 0;
        transform: rotate(80deg);
        left: 0;
    }

    .wave {
        position: fixed;
        top: 0;
        left: 0;
    opacity: .4;
    position: absolute;
    top: 3%;
    left: 10%;
    background: #0af;
    width: 1500px;
    height: 1300px;
    margin-left: -150px;
    margin-top: -250px;
    transform-origin: 50% 48%;
    border-radius: 43%;
    animation: drift 7000ms infinite linear;
    }

    .wave.-three {
    animation: drift 7500ms infinite linear;
        position: fixed;
        background-color: #77daff;
    }

    .wave.-two {
    animation: drift 3000ms infinite linear;
    opacity: .1;
    background: black;
        position: fixed;
    }

    .box:after {
    content: '';
    display: block;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 11;
    transform: translate3d(0, 0, 0);
    }

    @keyframes drift {
        from { transform: rotate(0deg); }
        from { transform: rotate(360deg); }
    }

    /*LOADING SPACE*/
    .contain {
        animation-delay: 4s;
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-flow: row nowrap;
        flex-flow: row nowrap;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background: #31af5f;
        background: -webkit-linear-gradient(#25a7d7, #2962FF);
        background: linear-gradient(#25a7d7, #25a7d7);
    }

    .icon {
        width: 100px;
        height: 100px;
        margin: 0 5px;
    }

    /*Animation*/
    .icon:nth-child(2) img {-webkit-animation-delay: 0.2s;animation-delay: 0.2s}
    .icon:nth-child(3) img {-webkit-animation-delay: 0.3s;animation-delay: 0.3s}
    .icon:nth-child(4) img {-webkit-animation-delay: 0.4s;animation-delay: 0.4s}

    .icon img {
        -webkit-animation: anim 2s ease infinite;
        animation: anim 2s ease infinite;
        -webkit-transform: scale(0,0) rotateZ(180deg);
        transform: scale(0,0) rotateZ(180deg);
    }

    @-webkit-keyframes anim{
    0% {
        -webkit-transform: scale(0,0) rotateZ(-90deg);
        transform: scale(0,0) rotateZ(-90deg);opacity:0
    }
    30% {
        -webkit-transform: scale(1,1) rotateZ(0deg);
        transform: scale(1,1) rotateZ(0deg);opacity:1
    }
    50% {
        -webkit-transform: scale(1,1) rotateZ(0deg);
        transform: scale(1,1) rotateZ(0deg);opacity:1
    }
    80% {
        -webkit-transform: scale(0,0) rotateZ(90deg);
        transform: scale(0,0) rotateZ(90deg);opacity:0
    }
    }

    @keyframes anim{
    0% {
        -webkit-transform: scale(0,0) rotateZ(-90deg);
        transform: scale(0,0) rotateZ(-90deg);opacity:0
    }
    30% {
        -webkit-transform: scale(1,1) rotateZ(0deg);transform: scale(1,1) rotateZ(0deg);opacity:1
    }
    50% {
        -webkit-transform: scale(1,1) rotateZ(0deg);
        transform: scale(1,1) rotateZ(0deg);opacity:1
    }
    80% {
        -webkit-transform: scale(0,0) rotateZ(90deg);
        transform: scale(0,0) rotateZ(90deg);opacity:0
    }
    }

`;