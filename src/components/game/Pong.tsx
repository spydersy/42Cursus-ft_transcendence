import React, { useEffect, useState, useContext } from 'react'
import Sketch from "react-p5";
import p5Types from "p5";
import { Button } from '../../Pages/SignIn';
import { GameProps, UserProp } from './types';
import { SocketGameContext } from '../../context/Socket'
import { UserContext } from '../../context/UserContext';

var defaultProp = {
    ballcolor: "#000",
    paddlecolor: "#000",
    mode: "string"
}
interface gameProps { start: boolean, setstart: (e: boolean) => void, player: boolean }
export default function Pong(props: gameProps) {
    const [gameData, setgameData] = useState<GameProps>(defaultProp)
    const [widthstate, setwidthState] = useState(0)
    const gamesocket = useContext(SocketGameContext)
    const user = useContext(UserContext)

    var p = document.getElementById("canva")?.offsetWidth
    var width : number = 0;
    if (p)
        width = p;

    var height = 700;
    var ballCord = {
        size: 20,
        x: width / 2,
        y: height / 2
    }
    var paddel1 = {
        w: 20,
        h: 100,
        x: 20,
        y: height / 2,

    };
    var paddel2 = {
        w: 20,
        h: 100,
        x: width - 50,
        y: 0,
    }
    var pre = {

        x: width - 30,
        y: 0,
    }
    var topLimit = 0
    var bottomLimit = height - paddel2.h;
    var direction = {
        x: 10,
        y: 10,
    }

    console.log("_____WTFFFF____")

    const setup = (p5: p5Types, canvasParentRef: Element) => {

        topLimit = 0;
        console.log("_____WTFFFF____")
        var p = document.getElementById("canva")?.offsetWidth
        if (p)
            width = p;
        bottomLimit = width - paddel2.h;
        p5.createCanvas(width, height ).parent(canvasParentRef);



        p5.frameRate(60);
    };


    const mouseMoved = (p5: p5Types) => {
        user.then((data : UserProp | "{}")=>{
            if (data !== "{}")
            {

                if (p5.mouseY > topLimit && p5.mouseY < bottomLimit) {
                    
                    if (props.player) {
                        
                        gamesocket.emit("player1Moved", {login : data.login, y : p5.mouseY})
                    }
                    else {
                        gamesocket.emit("player2Moved", {login : data.login, y : p5.mouseY})
                    }
        
                }   
            }
        })
    }
    const windowResize = (p5: p5Types) => {
        var p = document.getElementById("canva")?.offsetWidth
        if (p)
        {
            width = p;
             paddel1 = {
                w: 20,
                h: 100,
                x: 20,
                y: height / 2,
        
            };
             paddel2.x = width - 50;
             paddel1.x = 30;
      
        
        }
    }

    const drowPaddels = (p5 : p5Types)=>{
        p5.stroke(p5.color("#157DBD"));
        p5.strokeWeight(4)
        p5.rect(paddel1.x, paddel1.y, paddel1.w, paddel1.h , 10);
        p5.rect(paddel2.x, paddel2.y, paddel2.w, paddel2.h , 10);
        p5.fill(p5.color(gameData?.paddlecolor))
        p5.noStroke()
    }
    const drowBall = (p5 : p5Types)=>{
        p5.stroke(p5.color("#157DBD"));
        p5.strokeWeight(2)
        p5.ellipse(ballCord.x, ballCord.y, ballCord.size, ballCord.size);

        p5.fill(p5.color(gameData?.ballcolor))
        p5.noStroke()
    }
    const drowLine = (p5 : p5Types)=>{
        
        p5.stroke(p5.color("#157DBD"));
        p5.strokeWeight(2)
        p5.ellipse(width /2, height / 2, 300, 300);
        
        p5.noStroke()
        
        p5.stroke(p5.color("#157DBD"));
        p5.strokeWeight(2)
        p5.line(width /2, 0 , width /2, height);
    }
    const draw = (p5: p5Types) => {
        p5.background(0);
        //create ball
        p5.stroke(p5.color("#157DBD"));
        p5.strokeWeight(2)
        p5.rect(0, 0, width - 2, height - 2, 10);
        drowLine(p5)
        // p5.noStroke()
        drowPaddels(p5)

        
        drowBall(p5)
        // s.noStroke()
        //create paddels


        // check for hit walls
        // move the ball
        if (props.start) {
            gamesocket.emit("moveBall", { w: width, h: height, p1: paddel1, p2: paddel2 })
        }
        // hitWalls(p5)
    };
    //detect Colision 


    gamesocket.on("player1moved", (y: number) => {
        paddel1.y = y;


    })
    gamesocket.on("player2moved", (y: number) => {

        paddel2.y = y;


    })
    gamesocket.on("moveBallClient", (pyload) => {
        // console.log(pyload.x)
        ballCord.x = pyload.x * width;
        ballCord.y = pyload.y * height;
        pre.x =  pyload.px
        pre.y = pyload.py
    })

    useEffect(() => {

        console.log("init")
        var games: string | null = localStorage.getItem('gameData');
        if (games) {
            const gameData: GameProps = JSON.parse(games || '{}');
            setgameData(gameData)
        }
        var test = document.getElementById("canva")
        if (test) {
            setwidthState(test.offsetWidth)
            height = test.offsetHeight;
        }

    }, [setwidthState])


    return <Sketch windowResized={windowResize} mouseMoved={mouseMoved} setup={setup} draw={draw} />;
    /* <Button cursor='pointer' onClick={(e)=>{props.setstart(!props.start)}} text='start'/> */

}
