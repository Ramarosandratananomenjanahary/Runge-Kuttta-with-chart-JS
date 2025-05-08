
const ctx1 = document.getElementById('lineChart');
var myChart= new Chart(ctx1, {
    type: 'line',
    data: {
      labels: ['JAVA','JS','PYTHON','IA','PHP','TS','CSHARP','HTML','CSS','MVC','NEXT','NODE'],
      datasets: [{
        label: 'Earning in $',
        data: [2050,1900,2100,1800,2800,2000,2500,2600,2450,1950,2300,2900 ],
        backgroundColor: [
          'rgba(85,85,85,1)',
          'rgba(41,155,99,1)',
          'rgba(41,155,99,1)',
          'rgba(54,162,235,1)',
          'rgba(255,206,86,1)',
          'rgba(120,46,139,1)'
          
        ],
        borderColor: [
          'rgba(41,155,99)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true
    }
  });
  