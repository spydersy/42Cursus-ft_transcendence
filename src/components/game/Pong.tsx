import React , {useEffect, useState} from 'react'
import Sketch from "react-p5";
import p5Types from "p5";
import { Button } from '../../Pages/SignIn';
import { GameProps } from './types';
var defaultProp = {
    ballcolor : "#000",
    paddlecolor : "#000",
    mode : "string"
  }
export default function Pong() {
    const [gameData, setgameData] = useState<GameProps>(defaultProp)
  
    var width = 1000;
    var height = 700;
    var ballCord = {
        size : 35,
        x: width/2,
        y : height/2
    };
    var paddel1 = {
        w : 20,
        h : 100,
        x: 20,
        y : height/2,
      
    };
    var paddel2 = {
        w : 20,
        h : 100,
        x:  width - 40,
        y : 0
    };
    var topLimit = 0;
    var bottomLimit = height - paddel2.h;
    var direction  = {
        x : 10,
        y : 10,
    };

    var ball;
    var start = false;

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(width, height).parent(canvasParentRef);
        p5.background(0);
        p5.frameRate(60);
	};

    function detectCollision(player : any) {
        const cx = ballCord.x ;
        const cy = ballCord.y ;
        const r = ballCord.size / 2 ;
        const [x1, y1, w1, h1] = [cx - r, cy - r, r * 2, r * 2];
        const x2 =player.x;
        const y2 =player.y;
        const w2 = parseInt(player.w);
        const h2 = parseInt(player.h);
        
        const colliding = x1 < (x2 + w2) && (x1 + w1) > x2 &&
        y1 < (y2 + h2) && (y1 + h1) > y2;
        return colliding;
      }
    const hitWalls = (p5 : p5Types)=>{
        if (ballCord.x  <=  ballCord.size / 2   || ballCord.x >= width - ballCord.size / 2  )
        {
            direction.x = -direction.x
        }
        else if (ballCord.y  <=  ballCord.size / 2 || ballCord.y >= height - ballCord.size / 2 )
            direction.y = -direction.y
        else if (detectCollision(paddel1) || detectCollision(paddel2))
            direction.x = -direction.x
        
    }
    
    
    const mouseMoved = (p5: p5Types)=>{
        if (p5.mouseY > topLimit  && p5.mouseY < bottomLimit )
        paddel1.y  = p5.mouseY;
    }
    
    
    const draw = (p5: p5Types) => {
        p5.background(0);

        //create ball
        ball = p5.ellipse(ballCord.x, ballCord.y, ballCord.size, ballCord.size);
        p5.fill(p5.color(gameData?.ballcolor))

        //create paddels
        p5.rect(paddel1.x, paddel1.y, paddel1.w, paddel1.h);
        p5.rect(paddel2.x, paddel2.y, paddel2.w, paddel2.h);
        p5.fill(p5.color(gameData?.paddlecolor))


        
        // move the ball
        if (start)
        {
            ballCord.x += direction.x;
            ballCord.y += direction.y;
            
        }
        // check for hit walls
        hitWalls(p5)
    };
    //detect Colision 


    useEffect(() => {
    var games : string | null = localStorage.getItem('gameData');
    if (games)
    {
        const gameData : GameProps =  JSON.parse(games || '{}');
        setgameData(gameData)
    }



    }, [])
    
    return <div >
        <Sketch mouseMoved={mouseMoved}  setup={setup} draw={draw} />;
        <Button onClick={()=>{start = !start}} text='start'/>
    </div>
}
