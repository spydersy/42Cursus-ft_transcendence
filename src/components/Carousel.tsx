import React, {useEffect} from 'react'
import styled from 'styled-components';
import $ from 'jquery'; 
import { gsap, TweenMax , Quint , Expo} from 'gsap';

import FriendImg from "../assets/imgs/1vf.png"
import RandImg from "../assets/imgs/1vr.png"
import AiImg from "../assets/imgs/1vai.png"
import Tidk from "../assets/imgs/tidk.png"

export default function Carousel() {
    var w, container, carousel : Object, item, radius : number, itemLength, rY, ticker, fps; 

    var mouseX = 0;
    var mouseY = 0;
    var mouseZ = 0;
    var addX = 0;

		function animateIn( $item : any, $block : any  )
		{
			var $nrX = 360 * getRandomInt(2);
			var $nrY = 360 * getRandomInt(2);
				
			var $nx = -(2000) + getRandomInt( 4000 )
			var $ny = -(2000) + getRandomInt( 4000 )
			var $nz = -4000 +  getRandomInt( 4000 )
				
			var $s = 1.5 + (getRandomInt( 10 ) * .1)
			var $d = 1 - (getRandomInt( 8 ) * .1)
			
			TweenMax.set( $item, { autoAlpha:1, delay:$d } )	
			TweenMax.set( $block, { z:$nz, rotationY:$nrY, rotationX:$nrX, x:$nx, y:$ny, autoAlpha:0} )
			TweenMax.to( $block, $s, { delay:$d, rotationY:0, rotationX:0, z:0,  ease:Expo.easeInOut} )
			TweenMax.to( $block, $s-.5, { delay:$d, x:0, y:0, autoAlpha:1, ease:Expo.easeInOut} )
		}
		
		function onMouseMove(event : any)
		{
			mouseX = -(-(window.innerWidth * .5) + event.pageX) * .0025;
			mouseY = -(-(window.innerHeight * .5) + event.pageY ) * .01;
			mouseZ = -(radius) - (Math.abs(-(window.innerHeight * .5) + event.pageY ) - 200);

		}
		
		// loops and sets the carousel 3d properties
		function looper()
		{
			addX += mouseX
			TweenMax.to( carousel, 1, { rotationY:addX, rotationX:mouseY, ease:Quint.easeOut } )
			TweenMax.set( carousel, {z:mouseZ } )
			// fps.text( 'Framerate: ' + counter.tick() + '/60 FPS' )	
		}
		
		function getRandomInt( $n : number )
		{
            return Math.floor((Math.random()*$n)+1);	
        }
		
        
		function init(  )
		{
            w = $(window);
        container = $( '#contentContainer' );
        carousel = $( '#carouselContainer' );
        item = $( '.carouselItem' );
        itemLength = $( '.carouselItem' ).length;
      
        rY = 360 / itemLength;
        radius = Math.round( (250) / Math.tan( Math.PI / itemLength ) );

        // set container 3d props
        TweenMax.set(container, {perspective:600})
        TweenMax.set(carousel, {z:-(radius)})
        for ( var i = 0; i < itemLength; i++ )
            {
                var $item = item.eq(i);
                var $block = $item.find('.carouselItemInner');
                
        //thanks @chrisgannon!        
        TweenMax.set($item, {rotationY:rY * i, z:radius, transformOrigin:"50% 50% " + -radius + "px"});
                
                animateIn( $item, $block )						
            }
            
            // set mouse x and y props and looper ticker
            window.addEventListener( "mousemove", onMouseMove, false );
        }
    useEffect(() => {
        $(document).ready( init )
       
			ticker = setInterval( looper, 1000/60 );	
      return () => {
        
      }
    }, [])
    
  return (
    <Container className='test' >
		
        <CarouselContainer id="carouselContainer" className='trans3d'>
        <CarouselItem id="item1" className="carouselItem trans3d"><CarouselItemInner onClick={()=>{console.log(1)}}   className="carouselItemInner trans3d">
			 <img src={FriendImg} alt="" />
			 </CarouselItemInner></CarouselItem>
		<CarouselItem id="item2" className="carouselItem trans3d"><CarouselItemInner onClick={()=>{console.log(2)}}  className="carouselItemInner trans3d">
			 <img src={RandImg} alt="" />
			 </CarouselItemInner></CarouselItem>
		<CarouselItem id="item3" className="carouselItem trans3d"><CarouselItemInner onClick={()=>{console.log(3)}}  className="carouselItemInner trans3d">
			 <img src={AiImg} alt="" />
			 </CarouselItemInner></CarouselItem>
		{/* <CarouselItem id="item4" className="carouselItem trans3d"><CarouselItemInner onClick={()=>{console.log(4)}}  className="carouselItemInner trans3d">
			 <img src={Tidk} alt="" />
			 </CarouselItemInner></CarouselItem> */}
		{/* <CarouselItem id="item5" className="carouselItem trans3d"><CarouselItemInner onClick={()=>{console.log(5)}}  className="carouselItemInner trans3d">5</CarouselItemInner></CarouselItem> */}
		
    </CarouselContainer>
    </Container>
  )
}


const Container = styled.div`
	position: relative;
    .trans3d{
        -webkit-transform-style: preserve-3d;
		-webkit-transform: translate3d(0, 0, 0);
		-moz-transform-style: preserve-3d;
		-moz-transform: translate3d(0, 0, 0);
		-ms-transform-style:preserve-3d;
		-ms-transform: translate3d(0, 0, 0);
		transform-style:preserve-3d;
		transform: translate3d(0, 0, 0);

    }
`;
const CarouselContainer = styled.section`


		position:absolute;
		/* margin-left:-500px;
		margin-top:-500px; */
		left:18%;
		top:0%;
		width:600px;
		height:600px;
		transform: translate(-50% , -50%);
`;
const CarouselItem = styled.figure`
		position:absolute;
		margin-left:-500px;
		margin-top:-500px;
		left:50%;
		top:50%;
		width:1000px;
		height:1000px;
`;
const CarouselItemInner = styled.div`
        overflow: hidden;
cursor: pointer;
    width:200px;
    height:130px;
    position:absolute;
    background-color:  ${props => props.theme.colors.primarybg};
    /* border:10px solid rgba(255, 255, 255, .5); */
	border-radius: 10px;
    color:aqua;
    font-size:72px;
    left:50%;
    top:50%;
    margin-left:-160px;
    margin-top:-90px;
    text-align:center;
	/* &:hover{
		transform: scale(1.2);
	} */
    /* padding-top:50px; */
`;


//https://api.intra.42.fr/oauth/authorize?client_id=cc02d44bb89473a6a501f1f5c52aa699e02029134805296e7c9fc7145495db5e&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Faaaa&response_type=code
// UID: cc02d44bb89473a6a501f1f5c52aa699e02029134805296e7c9fc7145495db5e	
// SECRET: 72ae56183e837b6814cdc32e6e3071b2286be154ef1537c495bf797ccb3f0849	