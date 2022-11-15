import React from 'react'
import styled from "styled-components"
import { Chart as ChartJS,  RadialLinearScale,
  PointElement, LineElement, Filler, Tooltip, 
  Legend, ArcElement } from 'chart.js';
import {  Radar } from 'react-chartjs-2';

ChartJS.register(ArcElement, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const DoughnutStyle = styled.div`
  height: 95%;
  width: 350px;
  display: flex;
  /* align-items: center; */
align-items: flex-end;
`;


export interface GameData 
{
  wins : number[],
  losses : number[],    
}

export  function RadarChart(props: GameData) {


  var wins = props.wins;
  var losses = props.losses;

  let Ewins = [wins[0], wins[0],wins[0], wins[1], wins[1]]
  let Elosses = [losses[0], losses[0], losses[1], losses[1], losses[1]]

  const dataRadar = {
    labels: [
      "Classic",
      "Classic",
      "Ai-Dr VegaPunk",
      "Ai-Dr VegaPunk",
      "Ai-Dr VegaPunk",
    ],
    datasets: [
      {
        label: "Wins",
        borderWidth: 0.5,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        
        borderColor: 'rgba(54, 162, 235, 0.8)',
        pointRadius: 1,
        data: Ewins,
      },
      {
        label: "Losses",
        borderWidth: 0.5,
        backgroundColor: 'rgba(235, 54, 226, 0.2)',
        borderColor: 'rgba(235, 54, 226, 0.8)',
        pointRadius: 1,
        data: Elosses
      },

    ]
    };

  return (
    <DoughnutStyle>
         < Radar  
            data={dataRadar} 
            options={
              {
                maintainAspectRatio: false,
                responsive: true,
                plugins: { legend: {  position : "bottom"  } },
                scales: {
                 r:{
                  ticks: {
                    display : false,
                  },
                  grid: { color: 'rgba(145, 102, 102, 0.37)', },
                  angleLines: {color: 'rgba(91, 91, 103, 0.776)',  }
                  }
                }
              }
            }
            />
    </DoughnutStyle>
  )
}