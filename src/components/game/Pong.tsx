import React , {useEffect, useState , useContext} from 'react'
import Sketch from "react-p5";
import p5Types from "p5";
import { Button } from '../../Pages/SignIn';
import { GameProps } from './types';
import { SocketContext } from '../../context/Socket'

var defaultProp = {
    ballcolor : "#000",
    paddlecolor : "#000",
    mode : "string"
  }
interface gameProps {start: boolean , setstart : (e : boolean)=>void , player : boolean }
export default function Pong(props : gameProps) {
    const [gameData, setgameData] = useState<GameProps>(defaultProp)
    const [widthstate, setwidthState] = useState(0)
    const gamesocket = useContext(SocketContext)
    var width = 1000;

    var height = 700;
    var ballCord = {
        size : 35,
        x: width/2,
        y : height/2
    }
    var paddel1  = {
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
    var topLimit = 0
    var bottomLimit =  height - paddel2.h
    var direction =  {
        x : 10,
        y : 10,
    }


	const setup = (p5: p5Types, canvasParentRef: Element) => {

         topLimit = 0;
         bottomLimit = height - paddel2.h;

         
		p5.createCanvas(width, height).parent(canvasParentRef);
        p5.background(0);
        p5.frameRate(60);
	};

    function detectCollision(player : any) {
        const cx = ballCord.x ;
        const cy = ballCord.y ;
        const r = ballCord.size / 2 ;
        const [x1, y1, w1, h1] = [cx - r, cy - r, r * 2, r * 2];
        const x2 =player.x ;
        const y2 =player.y;
        const w2 = parseInt(player.w);
        const h2 = parseInt(player.h);

        const colliding = x1 < (x2 + w2) && (x1 + w1) > x2 &&
        y1 < (y2 + h2) && (y1 + h1) > y2;
        return colliding;
      }
    // const hitWalls = (p5 : p5Types)=>{
    //     // if (ballCord.x + direction.x > width - (ballCord.size  /2 ))
    //     // {
    //     //     gamesocket.emit("player1Scored")
    //     //     ballCord = {
    //     //         size : 35,
    //     //         x: width/2,
    //     //         y : height/2
    //     //     }

    //     // }
    //     // else if (ballCord.x + direction.x  < ( ballCord.size /2)    )
    //     // {

    //     //     gamesocket.emit("player2Scored")
    //     //     ballCord = {
    //     //         size : 35,
    //     //         x: width/2,
    //     //         y : height/2
    //     //     }

    //     // }
    //     // else if (ballCord.y <=  ballCord.size / 2 || ballCord.y  >= height - ballCord.size / 2 )
    //     //     direction.y = -direction.y
    //      if (detectCollision(paddel1) || detectCollision(paddel2))
    //         gamesocket.emit("changeDirectionX")
        
    // }
    
    
    const mouseMoved = (p5: p5Types)=>{
        if (p5.mouseY > topLimit  && p5.mouseY < bottomLimit )
        {
            if (props.player)
            {
                gamesocket.emit("player1Moved", p5.mouseY)
            }
            else
            {
                gamesocket.emit("player2Moved", p5.mouseY)
            }

        }
    
    }
    
    
    const draw = (p5: p5Types) => {
        p5.background(0);

        //create ball
        p5.ellipse(ballCord.x, ballCord.y, ballCord.size, ballCord.size);
        p5.fill(p5.color(gameData?.ballcolor))

        //create paddels
        p5.rect(paddel1.x, paddel1.y, paddel1.w, paddel1.h);
        p5.rect(paddel2.x, paddel2.y, paddel2.w, paddel2.h);
        p5.fill(p5.color(gameData?.paddlecolor))


        
        // check for hit walls
        // move the ball
        if (props.start)
        {
            gamesocket.emit("moveBall" , {w : width, h :height ,p1 : paddel1 , p2: paddel2})
        }
        // hitWalls(p5)
    };
    //detect Colision 


    gamesocket.on("player1moved" , (y : number)=>{
        paddel1.y   =  y;


    })
    gamesocket.on("player2moved" , (y : number)=>{

        paddel2.y   =  y;


    })
    gamesocket.on("moveBallClient" , (pyload)=>{

        ballCord.x = pyload.x;
        ballCord.y = pyload.y;
    })

    useEffect(() => {


    var games : string | null = localStorage.getItem('gameData');
    if (games)
    {
        const gameData : GameProps =  JSON.parse(games || '{}');
        setgameData(gameData)
    }
    var test = document.getElementById("canva")
    if (test)
    {
        setwidthState(test.offsetWidth)
        height = test.offsetHeight;
    }

    }, [setwidthState])
    
    return <Sketch mouseMoved={mouseMoved}  setup={setup} draw={draw} />;
        /* <Button cursor='pointer' onClick={(e)=>{props.setstart(!props.start)}} text='start'/> */
   
}
