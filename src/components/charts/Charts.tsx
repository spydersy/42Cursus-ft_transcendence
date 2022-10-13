import React , {useState}from 'react'
import styled from "styled-components"
import { Chart as ChartJS,  RadialLinearScale,
  PointElement, LineElement, Filler, Tooltip, 
  Legend, ArcElement } from 'chart.js';
import { Doughnut, Radar } from 'react-chartjs-2';

ChartJS.register(ArcElement, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const DoughnutStyle = styled.div`
  height: 95%;
  width: 350px;
  display: flex;
  /* align-items: center; */
align-items: flex-end;

`;

export  function RadarChart() {




  let Ewins = [8, 9, 10, 11, 12]
  let Elosses = [12, 12, 13, 14, 15]
  let Edraws = [5, 6, 7, 8, 9]


  // Edraws = []
  // Elosses = []
  // Ewins = []

  // Wins [classic, tag-team, 1vs1, (Ai)buggy, (Ai)Dr VegaPunk]
  // Loss [classic, tag-team, 1vs1, (Ai)buggy, (Ai)Dr VegaPunk]
  // Draws [classic, tag-team, 1vs1, (Ai)buggy, (Ai)Dr VegaPunk]
  
  // setdraws([2, 17, 5, 8, 10])

  const dataRadar = {
    labels: [
      "Classic",
      "Tag-Team",
      "1 vs 1",
      "(Ai)-Buggy",
      "(Ai)-Dr VegaPunk",
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
      {
        label: "Draws",
        borderWidth: 0.5,
        backgroundColor: 'rgba(206, 140, 107, 0.438)',
        borderColor: 'rgba(226, 128, 30, 0.8)',
        pointRadius: 1,
        data: Edraws
      }
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