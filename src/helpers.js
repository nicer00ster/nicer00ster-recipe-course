import { register, saveUser, login } from './auth';
import { notify } from 'react-notify-toast';

export const createAccount = (e, username, email, password, loading) => {
  e.preventDefault();
  register(email, password)
  .catch(err => {
    this.props.error(err.message);
  })
  .then(res => {
    if(res) {
      loading();
      saveUser(res.user, username);
    }
  })
}

export const loggingIn = (e, email, password, loading, error) => {
  e.preventDefault();
  loading();
  login(email, password)
  .catch(err => {
    error(err);
    return;
  })
  .then(() => {
    notify.show('Woo! 🍔😍', 'success', 3000);
    return loading();
  })
}

export const fetchChartData = (digest, servings) => {
  if(servings === undefined) servings = 1;

  let data = [];

  for(let i = 0; i < 3; i++) {
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
