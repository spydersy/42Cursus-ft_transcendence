import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS  , Legend , ArcElement , Tooltip} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

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


export default function DoughnutChart() {
  return (
    <div>
         < Doughnut  
            data={data} 
            options={
              {
                // elements:{
                    
                // },
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
    </div>
  )
}
