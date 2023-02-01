//https://react-chartjs-2.js.org/examples/line-chart
import styles from "../styles/Graph.module.scss"
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Predictions',
    },
  },
    responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      max: 1,
      min: 0,
      ticks: {
        stepSize: 0.1
      }
    }
  }
  //   layout: {
  //     padding: {
  //       top: 5,
  //       left: 15,
  //       right: 15,
  //       bottom: 15
  //     }
  // }
};



export default function SymChart(props) {
  let labels = []
  // console.log("origional", props.sym)
  let reversed = [] 
  // console.log("new", reversed)
  for (var i = 0; i < props.sym.length; i++){
    labels.push(String(i));
    reversed.push(props.sym[props.sym.length-i-1])
}
  let data = {
      labels,
      datasets: [
        {
          label: 'Predictions',
          data: reversed, 
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ],
    };
  return (
    <div className={styles.LineGraph}>
    <Line options={options} data={data} />
    </div>
  )
}

