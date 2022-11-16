import React, { useEffect, useState, useContext } from 'react'
import Sketch from "react-p5";
import p5Types from "p5";
import { GameProps, UserProp } from './types';
import { SocketGameContext } from '../../context/Socket'
import { UserContext } from '../../context/UserContext';

var defaultProp = {
    ballcolor: "#000",
    paddlecolor: "#000",
    mode: "string"
}
interface gameProps {login : string ,  start: boolean, setstart: (e: boolean) => void, player: boolean }
export default function Pong(props: gameProps) {
    const [gameData, setgameData] = useState<GameProps>(defaultProp)
    // var mode = localStorage.getItem('mode') ;

    const gamesocket = useContext(SocketGameContext)
    const user = useContext(UserContext)

    var p = document.getElementById("canva")?.offsetWidth
    var width : number = 0;
    var height = 700;

    if (p)
    {
        width = p;
        height = p/ 1.57;

    }

    var ballCord = {
        size: 0.02,
        x: 0.5,
        y:0.5
    }
    var paddel1 = {
        w: 0.02,
        h: 0.15,
        x: 0.03,
        y: 0.5,

    };
    var paddel2 = {
        w:  0.02,
        h:  0.15,
        x: 0.95,
        y: 0.5,
    }
    var pre = {

        x: width - 30,
        y: 0,
    }
    var topLimit = 0
    var bottomLimit = height - paddel2.h;


    const setup = (p5: p5Types, canvasParentRef: Element) => {

        topLimit = 0;

        var p = document.getElementById("canva")?.offsetWidth
        if (p)
        {
            width = p;
            height = p/ 1.57;

        }
        
        bottomLimit = width - paddel2.h;
        p5.createCanvas(width, height ).parent(canvasParentRef);
        
        

        p5.frameRate(60);


        p5.resizeCanvas(width , height)
    };


    const mouseMoved = (p5: p5Types) => {
        user.then((data : UserProp | "{}")=>{
            if (data !== "{}")
            {

                if (p5.mouseY > topLimit && p5.mouseY < bottomLimit) {
                    if (props.player) {
                        
                        gamesocket.emit("player1Moved", {login : data.login, y : p5.mouseY / height})
                    }
                    else {
                        gamesocket.emit("player2Moved", {login : data.login, y : p5.mouseY/ height})
                    }
        
                }   
            }
        })
    }
    const windowResize = (p5: p5Types) => {
        var p = document.getElementById("canva")?.offsetWidth
        if (p )
        {
     

            width = p;
            height = p/ 1.57;

            p5.resizeCanvas(width , height)
        
        }
    }

    const drowPaddels = (p5 : p5Types)=>{
        p5.stroke(p5.color("#157DBD"));
        p5.strokeWeight(4)
        p5.fill(p5.color(gameData?.paddlecolor))
        p5.rect(paddel1.x * width, paddel1.y * height, paddel1.w * width, paddel1.h * height, 10);
        p5.rect(paddel2.x * width, paddel2.y * height, paddel2.w * width, paddel2.h * height , 10);
        p5.noStroke()
    }
    const drowBall = (p5 : p5Types)=>{
        p5.stroke(p5.color("#157DBD"));
        p5.strokeWeight(2)
        p5.fill(p5.color(gameData?.ballcolor))
        p5.ellipse(ballCord.x* width, ballCord.y * height, ballCord.size * width, ballCord.size * width);

        p5.noStroke()
    }
    const drowLine = (p5 : p5Types)=>{
        
        p5.stroke(p5.color("#157DBD"));
        p5.strokeWeight(2)
        p5.ellipse(width /2, height / 2, width/4, width/4);
        // p5.fill(0)

        
        p5.noStroke()
        
        p5.stroke(p5.color("#157DBD"));
        p5.strokeWeight(2)
        p5.line(width /2, 0 , width /2, height);
    }
    const draw = (p5: p5Types) => {
        p5.resizeCanvas(width , height)

        //create ball
        p5.clear();
        p5.stroke(p5.color("#157DBD"));
        p5.strokeWeight(2)
        p5.fill(0)
        p5.rect(0, 0, width - 2, height -2, 10);
    

        drowLine(p5)
        drowPaddels(p5)
        drowBall(p5)
    };
    gamesocket.on("player1moved", (y: any) => {
        paddel1.y = y.y ;
 


    })
    gamesocket.on("player2moved", (y: any) => {

        paddel2.y = y.y ;
    })
    gamesocket.on("moveBallClient", (pyload) => {
        ballCord.x = pyload.x;
        ballCord.y = pyload.y;
        pre.x =  pyload.px
        pre.y = pyload.py
    })

    useEffect(() => {

        var games: string | null = localStorage.getItem('gameData');
        if (games) {
            const gameData: GameProps = JSON.parse(games || '{}');
            setgameData(gameData)
        }
       

    }, [])


    return <Sketch  windowResized={windowResize} mouseMoved={mouseMoved} setup={setup} draw={draw} />;
    /* <Button cursor='pointer' onClick={(e)=>{props.setstart(!props.start)}} text='start'/> */

}
