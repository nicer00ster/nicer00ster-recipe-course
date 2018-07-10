import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { fetchChartData } from '../../helpers';
import PropTypes from 'prop-types';

const Donut = props => {
  let caloriesInfo = null;

  if(props.calories && props.yield) {
   caloriesInfo = (
     <p>{Math.round(props.calories/props.yield)} calories</p>
   );
  } else if(props.calories) {
   caloriesInfo = (<p>{Math.round(props.calories)} calories</p>);
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

Donut.propTypes = {
  calories: PropTypes.number,
  yield: PropTypes.number,
  digest: PropTypes.array
};

export default Donut;
