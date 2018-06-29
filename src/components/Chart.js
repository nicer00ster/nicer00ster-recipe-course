import React from 'react';
import { Doughnut } from 'react-chartjs-2';


const fetchChartData = (digest, servings) => {
  if(servings === undefined) servings = 1;

  let data = [];

  for(var i = 0; i < 3; i++) {
    data.push(Math.round(digest[i].total/servings));
  }

  let chartData = {
    labels: ["Fat (g)", "Carbs (g)", "Protein (g)"],
    datasets: [{
      backgroundColor: ['#f7797d', '#fbd786', '#c6ffdd'],
      data
    }]
  };

  let options = {
    legend: {
      position: 'bottom',
      responsive: true,
      maintainAspectRatio: false,
      labels: {
        boxWidth: 30,
        fontSize: 12,
        fontFamily: 'Gudea',
        fontColor: '#1f222e'
      }
    }
  }

  return [chartData, options];
}


const Chart = props => {

  let caloriesInfo = null;

  if(props.calories && props.yield) {
   caloriesInfo = (<p className="calories">{Math.round(props.calories/props.yield)} calories</p>);
  } else if(props.calories) {
   caloriesInfo = (<p className="calories">{Math.round(props.calories)} calories</p>);
  }


  let nutritionChart = null;

  if(props.digest) {
   let chartInfo = fetchChartData(props.digest, props.yield);
   nutritionChart = (
     <div className="chart">
       <Doughnut data={chartInfo[0]} options={chartInfo[1]}/>
     </div>
   );
  }

  return (
    <div className="single__facts">
      <h3 className = "nutrition">{props.yield ? "Nutrition Per Serving" : "Nutrition (entire recipe)"}</h3>
      {caloriesInfo}
      {props.digest ? null : <p>No additional health information.</p>}
      {nutritionChart}
    </div>
  )
}

export default Chart;
