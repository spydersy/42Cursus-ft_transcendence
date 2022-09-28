import React from 'react'
import styled from "styled-components"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  // defaults,
  ArcElement
} from 'chart.js';
import { Doughnut, Radar } from 'react-chartjs-2';
ChartJS.register(ArcElement, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
const data = {
    labels: ['Wins', 'Lost'],
   
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
  
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
  
        ],
        borderWidth: 1,
      },
    ],
  };
const dataRadar = {
  labels: [
    "Classic",
    "Tag-team",
    "1 vs 1",
    "(Ai) buggy",
    "(Ai) Dr VegaPunk",
  ],
  datasets: [
    {
      label: "Wins",
      borderWidth: 0.5,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      
      borderColor: 'rgba(54, 162, 235, 0.8)',
      pointRadius: 0,
      data: [25, 50, 75, 91, 0]
    },
    {
      label: "Loss",
      borderWidth: 0.5,
      backgroundColor: 'rgba(235, 54, 226, 0.2)',
      borderColor: 'rgba(235, 54, 226, 0.8)',
      pointRadius: 0,
      data: [0, 70, 60, 20, 100]
    }
  ]
  };


export default function DoughnutChart() {
  return (
    <DoughnutStyle>
         < Doughnut  
            data={data} 
            options={
              {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: {
                    position : "bottom"
                    
                  }
                  
                }
                
                
              }
            }
            />
    </DoughnutStyle>
  )
}
const DoughnutStyle = styled.div`
  height: 95%;
  width: 350px;
  display: flex;
  /* align-items: center; */
align-items: flex-end;

`;

export  function RadarChart() {
  return (
    <DoughnutStyle>
         < Radar  
            data={dataRadar} 
            options={
              {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: {
                    position : "bottom"
                    
                  }
                  
                },
                scales: {
                 r:{
                  ticks: {
                    display : false
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.101)',
                  },
                    angleLines: {
                      color: 'rgba(255, 255, 255, 0.101)',

                    }
                 }
                }
                
                
              }
            }
            />
    </DoughnutStyle>
  )
}